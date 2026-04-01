// Located in kubejs/startup_scripts/projectile_fix.js

const $HitResultType = Java.loadClass(
  "net.minecraft.world.phys.HitResult$Type",
);

const $ProjectileImpactEvent = "net.minecraftforge.event.entity.ProjectileImpactEvent"

global.onProjectileImpact = (event) => {
  // 1. In Forge 1.20.1, the getter is getRayTraceResult()
  const ray = event.getRayTraceResult();
  const projectile = event.getProjectile();
  const owner = projectile.getOwner();
  const level = projectile.level;

  if (level.isClientSide()) return;

  // 2. Safety check: ensure ray isn't null
  if (!ray) return;

  // 3. Check if we hit an ENTITY
  
  let isEntity = ray.getType() === $HitResultType.ENTITY;
  if (!isEntity) return;

  // 4. Get the entity and check its type
  const targetEntity = ray.getEntity();

  // if (owner) {
  //   owner.tell(Text.aqua(`[GATE]: Projectile type: ${projectile.getType()}`));
  // }

  // In KubeJS, .type returns the ResourceLocation (e.g., "minecraft:wither")
  if (targetEntity.type === "minecraft:wither") {
    console.log(`[GATE]: Projectile type: ${projectile.getType()}`);
    console.log("[GATE]: Projectile impact detected on Wither!");

    //have to do some filtering later on probably

    let proj = projectile.entityType.getTags().map((t) => t.location().toString()).toList();



    if (!proj.contains("gate:custom")) return;

    //damage checking

    let damageModifier = 0;

    let { heavyProjectiles } = global.customTags;
    let { mediumProjectiles } = global.customTags;
    let { lightProjectiles } = global.customTags;

    if (proj.contains(heavyProjectiles)) {
      damageModifier = 0.75;
    }

    if (proj.contains(mediumProjectiles)) {
      damageModifier = 0.5;
    }
    if (proj.contains(lightProjectiles)) {
      damageModifier = 0.25;
    }

    let nbt = projectile.getNbt();
    let damage = nbt.getDouble("Damage");

    if (!damage) return;

    let finalDmg = damage * damageModifier;

    if (targetEntity.health >= targetEntity.maxHealth / 2) {
      return;
    }

    let newHealth = targetEntity.health - finalDmg;
    targetEntity.setHealth(newHealth);

    if (newHealth <= 0) {
      targetEntity.kill(); // Ensure it actually dies and drops stars
    }
    // console.log(
    //   `[GATE]: Explosion Pierce! Wither took ${finalDmg} damage from ${projectile.getType()}`,
    // );
    // if (owner) {
    //   owner.tell(
    //     Text.red(
    //       `[GATE]: Explosion Pierce! Wither took ${finalDmg} damage from ${projectile.getType()}.`,
    //     ),
    //   );
    // }

    projectile.discard();

    // Example: If you wanted to cancel the damage/impact:
    // event.setCanceled(true)
  }
};



// Register the listener AFTER the function is defined
ForgeEvents.onEvent(
  $ProjectileImpactEvent,
  (event) => {
    global.onProjectileImpact(event);
  },
);


ForgeEvents.onEvent($ProjectileImpactEvent, (event) => {
  global.debugProjectileImpact(event);
});

//      