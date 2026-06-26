let $TaczEnchantGunTags = Java.loadClass("com.mumu17.ironsarms.utils.GunTags");
let $TaczEnchantItemAttributeModifierEvent = Java.loadClass(
  "net.minecraftforge.event.ItemAttributeModifierEvent",
);
let $TaczEnchantAttributeModifier = Java.loadClass(
  "net.minecraft.world.entity.ai.attributes.AttributeModifier",
);
let $TaczEnchantUUID = Java.loadClass("java.util.UUID");

const GUN_VELOCITY_SPEED_UUID = $TaczEnchantUUID.fromString(
  "ed59fcda-0926-4650-a706-a2512c775401",
);
const GUN_VELOCITY_DAMAGE_UUID = $TaczEnchantUUID.fromString(
  "ed59fcda-0926-4650-a706-a2512c775402",
);
const GUN_REGEN_UUID = $TaczEnchantUUID.fromString(
  "ed59fcda-0926-4650-a706-a2512c775403",
);

const GUN_SPEED_ATTRIBUTE = "gunsmithlib:bullet_speed";
const GUN_DAMAGE_MULTIPLIER_ATTRIBUTE = "taa:bullet_gundamage";
const MANA_REGEN_ATTRIBUTE = "manaunification:mana_regen";

NativeEvents.onEvent($TaczEnchantItemAttributeModifierEvent, (event) => {
  if (event.getSlotType() !== "mainhand") return;

  const stack = event.getItemStack();
  if (stack.empty || !$TaczEnchantGunTags.isTargetItem(stack)) return;

  const velocityLevel = stack.getEnchantmentLevel("kubejs:gun_velocity");
  if (velocityLevel > 0) {
    const velocityBonus = 0.2 * velocityLevel;

    event.addModifier(
      GUN_SPEED_ATTRIBUTE,
      new $TaczEnchantAttributeModifier(
        GUN_VELOCITY_SPEED_UUID,
        "Gun Velocity speed bonus",
        velocityBonus,
        "multiply_total",
      ),
    );

    event.addModifier(
      GUN_DAMAGE_MULTIPLIER_ATTRIBUTE,
      new $TaczEnchantAttributeModifier(
        GUN_VELOCITY_DAMAGE_UUID,
        "Gun Velocity damage bonus",
        velocityBonus,
        "multiply_total",
      ),
    );
  }

  const regenLevel = stack.getEnchantmentLevel("kubejs:gun_regen");
  if (regenLevel > 0) {
    event.addModifier(
      MANA_REGEN_ATTRIBUTE,
      new $TaczEnchantAttributeModifier(
        GUN_REGEN_UUID,
        "Gun Regen mana regeneration bonus",
        0.35 * regenLevel,
        "multiply_total",
      ),
    );
  }
});
