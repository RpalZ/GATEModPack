const $ClientTickEvent = Java.loadClass(
  "net.minecraftforge.event.TickEvent$ClientTickEvent",
);
const $ISSKeyMappings = Java.loadClass(
  "io.redspace.ironsspellbooks.player.KeyMappings",
);

// const skp = SKP$KeyUtils

if ($KubeJS.startupScriptManager.firstLoad) {
  // We need to track the state to prevent "double-firing" every tick

  let wasPressed = false;
  // let delayedActionTicks = -1; // -1 means no action pending

  $MinecraftForge.EVENT_BUS.addListener(
    $EventPriority.HIGHEST,
    false,
    $ClientTickEvent,
    (event) => {
      // Only run on the END phase to avoid running twice per tick (Start/End)
      // if (event.phase !== "END") return;

      const CastMapping = $ISSKeyMappings.SPELLBOOK_CAST_ACTIVE_KEYMAP;
      const isPressed = CastMapping.isDown();

      let player = $Minecraft.getInstance().player;
      if (!player) return;

      // Detect the transition from "not pressed" to "pressed"
      if (isPressed && !wasPressed) {
        player.sendData("borrowMana");
        // delayedActionTicks = 5;
        // Add a 50ms delay before sending the second event
       
      }
      wasPressed = isPressed;


    //   if (delayedActionTicks > 0) {
    //     delayedActionTicks--;
    // } else if (delayedActionTicks === 0) {
    //     player.sendData("borrowMana");
    //     delayedActionTicks = -1; // Reset
    // }
      // Update the state for next tick
    },
  );
}
