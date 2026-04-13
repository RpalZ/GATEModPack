ServerEvents.customCommand("getNbtItem", event => {
    const player = event.getPlayer()
    const item = player.getMainHandItem()

    const nbt = item.getNbt()

    const jsonNbt = NBT.toJson(nbt)

    FilesJS.writeFile("kubejs/config/debug/itemNbt.json", jsonNbt)


    player.tell("Check!")
})