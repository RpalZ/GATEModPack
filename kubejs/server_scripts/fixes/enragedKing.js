EntityEvents.spawned("traveloptics:enraged_dead_king", event => {
    event.cancel()
})

EntityEvents.checkSpawn("traveloptics:enraged_dead_king", event => {
    event.cancel()
})


PlayerEvents.spellPreCast(event => {
    let spellid = event.spellId

    if(spellid == Spell.of("traveloptics:call_forth_the_dead_king").spellId) {
        event.cancel()
        return
    }
})