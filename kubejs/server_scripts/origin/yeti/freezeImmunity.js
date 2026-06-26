EntityEvents.hurt('player', event => {

    const source = event.source
    const player = event.player

    const race = getOriginRace(player.nbt)

    if(race != "gate:yeti") return

    const tK = TagKey.create(Registries.DAMAGE_TYPE, new ResourceLocation("minecraft:is_freezing"))

    const type = source.typeHolder().containsTag(tK)

    if(type) {
        event.cancel()
    }

})
