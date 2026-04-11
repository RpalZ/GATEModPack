// Located in kubejs/startup_scripts/projectile_fix.js

const $HitResultType = Java.loadClass(
  "net.minecraft.world.phys.HitResult$Type",
);

const $ProjectileImpactEvent =
  "net.minecraftforge.event.entity.ProjectileImpactEvent";



// Register the listener AFTER the function is defined
ForgeEvents.onEvent($ProjectileImpactEvent, (event) => {
  global.onProjectileImpact(event);
});

ForgeEvents.onEvent($ProjectileImpactEvent, (event) => {
  global.debugProjectileImpact(event);
});

//
