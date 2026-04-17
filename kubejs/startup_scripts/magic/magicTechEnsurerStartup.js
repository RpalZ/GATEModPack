const $LivingEquipmentChangeEvent = Java.loadClass(
  "net.minecraftforge.event.entity.living.LivingEquipmentChangeEvent",
);

const $mousePreEvent = Java.loadClass("net.minecraftforge.client.event.InputEvent$MouseButton$Pre");

ForgeEvents.onEvent($LivingEquipmentChangeEvent, (event) => {

//Armor Check

  let slot = event.getSlot(); // slot
  let item = event.getTo(); // item POST
  let server = event.getEntity().getServer();
  let uuid = event.getEntity().getUuid();
  let player = server.getPlayer(uuid);

  const hasTech = item.hasTag(global.techTag);
  const hasMagic = item.hasTag(global.magicTag);

  if (!player) return;
  if (player.persistentData == null) return;

  const playerMagic = player.persistentData.getBoolean("isMagic");
  const playerTech = player.persistentData.getBoolean("isTech");

  if (!slot.isArmor()) return;

  if (!playerMagic && hasMagic) {
    player.setStatusMessage(
      Text.of("You need to unlock magic to equip this item...").yellow().italic(),
    );
    player.give(item.copyAndClear());
  }
  if (!playerTech && hasTech) {
    player.setStatusMessage(
      Text.of("You need to unlock tech to equip this item...").yellow().italic(),
    );
    player.give(item.copyAndClear());
  }
});

const $MinecraftForge = Java.loadClass('net.minecraftforge.common.MinecraftForge')
let $Minecraft = Java.loadClass("net.minecraft.client.Minecraft");
const $EventPriority = Java.loadClass('net.minecraftforge.eventbus.api.EventPriority')
const $KubeJS = Java.loadClass('dev.latvian.mods.kubejs.KubeJS')

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

