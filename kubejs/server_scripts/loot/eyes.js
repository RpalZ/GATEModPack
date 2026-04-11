LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.ENTITY)
    .removeLoot('endrem:wither_eye')
    .removeLoot('endrem:corrupted_eye')
    .removeLoot('endrem:guardian_eye')
    .removeLoot('endrem:magical_eye')

   event.addLootTypeModifier(LootType.CHEST)
   .removeLoot('endrem:cold_eye')
   .removeLoot('endrem:black_eye')
   .removeLoot('endrem:lost_eye')
   .removeLoot('endrem:nether_eye')
   .removeLoot('endrem:old_eye')
   .removeLoot('endrem:rogue_eye')
   .removeLoot('endrem:cursed_eye')
   .removeLoot('endrem:evil_eye')

})