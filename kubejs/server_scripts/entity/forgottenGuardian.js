TimelessGunEvents.entityHurtByGunPre(event => {
    if (!event.getLogicalSide()) return

    
    const entity = event.getHurtEntity()
    if(entity.getType() !== "undergarden:forgotten_guardian") return
    const player = event.getAttacker()
    entity.playSound("tacz:target_block_hit")
    // entity.playSound("gate:player_death")
    player.setStatusMessage(Text.of("It seems to be ineffective...").red().italic())
})

