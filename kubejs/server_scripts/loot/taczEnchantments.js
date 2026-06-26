(() => {
  const gunEnchantBook = (id, level) => {
    return Item.of(
      "minecraft:enchanted_book",
      `{StoredEnchantments:[{id:"${id}",lvl:${level}s}]}`,
    );
  };

  const addGunEnchantPool = (modifier, chance) => {
    modifier.pool((pool) => {
      pool.rolls(1);
      pool.randomChance(chance);
      pool.addWeightedLoot(
        1,
        [
          gunEnchantBook("kubejs:gun_velocity", 1).withChance(28),
          gunEnchantBook("kubejs:gun_velocity", 2).withChance(18),
          gunEnchantBook("kubejs:gun_velocity", 3).withChance(10),
          gunEnchantBook("kubejs:gun_velocity", 4).withChance(5),
          gunEnchantBook("kubejs:gun_velocity", 5).withChance(2),
          gunEnchantBook("kubejs:gun_storage", 1).withChance(28),
          gunEnchantBook("kubejs:gun_storage", 2).withChance(12),
          gunEnchantBook("kubejs:gun_storage", 3).withChance(4),
          gunEnchantBook("kubejs:gun_regen", 1).withChance(28),
          gunEnchantBook("kubejs:gun_regen", 2).withChance(18),
          gunEnchantBook("kubejs:gun_regen", 3).withChance(10),
          gunEnchantBook("kubejs:gun_regen", 4).withChance(5),
          gunEnchantBook("kubejs:gun_regen", 5).withChance(2),
        ],
      );
    });
  };

  LootJS.modifiers((event) => {
    [
      { table: "dungeon_realm:chests/tier_2_dungeon", chance: 0.08 },
      { table: "dungeon_realm:chests/tier_3_dungeon", chance: 0.12 },
      { table: "dungeon_realm:chests/tier_4_dungeon", chance: 0.16 },
      { table: "dungeon_realm:chests/tier_5_dungeon", chance: 0.2 },
      { table: "library_of_exile:chests/tier_2_dungeon", chance: 0.08 },
      { table: "library_of_exile:chests/tier_3_dungeon", chance: 0.12 },
      { table: "library_of_exile:chests/tier_4_dungeon", chance: 0.16 },
      { table: "library_of_exile:chests/tier_5_dungeon", chance: 0.2 },
    ].forEach((entry) => {
      addGunEnchantPool(event.addLootTableModifier(entry.table), entry.chance);
    });
  });
})();
