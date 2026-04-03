// MoreJSEvents.filterAvailableEnchantments((event) => {
    
//   const item = event.getItem();
//     console.log("yes")
//     event.getEnchantmentInstances().forEach(m => m.enchantment.canEnchant(i => {
//         console.log(i)
//         return i.id = "brimm:assault"
//     }))
//   if (item.getMod() == "brimm") {
//     console.log("im brimm")

    
//       // event.add("protection", "unbreaking", "mending", "fire_protection", "thorns");


//   };

// });


// MoreJSEvents.enchantmentTableEnchant(event => {
//   const item = event.getItem()

//   if(item.getMod() !== "brimm") return

//   const enchantment = event.getEnchantments()

//   item.enchant('protection', 4)
//   event.getPlayer().tell(enchantment)
// })
