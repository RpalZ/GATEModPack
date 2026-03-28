global.onEntityHurtByGun = (event) => {
  if (event.getLogicalSide().isClient()) return;

  let targetEntity = event.getHurtEntity();
  let bullet = event.getBullet();
  let tags = bullet
    .getEntityType()
    .getTags()
    .map((t) => t.location().toString())
    .toList();
  let level = targetEntity.getLevel();

  let message = `[GATE]: Target Entity Detected by Bullet Damage ${bullet.getType().toString()} with Bullet Tags: ${tags} with Entity: ${targetEntity.getType().toString()}`;

//   console.log(message);
//   level.tell(message);

  let isWither = targetEntity.getType() === "minecraft:wither";

  if (!isWither) return;
//   level.tell("Wither detected");

  let isLightProjectile = tags.contains("gate:light_projectiles");
  if (!isLightProjectile) return;

  let attacker = event.getAttacker();
  if(!attacker) return
  let isPlayer = attacker.isPlayer();

  if (!isPlayer) return;

attacker.setStatusMessage(Text.of("You need something bigger...").red().italic())

  let damage = Math.min(event.getBaseAmount() * 0.1, 10);

  let newHealth = targetEntity.health - damage;
  targetEntity.setHealth(newHealth);

  if (newHealth <= 0) {
    targetEntity.kill(); // Ensure it actually dies and drops stars
  }
};

// ForgeEvents.onEvent("com.tacz.guns.api.event.common.EntityHurtByGunEvent$Post")
