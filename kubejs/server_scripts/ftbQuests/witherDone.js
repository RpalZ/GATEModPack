FTBQuestsEvents.completed("11EBA947CA6F6434", (event) => {
  const player = event.getPlayer();

  if (!player.persistentData.getBoolean("isMagic")) {
    player.setAttributeBaseValue("irons_spellbooks:max_mana", 100);
    player.setAttributeBaseValue("manaunification:max_mana", 100);
  }

  player.persistentData.merge({
    isMagic: true,
    isTech: true,
  });

  player.setStatusMessage(
    Text.of("It feels like you have unlocked something...").italic().lightPurple(),
  );
});
