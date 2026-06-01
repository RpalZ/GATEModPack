EntityEvents.death((event) => {
  const level = event.level;

  const dimension = level.getDimension();

  if (dimension.toString() !== "dungeon_realm:dungeon") return;

  const player = event.source.getPlayer();

  if (!player) return;

  const persistentData = player.persistentData;

  let preKill = persistentData.getInt("dungeonKills") || 0;

  let postKill = preKill + 1;

  // player.tell(postKill)
  let nKillsNeeded = 5

  if (postKill % nKillsNeeded == 0) {
    //special effects
    const effects = [
      "minecraft:speed",
      "minecraft:regeneration",
      "minecraft:absorption",
      "minecraft:resistance",
      "minecraft:strength",
    ];

    let level = (postKill / nKillsNeeded) % effects.length;
    player.setStatusMessage(Text.of("You feel rage...").red().italic());

    player.potionEffects.add(effects[level - 1], 30 * 20, 2, true, false);
  }

  persistentData.merge({
    dungeonKills: postKill,
    timerKill: 8,
  });
});

PlayerEvents.tick((event) => {
  const level = event.level;
  const server = event.server;

  if (server.tickCount % 20 !== 0) return;

  const dimension = level.getDimension();

  if (dimension.toString() !== "dungeon_realm:dungeon") return;

  const player = event.getPlayer();

  const persData = player.persistentData;

  const timer = persData.getInt("timerKill");

  // player.tell(timer)

  if (timer !== null) {
    if (timer < 0) return;

    if (timer <= 0) {
      persData.merge({
        dungeonKills: 0,
        timerKill: -1,
      });

      return;
    }

    persData.merge({
      timerKill: timer - 1,
    });
  } else {
    return;
  }
});
