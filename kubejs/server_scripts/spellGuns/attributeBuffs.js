let $ItemAttributeModifierEvent = Java.loadClass(
  "net.minecraftforge.event.ItemAttributeModifierEvent",
);

let $AttributeModifier = Java.loadClass(
  "net.minecraft.world.entity.ai.attributes.AttributeModifier",
);

let gunTypeModifier = {
  mg: {
    spellPower: 0.35,
  },
  sniper: {
    spellPower: 10,
  },
  smg: {
    spellPower: 0.8,
  },
  pistol: {
    spellPower: 1,
  },
  rifle: {
    spellPower: 0.7,
  },
};

let $JavaUtil = Java.loadClass("java.util.UUID");

let randomUuid = $JavaUtil.randomUUID();

NativeEvents.onEvent($ItemAttributeModifierEvent, (event) => {
  if (event.getSlotType() !== "mainhand") return;

  /** @type {Internal.ItemStack} */
  let itemStack = event.getItemStack();

  let isGun = $GunTags.isTargetItem(itemStack);
  
  if (!isGun) return;
  let isMagicGun = $GunTags.containsManaTag(itemStack)

  if(!isMagicGun) return

  let gunTag = itemStack.getOrCreateTag();

  let gunId = gunTag.getString("GunId");

  let gunData = TaCZJSUtils.getGunIndex(gunId);

  /**
   * @type {"mg" | "smg" | "pistol" | "rifle" | "sniper"}
   */
  let gunType = gunData.getType();


  /**@type {Internal.Multimap<Internal.Attribute, Internal.AttributeModifier>} */
  let modifiers = event.getModifiers();



  let newAttribute = new $AttributeModifier(
    randomUuid,
    "GunSpell Modifier",
    gunTypeModifier[gunType].spellPower,
    "addition",
  );

  event.addModifier("irons_spellbooks:spell_power", newAttribute);
  event.addModifier("ars_nouveau:ars_nouveau.perk.spell_damage", newAttribute);
});

ServerEvents.customCommand("getGunData", (event) => {
  const player = event.getPlayer();
  const itemStack = player.getMainHandItem();

  const isGun = $GunTags.isTargetItem(itemStack);

  if (isGun) {
    let gunTag = itemStack.getOrCreateTag();

    let gunId = gunTag.getString("GunId");
    let gunData = TaCZJSUtils.getGunIndex(gunId);

    let gunDataType = gunData.getType();

    player.tell(gunDataType);
  }
});
