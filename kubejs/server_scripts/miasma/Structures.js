

const RADIUS_CHUNKS = 6;

const structureDeterminer = [
  {
    structure: "#dungeons_enhanced:on_castle_explorer_maps",
    tag: "gate:in_miasma_dungeons",
    messages: [
      "What is this maze?",
      "Smells like the dead...",
      "I dont like it here...",
    ],
  },
  {
    structure: "#dungeons_enhanced:on_monster_maze_explorer_maps",
    tag: "gate:in_miasma_dungeons",
    messages: [
      "What is this maze?",
      "Smells like the dead...",
      "I dont like it here...",
    ],
  },
  {
    structure: "#dungeons_enhanced:on_desert_explorer_maps",
    tag: "gate:in_miasma_dungeons",
    messages: [
      "What is this maze?",
      "Smells like the dead...",
      "I dont like it here...",
    ],
  },
  {
    structure: "#dungeons_enhanced:on_elder_explorer_maps",
    tag: "gate:in_miasma_dungeons",
    messages: [
      "What is this maze?",
      "Smells like the dead...",
      "I dont like it here...",
    ],
  },
  {
    structure: "#gate:dungeon",
    tag: "gate:in_miasma_dungeons",
    messages: [
      "What is this maze?",
      "Smells like the dead...",
      "I dont like it here...",
    ],
  },
];

function setTagStatus(player, tag, messages) {
  player.addTag(tag);
  player.setStatusMessage(
    Text.of(messages[Math.floor(Math.random() * messages.length)]).italic(),
  );
}

function resolveStructures(level, structureIdOrTag) {
  if (!structureIdOrTag.startsWith("#")) {
    return [structureIdOrTag];
  }

  const tagId = structureIdOrTag.slice(1);
  const registry = level.server
    .registryAccess()
    .lookupOrThrow(Registries.STRUCTURE);
  const holderSet = registry.get(
    TagKey.create(Registries.STRUCTURE, new ResourceLocation(tagId)),
  );

  if (holderSet.isEmpty()) {
    return [];
  }

  return holderSet
    .get()
    .stream()
    .toList()
    .map((h) => h.unwrapKey().get().location().toString());
}

let groupedStructureCache = null;

function getGroupedStructures(level) {
  if (groupedStructureCache) return groupedStructureCache;

  groupedStructureCache = new Map();
  structureDeterminer.forEach((val) => {
    const ids = resolveStructures(level, val.structure);
    if (!groupedStructureCache.has(val.tag)) {
      groupedStructureCache.set(val.tag, {
        structures: [],
        messages: val.messages,
      });
    }
    const entry = groupedStructureCache.get(val.tag);
    ids.forEach((id) => {
      const struct = getStructure(level, id);
      if (struct) entry.structures.push(struct);
    });
  });

  return groupedStructureCache;
}

PlayerEvents.tick((event) => {
  if (event.server.tickCount % 20 !== 0) return;

  const level = event.level;
  const player = event.player;
  const playerPos = player.blockPosition();
  const playerTags = player.getTags();

  const groupedStructures = getGroupedStructures(level);

  groupedStructures.forEach((data, tag) => {
    const hasTag = playerTags.contains(tag);

    // Optimized check: Use getStructureAt instead of scanning radius
    const isInside = data.structures.some((structure) =>
      level.structureManager().getStructureAt(playerPos, structure).isValid(),
    );

    if (isInside && !hasTag) {
      setTagStatus(player, tag, data.messages);
    } else if (!isInside && hasTag) {
      player.removeTag(tag);
    }
  });
});
