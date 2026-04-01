ItemEvents.rightClicked((event) => {
  const item = event.getItem();
  const hasTech = item.hasTag(global.techTag);
  const hasMagic = item.hasTag(global.magicTag);
  const player = event.getPlayer();
  const playerMagic = player.persistentData.getBoolean("isMagic");
  const playerTech = player.persistentData.getBoolean("isTech");

  const level = event.getLevel();

//   level.tell(`magic: ${playerMagic}, tech: ${playerTech}`)

  if (!playerMagic && hasMagic) {
    player.setStatusMessage(
      Text.of("You need to unlock magic to use this item...").yellow().italic(),
    );
    event.cancel();
  }
  if (!playerTech && hasTech) {
    player.setStatusMessage(
      Text.of("You need to unlock tech to use this item...").yellow().italic(),
    );
    event.cancel();
  }
});

global.LivingEquipmentChangeEvent = (event) => {
  let slot = event.getSlot(); // slot
  let item = event.getTo(); // item POST
  let server = event.getEntity().getServer();
  let uuid = event.getEntity().getUuid();
  let player = server.getPlayer(uuid);

  const hasTech = item.hasTag(global.techTag);
  const hasMagic = item.hasTag(global.magicTag);

  if(!player) return
  if(player.persistentData == null) return

  const playerMagic = player.persistentData.getBoolean("isMagic");
  const playerTech = player.persistentData.getBoolean("isTech");

  if (!slot.isArmor()) return;

  if (!playerMagic && hasMagic) {
    player.setStatusMessage(
      Text.of("You need to unlock magic to use this item...").yellow().italic(),
    );
    player.give(item.copyAndClear());
  }
  if (!playerTech && hasTech) {
    player.setStatusMessage(
      Text.of("You need to unlock tech to use this item...").yellow().italic(),
    );
    player.give(item.copyAndClear());
  }
};
