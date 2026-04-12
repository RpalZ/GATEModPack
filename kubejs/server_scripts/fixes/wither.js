global.onProjectileImpact = (event) => {
  // 1. In Forge 1.20.1, the getter is getRayTraceResult()

    const $HitResultType = Java.loadClass(
  "net.minecraft.world.phys.HitResult$Type",
);


  const ray = event.getRayTraceResult();
  const projectile = event.getProjectile();
  const owner = projectile.getOwner();
  const level = projectile.level;

  if(!owner) return

  if(!owner.isPlayer()) return

  if (level.isClientSide()) return;

  // 2. Safety check: ensure ray isn't null
  if (!ray) return;

  // 3. Check if we hit an ENTITY

  let isEntity = ray.getType() === $HitResultType.ENTITY;
  if (!isEntity) return;

  // 4. Get the entity and check its type
  const targetEntity = ray.getEntity();

  // In KubeJS, .type returns the ResourceLocation (e.g., "minecraft:wither")
  if (targetEntity.type === "minecraft:wither") {
    console.log(`[GATE]: Projectile type: ${projectile.getType()}`);
    console.log("[GATE]: Projectile impact detected on Wither!");

    //have to do some filtering later on probably

    let proj = projectile.entityType
      .getTags()
      .map((t) => t.location().toString())
      .toList();

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

    let damageSource;
    if (owner) {
      // Attributes the kill to the player who shot the projectile
      damageSource = level.damageSources().playerAttack(owner);
    } else {
      damageSource = level.damageSources().generic();
    }

    targetEntity.attack(damageSource, finalDmg);
   

    projectile.discard();

  }
};