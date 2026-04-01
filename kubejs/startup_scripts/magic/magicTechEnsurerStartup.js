const $LivingEquipmentChangeEvent = Java.loadClass("net.minecraftforge.event.entity.living.LivingEquipmentChangeEvent")


ForgeEvents.onEvent($LivingEquipmentChangeEvent, event => {
    global.LivingEquipmentChangeEvent(event)
})