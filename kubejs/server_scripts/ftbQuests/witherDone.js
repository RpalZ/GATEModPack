FTBQuestsEvents.completed('11EBA947CA6F6434', event => {
    const player = event.getPlayer()



    player.persistentData.merge({
        isMagic: true,
        isTech: true
    })

    player.setStatusMessage(Text.of("It feels you have unlocked something...").italic().lightPurple())
})

