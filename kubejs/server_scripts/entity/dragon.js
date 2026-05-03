EntityEvents.spawned((event) => {
  const entity = event.getEntity();
  const server = event.getServer()
  const type = entity.getType();
  const iceAndFire = type.includes("iceandfire");

//   const player = event.getPlayer()
//   player.setAttributeBaseValue("generic.max_health")
//   player.setHealth()

  // player.getAttribute("generic.max_health").addPermanentModifier()

  if (!iceAndFire) return;

  const isDragon = type.includes("dragon");

  if (!isDragon) return;

  const maxHealth = entity.getMaxHealth()
  const newMaxHealth = maxHealth * 1.35

  entity.setAttributeBaseValue("generic.max_health", newMaxHealth)
  entity.setHealth(newMaxHealth)
  
});
