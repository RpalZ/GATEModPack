
// global.onEntityHurtByGun = (event) => {
//   handleWither(event);
// };

// ForgeEvents.onEvent("com.tacz.guns.api.event.common.EntityHurtByGunEvent$Post")

TimelessGunEvents.entityHurtByGunPost((event) => {
  if (event.getLogicalSide().isClient()) return;

  let targetEntity = event.getHurtEntity();
  let bullet = event.getBullet();
  let tags = bullet
    .getEntityType()
    .getTags()
    .map((t) => t.location().toString())
    .toList();
  // let level = targetEntity.getLevel();

  
  // let message = `[GATE]: Target Entity Detected by Bullet Damage ${bullet.getType().toString()} with Bullet Tags: ${tags} with Entity: ${targetEntity.getType().toString()}`;

  // console.log(message);
  // level.tell(message);

  let isWither = targetEntity.getType() === "minecraft:wither";

  if (!isWither) return;
  //   level.tell("Wither detected");

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

  let damage = Math.min(event.getBaseAmount() * 0.1, 10);

  const source = attacker.damageSources().playerAttack(attacker);
  // let newHealth = targetEntity.health - damage;
  // targetEntity.setHealth(newHealth);

  targetEntity.attack(source, damage)

  // if (newHealth <= 0) {
  //   targetEntity.kill(); // Ensure it actually dies and drops stars
  // }
});

// EntityEvents.hurt(event => {
//   const server = event.getServer()
//   const targetEntity = event.getEntity()
//   const sourceEntity = event.getSource().getImmediate()

  
//   if(!sourceEntity) return

//   const sourceEntityNBT = sourceEntity.getNbt()
//   const sourceEntityType = sourceEntity.getType()
//   const sourceEntityEntityType = sourceEntity.getTags().map(m => m)
//   const s = sourceEntity.getEntityData().assignValues()
//   server.tell("Entity Hurt")
  
//   console.log(sourceEntityNBT.toString())
//   server.tell(sourceEntityType)
//   server.tell(sourceEntityEntityType)
//   server.tell(s)

  
// })

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



// TimelessItem.ammoItem("tacz:ammo", )