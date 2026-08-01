let $ItemAttributeModifierEvent = Java.loadClass(
  "net.minecraftforge.event.ItemAttributeModifierEvent",
);

let $AttributeModifier = Java.loadClass(
  "net.minecraft.world.entity.ai.attributes.AttributeModifier",
);
NativeEvents.onEvent($ItemAttributeModifierEvent, (event) => {
  if (event.getSlotType() !== "mainhand") return;

  /**@type {Internal.Multimap<Internal.Attribute, Internal.AttributeModifier>} */
  const modifiers = event.getModifiers();

  const attrModMap = modifiers.asMap();

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

});
