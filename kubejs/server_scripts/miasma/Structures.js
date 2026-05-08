

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

PlayerEvents.tick((event) => {
  const tick = event.server.tickCount;
  if (tick % 20 !== 0) return;

  const level = event.level;
  const player = event.player;
  const playerPos = player.blockPosition();

  const tagState = new Map();

  structureDeterminer.forEach((val) => {
    const structures = resolveStructures(level, val.structure);
    const isInside = structures.some((structureId) =>
      structureFinderInRadius(
        structureId,
        player,
        level,
        RADIUS_CHUNKS,
      ),
    );

    const current = tagState.get(val.tag);
    if (current) {
      current.inside = current.inside || isInside;
    } else {
      tagState.set(val.tag, { inside: isInside, messages: val.messages });
    }
  });

  tagState.forEach((state, tag) => {
    const hasTag = player.getTags().find((v) => v === tag) != null;

    if (state.inside && !hasTag) {
      setTagStatus(player, tag, state.messages);
      return;
    }

    if (!state.inside && hasTag) {
      player.removeTag(tag);
    }
  });
});
