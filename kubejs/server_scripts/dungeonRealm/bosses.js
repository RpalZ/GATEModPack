const $JavaUtil = Java.loadClass("java.util.UUID");

const dungeonStage = "dungeonsunlocked";
/**
 *
 * @param {Internal.BlockContainerJS} block
 * @returns
 */

// function getMapUidFromBlock(block) {
//   let mapData = block.getEntityData();
//   let mapUidRaw = mapData ? mapData.getString("uid") : "";

//   // If the UID is missing or blank, generate a new one and inject it into the block
//   if (!mapUidRaw || mapUidRaw === "") {
//     // Generate a random UUID, remove hyphens, and grab the first 6 characters

//     mapUidRaw = $JavaUtil.randomUUID().toString().replace(/-/g, '');
//   }

//   return mapUidRaw;
// }

function getMapUidFromBlock(block) {
  const mapData = block.getEntityData();
  const mapUidRaw = mapData ? mapData.getLong("spawnpos") : 0;
  return mapUidRaw.toString();
}

EntityEvents.spawned((event) => {
  const level = event.level;
  const dimension = level.getDimension();
  const server = event.server;

  if (dimension.toString() !== "dungeon_realm:dungeon") return;

  /** @type {Internal.Entity} */
  const golem = event.entity;

  if (!golem.type.includes("iron_golem")) return;
  console.log("golemCooked");

  const golemPos = golem.blockPosition();
  const serverPData = server.persistentData;

  let golemUUIDsByMap = serverPData.golemUUIDs || {};
  if (Array.isArray(golemUUIDsByMap)) golemUUIDsByMap = {};

  const golemUUID = golem.uuid.toString();
  const golemUUIDSliced = golemUUID.slice(0, 6);

  // Global scan to prevent duplicate boss spawns
  let isGolemFound = false;
  for (let uuids of Object.values(golemUUIDsByMap)) {
    for (let id of uuids) {
      if (id == golemUUIDSliced) {
        isGolemFound = true;
        break;
      }
    }
  }

  if (isGolemFound) return;

  /** @type {Internal.ArrayList<Player>} */
  const players = level.getPlayers();

  // Find the closest player to grab the mapUid they generated upon clicking
  let closestPlayer = null;
  let closestDist = Number.MAX_VALUE;

  players.forEach((player) => {
    const pPos = player.blockPosition();
    const dx = pPos.x - golemPos.x;
    const dy = pPos.y - golemPos.y;
    const dz = pPos.z - golemPos.z;
    const dist = dx * dx + dy * dy + dz * dz;

    if (dist < closestDist) {
      closestDist = dist;
      closestPlayer = player;
    }
  });

  const mapUid = closestPlayer
    ? closestPlayer.persistentData.getString("dungeonMapUid") || "default"
    : "default";

  /**
   * @param {Player} player
   */
  function getGameStage(player) {
    // eslint-disable-next-line
    return player.stages.getAll();
  }

  // Take the top player with the most game stages
  let size = 0;
  /** @type {Player} */
  let topPlayer = null;

  for (let p of players) {
    let psize = getGameStage(p).size();
    if (psize > size) {
      size = psize;
      topPlayer = p;
    }
  }

  if (!topPlayer) return;

  const entityMap = Object.entries(bossStageGates).filter(
    ([entityId, stages]) => {
      return (
        topPlayer.stages.getAll().contains(stages) &&
        ![
          "minecraft:ender_dragon",
          "block_factorys_bosses:sandworm",
          "minecraft:elder_guardian",
          "undergarden:forgotten_guardian",
          "darkdoppelganger:dark_doppelganger",
          "cataclysm:ancient_remnant"
        ].includes(entityId)
      );
    },
  );

  const bosses = entityMap.map(([entityId, stage]) => entityId).slice(-9, -1);

  if (!bosses.length) return;

  // Replace iron golem with the real boss
  const newBoss = bosses[Math.floor(Math.random() * bosses.length)];
  const newBossEntity = level.createEntity(newBoss);

  golem.setInvulnerable(true);
  golem.setPosition(golemPos.x, golemPos.y + 30, golemPos.z);

  const golemUUIDs = golemUUIDsByMap[mapUid] || [];
  golemUUIDs.push(golemUUIDSliced);
  golemUUIDsByMap[mapUid] = golemUUIDs;

  event.server.persistentData.merge({
    golemUUIDs: golemUUIDsByMap,
  });

  newBossEntity.setPosition(golemPos.x, golemPos.y, golemPos.z);
  newBossEntity.tags.add("boss");

  newBossEntity.persistentData.merge({
    assignedGolem: golemUUID,
    mapUid: mapUid,
  });

  newBossEntity.spawn();
});

EntityEvents.death((event) => {
  const level = event.level;
  const dimension = level.getDimension();

  if (dimension.toString() !== "dungeon_realm:dungeon") return;

  // Filter for boss with tag
  const entity = event.entity;
  if (!entity.tags.contains("boss")) return;

  const blockPosBoss = entity.blockPosition();
  const assignedGolemUUID = entity.persistentData.getString("assignedGolem");
  const mapUid = entity.persistentData.getString("mapUid") || "default";

  const golem = level
    .getEntities()
    .find((ent) => ent.uuid.toString() == assignedGolemUUID);

  let golemUUIDsByMap = event.server.persistentData.golemUUIDs || {};
  if (Array.isArray(golemUUIDsByMap)) golemUUIDsByMap = {};

  const golemUUIDs = (golemUUIDsByMap[mapUid] || []).filter(
    (m) => m !== assignedGolemUUID.slice(0, 6),
  );

  golemUUIDsByMap[mapUid] = golemUUIDs;

  event.server.persistentData.merge({
    golemUUIDs: golemUUIDsByMap,
  });

  // Safety check added here just in case the golem chunk unloaded
  if (golem) {
    golem.setPosition(blockPosBoss.x, blockPosBoss.y, blockPosBoss.z);
    golem.kill();
  }
});

BlockEvents.rightClicked((event) => {
  const block = event.getBlock();
  const item = event.getItem();
  const player = event.player;
  if (!player) return;

  if (block.id !== "dungeon_realm:map_device") return;

 if (!player.stages.has(dungeonStage)) {
    player.setStatusMessage(
      Text.of("You have yet to unlock dungeons...").yellow().italic(),
    );

    event.cancel()
    return;
  }


  if (item.id !== "dungeon_realm:dungeon_map") return;

 

  if (!item.hasNBT()) return;

  const prevMapUid = getMapUidFromBlock(block);

  //check if exist and if exist destroy!

  const mapCollection = event.server.persistentData.golemUUIDs;

  if (mapCollection) {
    mapCollection.remove(prevMapUid);

    event.server.persistentData.merge({
      golemUUIDs: mapCollection,
    });
  }

  // Wait 1 tick to let the base mod assign the UID to the block
  event.server.scheduleInTicks(1, (callback) => {
    // Re-fetch the block just in cas
    //
    // let prevLevel = event.server.getLevel(event.level.dimension)
    // const updatedBlock = prevLevel.getBlock(block.getPos());

    // event.server.tell(block)

    // event.server.tell(updatedBlock)

    const mapUid = getMapUidFromBlock(block);

    // event.level.tell(mapUid)

    event.player.persistentData.merge({
      dungeonMapUid: mapUid,
    });

    let golemUUIDsByMap = event.server.persistentData.golemUUIDs || {};
    if (Array.isArray(golemUUIDsByMap)) golemUUIDsByMap = {};

    golemUUIDsByMap[mapUid] = [];

    event.server.persistentData.merge({
      golemUUIDs: golemUUIDsByMap,
    });

    event.player.setStatusMessage(
      Text.of("A brave mistake...").yellow().italic(),
    );
  });
});

BlockEvents.broken((event) => {
  const block = event.getBlock();

  if (block.id !== "dungeon_realm:map_device") return;

  const mapUid = getMapUidFromBlock(block);

  if (mapUid == "0") return;

  const mapCollection = event.server.persistentData.golemUUIDs;

  if (!mapCollection) return;

  mapCollection.remove(mapUid);

  event.server.persistentData.merge({
    golemUUIDs: mapCollection,
  });
});

// BlockEvents.rightClicked((event) => {
//   const player = event.getPlayer();
//   const block = event.getBlock();
//   const item = event.getItem();
//   const server = event.getServer();
//   const mapUid = getMapUidFromBlock(block) || "default";

//   if (block.id !== "dungeon_realm:map_device") return;
//   if (item.id !== "dungeon_realm:dungeon_map") return;

//   // Save the mapUid to the player so the golem spawn event can find it
//   player.persistentData.merge({
//     dungeonMapUid: mapUid,
//   });

//   let golemUUIDsByMap = server.persistentData.golemUUIDs || {};
//   if (Array.isArray(golemUUIDsByMap)) golemUUIDsByMap = {};

//   golemUUIDsByMap[mapUid] = [];

//   server.persistentData.merge({
//     golemUUIDs: golemUUIDsByMap,
//   });

//   player.setStatusMessage(Text.of("Dungeon golem data cleared.").yellow().italic());
// });

// -------

// BlockEvents.rightClicked((event) => {
//   const player = event.getPlayer();
//   const block = event.getBlock();
//   const item = event.getItem();
//   const server = event.getServer();

//   if (block.id !== "dungeon_realm:map_device") return;
//   if (item.id !== "dungeon_realm:dungeon_map") return;

//   // This will now reliably grab an existing UID or force a new one
//   const mapUid = getMapUidFromBlock(block);

//   event.server.scheduleInTicks(10, () => {
//     block.mergeEntityData({
//       customuid: mapUid
//     })
//   })

// const mapUidSliced = mapUid.slice(0,6)
//   // Save the mapUid to the player so the golem spawn event can find it
//   player.persistentData.merge({
//     dungeonMapUid: mapUidSliced,
//   });

//   let golemUUIDsByMap = server.persistentData.golemUUIDs || {};
//   if (Array.isArray(golemUUIDsByMap)) golemUUIDsByMap = {};

//   golemUUIDsByMap[mapUidSliced] = [];

//   server.persistentData.merge({
//     golemUUIDs: golemUUIDsByMap,
//   });

//   player.setStatusMessage(Text.of("Dungeon golem data cleared.").yellow().italic());
// });

// -------
