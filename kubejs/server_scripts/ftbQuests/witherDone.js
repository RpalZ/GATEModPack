
PlayerEvents.tick((event) => {
  let tick = event.server.tickCount;

  if (tick % 20 !== 0) return;

  let player = event.player;

  let hasWitherCheck = player.stages.has("withercheck");

  if (hasWitherCheck) return;

  let hasWitherDone = player.stages.has("witherdone");

  if (hasWitherDone) {
    if (!player.persistentData.getBoolean("isMagic")) {
      player.setAttributeBaseValue("irons_spellbooks:max_mana", 100);
      player.setAttributeBaseValue("manaunification:max_mana", 100);
    }

    player.persistentData.merge({
      isMagic: true,
      isTech: true,
    });

    player.stages.add("skipcuriocheck");
    player.stages.add(dungeonStage);
    player.setStatusMessage(
      Text.of("It feels like you have unlocked many things...")
        .italic()
        .lightPurple(),
    );

    feedback(event);
    player.stages.add("withercheck");
  }
});
