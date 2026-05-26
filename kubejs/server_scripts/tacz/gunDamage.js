
TimelessGunEvents.entityHurtByGunPost((event) => {
  if (event.getLogicalSide().isClient()) return;

  let targetEntity = event.getHurtEntity();
  let bullet = event.getBullet();
  let tags = bullet
    .getEntityType()
    .getTags()
    .map((t) => t.location().toString())
    .toList();

  let isWither = targetEntity.getType() === "minecraft:wither";

  if (!isWither) return;
  
  if (targetEntity.health >= targetEntity.maxHealth * 0.5) return;

  let isLightProjectile = tags.contains("gate:light_projectiles");
  if (!isLightProjectile) return;

  let attacker = event.getAttacker();
  if (!attacker) return;
  let isPlayer = attacker.isPlayer();

  if (!isPlayer) return;

  attacker.setStatusMessage(
    Text.of("You need something bigger...").red().italic(),
  );

  let damage = Math.min(event.getBaseAmount() * 0.1, 35);

  const source = attacker.damageSources().playerAttack(attacker);
  targetEntity.attack(source, damage)

});


TimelessGunEvents.entityHurtByGunPre(event => {

  const target = event.getHurtEntity()

  const targetType = target.getType()
  const isDragon = targetType.includes("dragon")



  if(!isDragon) return

  const pistols = ["9mm", "45acp", "57x28", "50ae", "357mag"]

  
  const bulletID = event.getBullet().getAmmoId().toString()
  const isPistol = pistols.some(pistol => bulletID.includes(pistol))


  if(!isPistol) return

  const damage = event.getBaseAmount()

  event.setBaseAmount(damage * 0.4)
  
})


