ServerEvents.customCommand("locateStructure", (event) => {
  const structureIds = Utils.server
    .registryAccess()
    .lookupOrThrow(Registries.STRUCTURE)
    .listElementIds()
    .map((resourceKey) => resourceKey.location())
    .toList();
  console.log(structureIds);
  const player = event.getPlayer();
  const playerPos = player.blockPosition();

  const level = event.server.getLevel(event.level.dimension);

  const sM = level.structureManager();

  // sM.getStructureAt().getBoundingBox().intersects()

  const stuff = level.server
    .registryAccess()
    .lookupOrThrow(Registries.STRUCTURE)
    .get(
      TagKey.create(Registries.STRUCTURE, new ResourceLocation("gate:dungeon")),
    )
    .get()
    .stream()
    .toList()
    .map((h) => h.unwrapKey().get().location());


    player.tell(stuff)
  const target = [
    // "#gate:dungeon",
    "dungeons_enhanced:deep_crypt",
    "minecraft:village_plains",
  ];

  const findStructureResult = structureFinderInRadius(
    "minecraft:village_plains",
    player,
    level,
    4,
  );

  player.tell(findStructureResult);

  //   target.forEach((m) => {
  //     locator(m);
  //   });
});
