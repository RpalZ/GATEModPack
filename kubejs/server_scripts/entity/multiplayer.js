const multiplayerBosses = new Map();
const baseMaxHealthKey = "gateBaseMaxHealth";

ServerEvents.tick((event) => {
  const server = event.server;

  const tick = server.tickCount;

  if (tick % 20 != 0) return;

  const chunkRadius = 5;

  // multiplayerBosses.forEach((val, key) => {
  //   server.tell(`KEY: ${key}`)
  // })
  //locate all bossStages entities

  const bosses = Object.keys(bossStageGates);
  const players = server.players;
  const activeBosses = new Set();

  server.entities.forEach((entity) => {
    if (!bosses.includes(entity.type)) return;

    let uuid = entity.uuid.toString().slice(0, 8);
    activeBosses.add(uuid);

    let bBlockPos = entity.blockPosition();
    let bX = bBlockPos.x;
    let bZ = bBlockPos.z;

    let playersDetected = 0;

    players.forEach((player) => {
      let pBlockPos = player.blockPosition();
      let pX = pBlockPos.x;
      let pZ = pBlockPos.z;
      let dX = bX - pX;
      let dZ = bZ - pZ;
      if (dX * dX + dZ * dZ <= ((chunkRadius * 16) ** 2)) {
        playersDetected++;
      }
    });

    // server.tell(`players detected: ${playersDetected}`)
    // Track boss state per entity

    let bossState = multiplayerBosses.get(uuid);

    // Clean up if entity is dead or removed
    if (entity.isRemoved() || entity.health <= 0) {
      if (multiplayerBosses.has(uuid)) {
        multiplayerBosses.delete(uuid);
        // server.tell(`Cleaned up boss state for ${uuid}`);
      }
      return;
    }

    // server.tell(entity.uuid.toString())

    let firstTime = false
    if (!bossState) {
      firstTime=true
      let baseMaxHealth = entity.persistentData.getDouble(baseMaxHealthKey);
      if (!baseMaxHealth || baseMaxHealth <= 0) {
        baseMaxHealth = entity.maxHealth;
        entity.persistentData.merge({
          gateBaseMaxHealth: baseMaxHealth,
        });
      }

      // server.tell('no bossstate found')
      bossState = {
        baseHealth: entity.health,
        baseMaxHealth: baseMaxHealth,
        lastPlayers: playersDetected
      };
      multiplayerBosses.set(uuid, bossState);
    }

    // server.tell(`boss state player detected: ${bossState.lastPlayers}`)

    // Only update if player count changed

    if (firstTime || playersDetected !== bossState.lastPlayers) {
      let multiplier = Math.max(playersDetected, 1);
      // Preserve health percentage

      // server.tell(`multiplier: ${multiplier}`)
      let healthPercent = entity.health / entity.maxHealth;
      entity.maxHealth = bossState.baseMaxHealth * multiplier;
      entity.health = entity.maxHealth * healthPercent;
      bossState.lastPlayers = playersDetected;

      multiplayerBosses.set(uuid, bossState)

      // server.tell("server shenanigans")
    }
  });

  multiplayerBosses.forEach((_, uuid) => {
    if (!activeBosses.has(uuid)) {
      multiplayerBosses.delete(uuid);
    }
  });
});
