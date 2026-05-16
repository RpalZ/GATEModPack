const lastSentByUuid = new Map();

ServerEvents.tick(event => {
    if (event.getServer().tickCount % 20 !== 0) return;

    const server = event.getServer();
    const players = server.players;
    const onlineUuids = new Set();

    players.forEach(player => {
        const uuid = player.getUuid();
        const uuidKey = uuid.toString();
        onlineUuids.add(uuidKey);

        const isMagic = player.getPersistentData().getBoolean("isMagic");
        const isTech = player.getPersistentData().getBoolean("isTech");

        const last = lastSentByUuid.get(uuidKey);
        if (last && last.isMagic === isMagic && last.isTech === isTech) return;

        const payload = NBT.toTagCompound({});
        const data = NBT.toTagCompound({});
        data.putBoolean("isMagic", isMagic);
        data.putBoolean("isTech", isTech);

        payload.putUUID("uuid", uuid);
        payload.put("data", data);

        server.sendData("syncNBT", payload);
        lastSentByUuid.set(uuidKey, { isMagic: isMagic, isTech: isTech });
    });

    lastSentByUuid.forEach((_, uuidKey) => {
        if (!onlineUuids.has(uuidKey)) lastSentByUuid.delete(uuidKey);
    });
});