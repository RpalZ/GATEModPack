LootJS.modifiers((event) => {
  event
    .addLootTypeModifier(LootType.CHEST)
    .removeLoot("superbwarfare:rifle_ammo_box")
    .removeLoot("superbwarfare:sniper_ammo_box")
    .removeLoot("superbwarfare:shotgun_ammo_box")
    .removeLoot("superbwarfare:handgun_ammo_box")
    .pool((p) => {
      p.rolls([1, 7]);
      p.randomChance(0.1);
      p.addWeightedLoot(
        [1,5],
        [
          Item.of("tacz:ammo", 36, '{AmmoId:"tacz:30_06"}').withChance(10),
          Item.of("tacz:ammo", 60, '{AmmoId:"tacz:9mm"}').withChance(30),
          Item.of('tacz:ammo', 48, '{AmmoId:"tacz:308"}').withChance(5),
          Item.of('tacz:ammo', 60, '{AmmoId:"tacz:556x45"}').withChance(20),
          Item.of('tacz:ammo', 60, '{AmmoId:"tacz:762x39"}').withChance(20),
          Item.of('tacz:ammo', 36, '{AmmoId:"tacz:12g"}').withChance(20),
          Item.of('tacz:ammo', 60, '{AmmoId:"tacz:545x39"}').withChance(20),
          Item.of('tacz:ammo', 60, '{AmmoId:"tacz:45acp"}').withChance(30)
        ],
      );
    });
});
