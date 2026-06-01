EntityEvents.spawned("iron_golem", (event) => {
  const level = event.level;
  const dimension = level.getDimension();
  const server = event.server


  if (dimension.toString() !== "dungeon_realm:dungeon") return;

  /**
   * @type {Internal.Entity}
   */
  const golem = event.entity;

  const serverPData = server.persistentData

  //check if uuid is there

  const golemUUIDs = serverPData.golemUUIDs || []

  const golemUUID = golem.uuid.toString()
  const golemUUIDSliced = golemUUID.slice(0, 6)

  

  let isGolemFound = false

  for(let uuid of golemUUIDs) {

    // server.tell(`${uuid} UUID`)
    // server.tell(`${golemUUIDSliced} GOLEMUUID`)

    if(uuid == golemUUIDSliced) {
      isGolemFound = true
    }
  }

  // console.log(isGolemFound)

  if(golemUUIDs && isGolemFound) return


  /**@type {Internal.ArrayList<Player>} */

  const players = level.getPlayers();

  //take the top player with the most game stage

  // console.log(players);

  /**
   * @param {Player} player
   *
   */
  function getGameStage(player) {
    // eslint-disable-next-line
    return player.stages.getAll();
  }

  let size = 0;

  /**
   * @type {Player}
   */

  let topPlayer = null;

  for (let p of players) {
    let psize = getGameStage(p).size();

    if (psize > size) {
      size = psize;
      topPlayer = p;
    }
  }

  console.log(topPlayer);

  if (!topPlayer) return;

  //match gameEvent to corresponding entities

  /**
   * @type {String[][]}
   */

  const entityMap = Object.entries(bossStageGates).filter(
    /**
     *
     * @param {String[]} param0
     */
    ([entityId, stages]) => {
      return (
        topPlayer.stages.getAll().contains(stages) &&
        !["minecraft:ender_dragon", "block_factorys_bosses:sandworm", "minecraft:elder_guardian", "undergarden:forgotten_guardian"].includes(entityId)
      );
    },
  );

  const bosses = entityMap.map(([entityId, stage]) => entityId).slice(-6, -1);

  // console.log(bosses);

  if (!bosses.length) return;

  //replace iron golem with the real boss

  const newBoss = bosses[Math.floor(Math.random() * bosses.length)];

  const newBossEntity = level.createEntity(newBoss);

  const golemPos = golem.blockPosition();



  // golem.kill();


  golem.setInvulnerable(true)


  golem.setPosition(golemPos.x, golemPos.y + 30, golemPos.z)

  golemUUIDs.push(golemUUIDSliced)

  // server.tell(golemUUIDs)

  // server.tell(golemUUIDSliced)

  event.server.persistentData.merge({
    golemUUIDs: golemUUIDs
  })
 
  

  newBossEntity.setPosition(golemPos.x, golemPos.y, golemPos.z);

  newBossEntity.tags.add("boss")

  newBossEntity.persistentData.merge({
    assignedGolem: golemUUID
  })

  newBossEntity.spawn();
});


EntityEvents.death(event => {
   const level = event.level;
  const dimension = level.getDimension();

  if (dimension.toString() !== "dungeon_realm:dungeon") return;

  //filter for boss with tag

  const entity = event.entity

  if(!entity.tags.contains("boss")) return

  // level.tell("yea bro fricking boss tag chief")

  const blockPosBoss = entity.blockPosition() 

  //scan for golems 

  const assignedGolemUUID = entity.persistentData.getString("assignedGolem")

  const golem = level.getEntities().find(ent => ent.uuid.toString() == assignedGolemUUID)

  const golemUUIDs = event.server.persistentData.golemUUIDs.filter(m => m !== assignedGolemUUID.slice(0, 6))

  event.server.persistentData.merge({
    golemUUIDs: golemUUIDs
  })

  // console.log(event.server.persistentData.golemUUIDs)

  golem.setPosition(blockPosBoss.x, blockPosBoss.y, blockPosBoss.z)

  golem.kill()

})