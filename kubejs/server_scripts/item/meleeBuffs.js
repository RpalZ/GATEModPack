const $ItemAttributeModifierEvent = Java.loadClass(
  "net.minecraftforge.event.ItemAttributeModifierEvent",
);

const $AttributeModifier = Java.loadClass(
  "net.minecraft.world.entity.ai.attributes.AttributeModifier",
);
NativeEvents.onEvent($ItemAttributeModifierEvent, (event) => {
  if (event.getSlotType() !== "mainhand") return;

  /**@type {Internal.Multimap<Internal.Attribute, Internal.AttributeModifier>} */
  const modifiers = event.getModifiers();

  const attrModMap = modifiers.asMap();

//   console.log("yep");
  /**
   * @typedef {Object} TopAttrObj
   * @property {Internal.Attribute | null} attribute
   * @property {Internal.AttributeModifier | null} attributeModifier
   * @property {number} amount
   */

  /**@type {TopAttrObj} */
  let topAttr = {
    attribute: null,
    attributeModifier: null,
    amount: 0,
  };

  attrModMap.forEach((attribute, modi) => {
    /**
     * @type {Internal.AttributeModifier[]}
     */
    let arrayModi = modi.toArray();

    let firstAtt = arrayModi.sort((a, b) => b.amount - a.amount)[0];

    // console.log(`firstAttr: ${firstAtt}`);
    if (firstAtt.amount > topAttr.amount) {
      topAttr.attribute = attribute;
      topAttr.attributeModifier = firstAtt;
      topAttr.amount = firstAtt.amount;
    }
  });

  if(topAttr.attributeModifier == null) return


  event.removeModifier(topAttr.attribute, topAttr.attributeModifier);

  

  const newModifier = new $AttributeModifier(
    topAttr.attributeModifier.getId(),
    topAttr.attributeModifier.getName(),
    topAttr.attributeModifier.getAmount() * 1.75,
    topAttr.attributeModifier.getOperation(),
  );

  event.addModifier(topAttr.attribute, newModifier);

  //   if (event.itemStack.id == "irons_spellbooks:netherite_mage_helmet" && event.slotType =="head") {
  //     event.removeAttribute("irons_spellbooks:max_mana")
  //     event.addModifier("irons_spellbooks:spell_power", aSPELL_MODIFIER)
  //     event.addModifier("irons_spellbooks:max_mana", aMAX_MANA)
  //   }
  //   if (event.itemStack.id == "irons_spellbooks:netherite_mage_chestplate"&& event.slotType =="chest") {
  //     event.removeAttribute("irons_spellbooks:max_mana")
  //     event.addModifier("irons_spellbooks:spell_power", bSPELL_MODIFIER)
  //     event.addModifier("irons_spellbooks:max_mana", bMAX_MANA)
  //   }
  //   if (event.itemStack.id == "irons_spellbooks:netherite_mage_leggings"&& event.slotType =="legs") {
  //     event.removeAttribute("irons_spellbooks:max_mana")
  //     event.addModifier("irons_spellbooks:spell_power", cSPELL_MODIFIER)
  //     event.addModifier("irons_spellbooks:max_mana", cMAX_MANA)
  //   }
  //   if (event.itemStack.id == "irons_spellbooks:netherite_mage_boots"&& event.slotType =="feet") {
  //     event.removeAttribute("irons_spellbooks:max_mana")
  //     event.addModifier("irons_spellbooks:spell_power", dSPELL_MODIFIER)
  //     event.addModifier("irons_spellbooks:max_mana", dMAX_MANA)
  //   }
});
