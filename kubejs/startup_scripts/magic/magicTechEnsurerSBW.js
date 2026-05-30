const $MinecraftForge = Java.loadClass('net.minecraftforge.common.MinecraftForge')
let $Minecraft = Java.loadClass("net.minecraft.client.Minecraft");
const $EventPriority = Java.loadClass('net.minecraftforge.eventbus.api.EventPriority')
const $KubeJS = Java.loadClass('dev.latvian.mods.kubejs.KubeJS')
const $mousePreEvent = Java.loadClass("net.minecraftforge.client.event.InputEvent$MouseButton$Pre");


if ($KubeJS.startupScriptManager.firstLoad) {
  $MinecraftForge.EVENT_BUS.addListener($EventPriority.HIGH, false, $mousePreEvent, event => {


    //superbwarfare check

    let player = $Minecraft.getInstance().player;
    if (!player) return;
    let item = player.getMainHandItem();
    let SBWtag = "superbwarfare:gun";

    if ($Minecraft.getInstance().currentScreen) return

    let hasTech = player.persistentData.getBoolean("isTech");

    if (!hasTech && item.hasTag(SBWtag)) {
      player.setStatusMessage(
        Text.of("Your hands lack the dexterity...").yellow().italic(),
      );
      // player.give(item.copyAndClear())
      event.setCanceled(true)
    }
  })
}

