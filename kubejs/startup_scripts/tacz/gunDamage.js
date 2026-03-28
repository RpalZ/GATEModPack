const $EntityHurtByGunEvent = Java.loadClass("com.tacz.guns.api.event.common.EntityHurtByGunEvent$Pre")



ForgeEvents.onEvent($EntityHurtByGunEvent, (event) => {
    global.onEntityHurtByGun(event)

})
