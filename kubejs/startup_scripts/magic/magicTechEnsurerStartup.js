const $LivingEquipmentChangeEvent = Java.loadClass(
  "net.minecraftforge.event.entity.living.LivingEquipmentChangeEvent",
);


ForgeEvents.onEvent($LivingEquipmentChangeEvent, (event) => {

//Armor Check

  let slot = event.getSlot(); // slot
  let item = event.getTo(); // item POST
  let server = event.getEntity().getServer();
  let uuid = event.getEntity().getUuid();
  let player = server.getPlayer(uuid);

  const hasTech = item.hasTag(global.techTag);
  const hasMagic = item.hasTag(global.magicTag);

  if (!player) return;
  if (player.persistentData == null) return;

  const playerMagic = player.persistentData.getBoolean("isMagic");
  const playerTech = player.persistentData.getBoolean("isTech");

  if (!slot.isArmor()) return;

  if (!playerMagic && hasMagic) {
    player.setStatusMessage(
      Text.of("You need to unlock magic to equip this item...").yellow().italic(),
    );
    player.give(item.copyAndClear());
  }
  if (!playerTech && hasTech) {
    player.setStatusMessage(
      Text.of("You need to unlock tech to equip this item...").yellow().italic(),
    );
    player.give(item.copyAndClear());
  }
});

