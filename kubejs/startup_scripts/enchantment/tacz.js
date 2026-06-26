const $GunTags = Java.loadClass("com.mumu17.ironsarms.utils.GunTags");
const $ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack");

/**
 * @param {Internal.ItemStack} stack
 */
const isGun = (stack) => $GunTags.isTargetItem(stack);

const isGunItem = (item) => isGun(new $ItemStack(item));

ItemEvents.modification((event) => {
  event.modify("tacz:modern_kinetic_gun", (item) => {
    item.setRealIsEnchantable((stack) => isGun(stack));
    item.setRealGetEnchantmentValueFn((stack) => {
      return isGun(stack) ? 22 : 0;
    });
  });
});

StartupEvents.registry("enchantment", (event) => {
  event
    .create("gun_velocity")
    .rare()
    .maxLevel(5)
    .minCost((level) => 5 + (level - 1) * 7)
    .maxCost((level) => 25 + (level - 1) * 7)
    .canEnchant(isGun);

  event
    .create("gun_storage")
    .rare()
    .maxLevel(3)
    .minCost((level) => 5 + (level - 1) * 7)
    .maxCost((level) => 25 + (level - 1) * 7)
    .canEnchant(isGun);

  event
    .create("gun_regen")
    .rare()
    .maxLevel(5)
    .minCost((level) => 5 + (level - 1) * 7)
    .maxCost((level) => 25 + (level - 1) * 7)
    .canEnchant(isGun);
});

EnchantJSEvent.modification((event) => {
  [
    "kubejs:gun_velocity",
    "kubejs:gun_storage",
    "kubejs:gun_regen",
  ].forEach((id) => {
    event.modify(id, (enchant) => {
      enchant.setCategory(isGunItem);
      enchant.setCanEnchantFn(isGun);
      enchant.setCanApplyAtEnchantingTableFn(isGun);
    });
  });
});
