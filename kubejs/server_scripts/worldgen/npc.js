BlockEvents.broken((event) => {
  const level = event.getLevel();
  const player = event.getPlayer();
  const dimension = level.getDimension().toString();

  if (dimension !== "gate:leaders_world") return;

  if (!player) return event.cancel();

  const isOp = player.hasPermissions(2);

  if (!isOp) {
    event.cancel();
  }
});
BlockEvents.placed((event) => {
  const level = event.getLevel();
  const player = event.getPlayer();
  const dimension = level.getDimension().toString();

  if (dimension !== "gate:leaders_world") return;

  if (!player) return event.cancel();

  const isOp = player.hasPermissions(2);

  if (!isOp) {
    event.cancel();
  }
});

LevelEvents.loaded((event) => {
  const level = event.getLevel();
  const dimension = level.getDimension();
  const server = level.getServer();

  const serverData = server.persistentData;

  // console.log("[GATE]: FIRED")
  // server.tell("fired")

  if (serverData.getBoolean("hallwayGenerated")) return;

  // console.log("[GATE]: FIRED AGAIN")

  // if(dimension.toString() !== "gate:leaders_world") return

  server.runCommandSilent(
    "execute in gate:leaders_world run forceload add -30 -30 30 200",
  );

  // console.log("[GATE]: FIRED AGAIN!!")

  server.persistentData.merge({ hallwayGenerated: true });

  server.scheduleInTicks(20, (e) => {
    const result = server.runCommandSilent(
      "execute in gate:leaders_world run place template gate:story/main/leaders_hallway 0 100 0 none none",
    );
    server.runCommandSilent(
      "execute in gate:leaders_world run setworldspawn 15 103 99",
    );
    server.runCommandSilent(
      "execute in gate:leaders_world run forceload remove all",
    );

    // console.log("[GATE]: YAY")
  });

  //construct structure
});

LevelEvents.beforeExplosion((event) => {
  const level = event.getLevel();
  const dimension = level.getDimension();

  if (dimension.toString() == "gate:leaders_world") {
    event.cancel();
    return;
  }
});
