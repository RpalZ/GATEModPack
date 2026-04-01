EntityEvents.hurt((event) => {
  const { source, damage, entity } = event;
  // This tells you exactly what the 'source.type' is

  if (source.getImmediate() == null) return;

  let tags = source
    .getImmediate()
    .getEntityType()
    .getTags()
    .map((t) => t.location().toString())
    .toList();

  function getSourceInfo() {
    event
      .getLevel()
      .tell(
        Text.blue(
          `[GATE]: Tags From Source: ${tags} with amount: ${damage}. From ${source.getImmediate().getType().toString()}`,
        ),
      );
  }
  //

  let entityTags = entity
    .getEntityType()
    .getTags()
    .map((t) => t.location().toString())
    .toList();

  function getTargetInfo() {
    event
      .getLevel()
      .tell(
        Text.red(
          `Getting all tags from target entity [${entity.getEntityType().toString()}] : ${entityTags}`,
        ),
      );
  }

  // getTargetInfo()
  // getSourceInfo();

  // event.getLevel().tell(Text.red(`[GATE] Checking tag is heavy projectile ${tags.contains("gate:heavy_projectiles")}`))

  // if (source.player) {
  //     source.player.tell(Text.lightPurple(`Detected Source Type: `).append(Text.white(source.getImmediate().getType().toString())));
  //     source.player.tell(Text.darkPurple(`Entity: ${entity.type.toString()}`))
  //     source.player.tell(Text.darkPurple(`Tag: ${tags.toList()}`))
  // source.player.tell(Text.darkPurple(`check: ${source.getImmediate().getEntityType().is("gate:light_projectiles")}`))
  // console.log(`[GATE]: TAGGY ${tags}`)

  // const nbt = source.getImmediate().getNbt()
  // const f = FilesJS.writeFile('kubejs/config/superbwarfare/important.json', nbt)
  // source.player.tell(Text.blue(source.getImmediate().getType().toString().includes("superbwarfare")))
});


// global.onDamageEvent = (event) => {

//     let source = event.getSource()
//     let damage = event.getAmount()
//     let entity = event.getEntity()

//     if (!entity.getEntityType().toString().includes("wither")) return

//     let level = entity.getLevel()

//     let msg = `[GATE][DAMAGE_EVENT]: ${entity.getEntityType().toString()} has been damaged with ${damage}`

//     level.tell(Text.aqua(msg))

//     console.log(msg)

// };

// global.onAttackEvent = (event) => {

//     let source = event.getSource()
//     let damage = event.getAmount()
//     let entity = event.getEntity()
//     let level = entity.getLevel()

//     if (!entity.getEntityType().toString().includes("wither")) return

//     let msg = `[GATE][ATTACK_EVENT]: ${entity.getEntityType().toString()} has been attacked with ${damage}`

//     level.tell(Text.aqua(msg))
//     console.log(msg)

// };

global.debugProjectileImpact = (event) => {
  const ray = event.getRayTraceResult();
  const projectile = event.getProjectile();
  const owner = projectile.getOwner();
  const level = projectile.level;

  // console.log(`[GATE]: Actual Projectile ${projectile}`)

  // level.tell(Text.gold(`[GATE]: Actual Projectile`))
};


