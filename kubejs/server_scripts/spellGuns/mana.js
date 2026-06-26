let $GunTags = Java.loadClass("com.mumu17.ironsarms.utils.GunTags");
let $RequestSyncChargedManaMessage = Java.loadClass(
  "com.mumu17.ironsarms.network.RequestSyncChargedManaMessage",
);

const getGunMaxMana = (gun) => {
  const baseMaxMana = $RequestSyncChargedManaMessage.MAX_MANA;
  const storageLevel = gun.getEnchantmentLevel("kubejs:gun_storage");

  return baseMaxMana + storageLevel * 10000;
};

//lets prevent mana hogging first

PlayerEvents.tick((event) => {
  const server = event.server;
  const tick = server.tickCount;

  if (tick % 20 != 0) return;

  //check all slots in inventory and locate ALL guns

  const player = event.player;

  if (!player) return;

  const gunsInventory = player.inventory.getAllItems().filter((item) => {
    //check if gun

    return $GunTags.isTargetItem(item);
  });

  //   player.tell(gunsInventory)
  //   console.log(gunData)

  // player.tell("finding aura gun")
  for (let gun of gunsInventory) {
    //check nbt data
    //check if gun is full
    let isMagicGun = gun.getOrCreateTag().contains("InscribedSpell");
    //   player.tell(isMagicGun)

    if (!isMagicGun) continue;

    let maxMana = getGunMaxMana(gun);
    let manaGun = $GunTags.getMana(gun);

    //   player.tell(`manaGun: ${manaGun}`)
    let isFull = manaGun >= maxMana;

    if (isFull) continue;

    // player.tell("i am not null")

    //check maxx
    // player.tell(manaGun)

    //deduce and add mana type shi
    let playerMagicData = player.irons_spellbooks$getMagicData();
    let playerMana = playerMagicData.getMana();

    // deduce mana

    // if (playerMana < minChargeMana) return;

    let manaLeft = maxMana - manaGun;

    // player.tell(`manaLeft: ${manaLeft}`)

    let manaToAdd = Math.min(manaLeft, playerMana);

    // player.tell(`manaToAdd: ${manaToAdd}`)

    let slotIndex = player.inventory.findSlotMatchingItem(gun);

    // player.tell("manipulating mana auramaxxing")

    // player.tell(`player mana: ${playerMana}`)
    // playerMagicData.addMana(-manaToAdd);

    let realMana = playerMana - manaToAdd;
    // player.tell(`realMana: ${realMana}`)
    playerMagicData.setMana(realMana);
    // player.tell(manaToAdd)

    $GunTags.addMana(gun, manaToAdd);

    player.inventory.setItem(slotIndex, gun);
    break;
  }
});
