ServerEvents.customCommand("getItemAttr", event => {

    const player = event.player
    const mainHandItem = player.getMainHandItem()

    const itemObj = mainHandItem.item

    const damageAttributes = itemObj.getAttributes("generic.attack_damage")

    const atkDmg = itemObj.attackDamage

    console.log(damageAttributes)
    console.log(itemObj.getAttributes("taa:melee_damage"), "melee damage")
    console.log(itemObj.getAttributes("puffish_attributes:melee_damage"), "melee_damage puffish")

    

    //  const attrModifier = itemObj.getAttributeModifiers("traveloptics:voidstrike_reaper", "mainhand")

    const maxDmg = itemObj.maxDamage

    const itemData = itemObj.getTypeData()

    const itemNbt = mainHandItem.nbt

    const modifier = mainHandItem.getAttributeModifiers("mainhand")

    // const firstModifier = modifier.forEach(m => {
    //     console.log(m.defaultValue, m.descriptionId, m.operation)

    // })
    const modifierMap = modifier.asMap()

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
        amount: 0
    }

    modifierMap.forEach((attribute, modi) => {
        // modi.forEach(g => {
        //     console.log(g, "ggg")
            
        // })
        /**
         * @type {Internal.AttributeModifier[]}
         */
        let arrayModi = modi.toArray()

        let firstAtt = arrayModi.sort((a,b) => b.amount - a.amount)[0]

        if(firstAtt.amount > topAttr.amount) {

            topAttr.attribute = attribute
            topAttr.attributeModifier = firstAtt
            topAttr.amount = firstAtt.amount
        }

        
        console.log(firstAtt, "firstatt")

        console.log(attribute, "attribute")
    })

    
    console.log(topAttr, "topattr")

    console.log({attributeName: topAttr.attribute.descriptionId})

    let attrTest = itemObj.getAttributes(topAttr.attribute)

    console.log(attrTest, "test")

    


    

    // let firstModifierT =  modifier.get(new Internal.Attribute("minecraft:generic.attack_damage"))

    // console.log(firstModifierT)
    // console.log(firstModifier)
    console.log(modifier, "modifier")
    console.log(itemData, "data")
    console.log(itemNbt, "nbt")
    player.tell(atkDmg)
    player.tell(maxDmg)
})