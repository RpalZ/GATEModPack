ServerEvents.recipes(event => {
    event.remove({id: "irons_restrictions:fragment"})
    event.remove({id: "irons_restrictions:unfinished_manuscript"})


})

LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.CHEST)
    .removeLoot("irons_restrictions:fragment")
    .removeLoot("irons_restrictions:unfinished_manuscript")
})