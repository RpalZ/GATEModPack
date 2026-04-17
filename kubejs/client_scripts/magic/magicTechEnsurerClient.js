ItemEvents.rightClicked((event) => {
  const item = event.getItem();
  // const tags = item.getTags().map(m => m.location().toString()).toList()
  const hasTech = item.hasTag(global.techTag);
  const hasMagic = item.hasTag(global.magicTag);
  const player = event.getPlayer();
  const playerMagic = player.persistentData.getBoolean("isMagic");
  const playerTech = player.persistentData.getBoolean("isTech");

  const level = event.getLevel();


   if (item.isBlock()) return;
  if (item.isEdible()) return;

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

PlayerEvents.spellPreCast((event) => {
  const player = event.getPlayer();

  if (!player) return;
  const isMagic = player.persistentData.getBoolean("isMagic");

  if (!isMagic) {
    player.setStatusMessage(
      Text.of("You need to unlock magic to cast spells...").yellow().italic(),
    );

    event.cancel();
  }
});

TimelessGunEvents.gunFire((event) => {
  const player = event.getShooter();
  if (!player.isPlayer()) return;

  const hasTech = player.getPersistentData().getBoolean("isTech");
  // player.tell(hasTech)

 

  if (!hasTech) {
    player.setStatusMessage(
      Text.of("Your hands lack the dexterity...").yellow().italic(),
    );

    event.cancel();
  }
});
