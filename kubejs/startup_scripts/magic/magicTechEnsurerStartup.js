const $LivingEquipmentChangeEvent = Java.loadClass(
  "net.minecraftforge.event.entity.living.LivingEquipmentChangeEvent",
);

const $mousePreEvent = Java.loadClass("net.minecraftforge.client.event.InputEvent$MouseButton$Pre");

ForgeEvents.onEvent($LivingEquipmentChangeEvent, (event) => {
  global.LivingEquipmentChangeEvent(event);
});

//

// ForgeEvents.onEvent($mousePreEvent, (event) => {
//   global.mousePreEvent(event)
// })


const $MinecraftForge = Java.loadClass('net.minecraftforge.common.MinecraftForge')

const $EventPriority = Java.loadClass('net.minecraftforge.eventbus.api.EventPriority')
const $KubeJS = Java.loadClass('dev.latvian.mods.kubejs.KubeJS')
if ($KubeJS.startupScriptManager.firstLoad) {
  $MinecraftForge.EVENT_BUS.addListener($EventPriority.HIGH, false, $mousePreEvent, event => global.mousePreEvent(event))
}

