EntityEvents.spawned((event) => {
  const entity = event.getEntity();
  const server = event.getServer();
  const type = entity.getType();
  const iceAndFire = type.includes("iceandfire");

  //   const player = event.getPlayer()
  //   player.setAttributeBaseValue("generic.max_health")
  //   player.setHealth()

  // player.getAttribute("generic.max_health").addPermanentModifier()

  if (!iceAndFire) return;

  const isDragon = type.includes("dragon");

  if (!isDragon) return;

  if (!entity) return;

  const maxHealth = entity.maxHealth || null;

  if (!maxHealth) return;

  const newMaxHealth = maxHealth * 1.65;

  entity.maxHealth = newMaxHealth;
  entity.health = newMaxHealth;
});
