ItemEvents.rightClicked((event) => {
  const item = event.getItem();
  // const tags = item.getTags().map(m => m.location().toString()).toList()
  const hasTech = item.hasTag(global.techTag);
  const hasMagic = item.hasTag(global.magicTag);
  const player = event.getPlayer();
  const playerMagic = player.persistentData.getBoolean("isMagic");
  const playerTech = player.persistentData.getBoolean("isTech");

  const level = event.getLevel();

  if (!playerMagic && hasMagic) {
    player.setStatusMessage(
      Text.of("You need to unlock magic to use this item...").yellow().italic(),
    );
    event.cancel();
    // Force inventory resync to prevent client-side ghosting
  }
  if (!playerTech && hasTech) {
    player.setStatusMessage(
      Text.of("You need to unlock tech to use this item...").yellow().italic(),
    );
    event.cancel();
    // Force inventory resync to prevent client-side ghosting
    // player.containerMenu.sendAllContents();
  }
});
