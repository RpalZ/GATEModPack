PlayerEvents.tick((event) => {
  const player = event.player;
  const server = event.server;
  const level = event.level;

  // Running every 2 ticks is fine, but for fluid velocity,
  // checking every tick can make the input feel more responsive.
  if (server.tickCount % 2 != 0) return;

  let nbt = player.nbt;
  let race = getOriginRace(nbt);
  if (race != "gate:stormkin") return;

  // Correct path to Apoli powers in NBT
  let apoliPowers = nbt
    .getCompound("cardinal_components")
    .getCompound("apoli:powers");
  let powers = apoliPowers.getList("Powers", 10);

  if (!powers) return;

  let activated = false;
  for (let i = 0; i < powers.size(); i++) {
    let p = powers.get(i);
    if (
      p.getString("Type") == "gate:dashstorm_trigger" &&
      p.getInt("Data") == 1
    ) {
      activated = true;
      break;
    }
  }

  if (activated) {
    let look = player.lookAngle;

    // Dash power multiplier.
    // 2.5 to 3.5 usually mimics a massive 20-25 block burst over physics updates.
    let dashSpeed = 30.0;

    let velX = look.x() * dashSpeed;
    let velY = look.y() * (dashSpeed * 0.5); // Slightly nerf vertical lift so they don't break orbit
    let velZ = look.z() * dashSpeed;

    // VFX at starting point
    level.spawnLightning(player.x, player.y, player.z, true);

    // Apply velocity vectors
    player.setDeltaMovement(new Vec3d(velX, velY, velZ));

    // Tell the client engine to sync the motion immediately (prevents rubberbanding)
    player.hurtMarked = true;
    // Reset resource immediately so velocity isn't spammed next tick

    server.runCommandSilent(
      `resource set ${player.username} gate:dashstorm_trigger 0`,
    );

    // Play sound
    server.runCommandSilent(
      `execute at ${player.uuid} run playsound minecraft:entity.lightning_bolt.thunder ambient @a ~ ~ ~ 1 1`,
    );
    let spear = level.createEntity("cataclysm:lightning_spear");
    spear.setOwner(player)
    spear.addTag("stormkin")
    spear.spawn();
    player.setInvulnerable(true);

    let timer = 50;

    for (let i = 0; i < timer; i++) {
      server.scheduleInTicks(i, (c) => {
        if (!player || !player.isAlive()) return;
        let delta = player.getDeltaMovement();

        let dx = delta.x();
        let dy = delta.y();
        let dz = delta.z();


        let kineticSpeed = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (kineticSpeed < 5) {
          spear.setDeltaMovement(new Vec3d(0, 0, 0));
          spear.kill();
          player.setInvulnerable(false);
        }

        

        spear.setPos(
          player.x - player.lookAngle.x() * 3,
          player.y + 1,
          player.z - player.lookAngle.z() * 3,
        );

        spear.setDeltaMovement(new Vec3d(dx, dy, dz));

        server.runCommandSilent(
          `execute at ${player.uuid} run playsound minecraft:entity.lightning_bolt.thunder ambient @a ~ ~ ~ 1 1`,
        );

        let interval = c.timer;

        if (interval >= timer) {
          spear.kill();
          player.setInvulnerable(false);
        }
 
      });
    }


  }
});


EntityEvents.hurt(event => {

  const sourceEntity = event.source.immediate

  if(!sourceEntity)return
  if(!sourceEntity.tags.contains("stormkin")) return

  
  const entity = event.entity
  const player = event.source.getPlayer()

  let baseDmg = 50

  let spellPower = player.getAttributeTotalValue("irons_spellbooks:lightning_spell_power")

  let finalDamage = baseDmg * (1 + spellPower)

  entity.attack(event.source.getActual().damageSources().playerAttack(event.source.getPlayer()), finalDamage)

})