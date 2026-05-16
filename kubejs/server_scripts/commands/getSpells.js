ServerEvents.customCommand("getSpells", event => {
    const spells = SpellRegistry.getEnabledSpells().filter(m => m.requiresLearning()).map(m => {
        return {spellName: m.getSpellId(), element: m.getSchoolType().getId().toString()}
    })

    FilesJS.writeFile("kubejs/config/debug/spells.json", JsonIO.toPrettyString({spells: spells}))


})