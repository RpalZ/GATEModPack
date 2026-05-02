ServerEvents.tags("item", event => {
    Item.list.forEach(it => {
        const itemName = it.id
        if(!itemName.includes("ghillie")) return

        const isTop = itemName.includes("body")
        const isLegs = itemName.includes("legs")
        const isHelmet = itemName.includes("helmet")

        if(isTop) {
            event.add("curios:ghillie_top", it.id)
        }

        if(isLegs){
            event.add("curios:ghillie_pants", it.id)
        }

        if(isHelmet){
            event.add("curios:ghillie_hood", it.id)
        }

    })
})