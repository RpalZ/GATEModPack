const biomeDeterminer = [
  {
    biome: "#forge:is_underground",
    tag: "gate:in_miasma_cave",
    messages: [
      "I feel suffocated in here",
      "The air is stagnant",
      "Whats out there?",
    ],
  },
  {
    biome: "#forge:forest",
    tag: "gate:in_miasma_forest",
    messages: [
      "The forest reeks...",
      "It smells in here...",
      "Something is definitely wrong...",
      "This place reeks...",
    ],
  }
];

PlayerEvents.tick((event) => {
  const tick = event.server.tickCount;

  if (tick % 20 !== 0) return;
  const level = event.level;
  const player = event.player;
  const playerPos = player.blockPosition();

  function setTagStatus({ tag, messages }) {
    player.addTag(tag);
    player.setStatusMessage(
      Text.of(messages[Math.floor(Math.random() * messages.length)]).italic(),
    );
  }

  biomeDeterminer.forEach((val) => {
    const biomePos = MoreJS.findBiome(playerPos, level, val.biome, 1);

    const inMiasma = player.getTags().find((v) => v == val.tag);

    // inject
    if (biomePos !== null && !inMiasma) {
      // reject
      if (val.tag == "gate:in_miasma_cave" && playerPos.y > biomePos.y) return;
    
      if (
        val.tag == "gate:in_miasma_forest" &&
        Math.abs(playerPos.y - biomePos.y) > 5
      )
        return;

      setTagStatus(val);
      return;
    }
    // eject
    if (biomePos !== null && inMiasma) {
      if (val.tag == "gate:in_miasma_cave" && playerPos.y > biomePos.y) {
        player.removeTag(val.tag);
        return;
      }


      if (
        val.tag == "gate:in_miasma_forest" &&
        Math.abs(playerPos.y - biomePos.y) > 5
      ) {
        player.removeTag(val.tag);
        return;
      }
    }
    // default eject
    if (biomePos === null && inMiasma) {
      player.removeTag(val.tag);
      return;
    }
  });

  // Utils.id()
});
