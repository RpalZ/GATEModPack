BlockEvents.broken((event) => {
  const level = event.getLevel();
  const player = event.getPlayer();
  const dimension = level.getDimension().toString();

  if (dimension !== "gate:leaders_world") return;

  if (!player) return event.cancel();

  const isOp = player.hasPermissions(2);

  if (!isOp) {
    event.cancel();
  }
});
BlockEvents.placed((event) => {
  const level = event.getLevel();
  const player = event.getPlayer();
  const dimension = level.getDimension().toString();

  if (dimension !== "gate:leaders_world") return;

  if (!player) return event.cancel();

  const isOp = player.hasPermissions(2);

  if (!isOp) {
    event.cancel();
  }
});

EntityEvents.spawned(event => {

  let level = event.level
  let dimension = level.getDimension()

  if(dimension.toString() == "gate:leaders_world") {

    let entity = event.entity
    let id = entity.getType()
    if(entity.player) return
    if(!entity.isLiving()) return

    if(!id.includes("easy_npc")) {
      event.cancel()
    }

  }
})

LevelEvents.beforeExplosion((event) => {
  const level = event.getLevel();
  const dimension = level.getDimension();

  if (dimension.toString() == "gate:leaders_world") {
    event.cancel();
    return;
  }
});
