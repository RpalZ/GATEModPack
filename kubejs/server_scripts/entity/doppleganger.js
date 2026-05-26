EntityEvents.spawned("darkdoppelganger:dark_doppelganger", event => {
    const entity = event.getEntity()
    entity.setAttributeBaseValue("irons_spellbooks:spell_power", 7.5)

})

