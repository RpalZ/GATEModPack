// Heres the deal
// When flying, angels can be shot down using any projectiles including guns.
// They will have pseudo HP representing their "Health" during flight
// This hp can only be mutated IF angel is FLYING AND is shot by a PROJECTILE
// once hp = 0 it will disable their flight for 30 seconds until they can fly again.
// This can be done using persistent data for the HP
// when the hp reaches 0, a flag is set to true and give angel a tag.
// this tag can be referenced by origins powers ability to prevent flying.
// when detecting hits, always check flag. if true, ignore, otherwise do smth.

EntityEvents.hurt("player", (event) => {
  let player = event.getPlayer()

  
  let playerNbt = player.getNbt();

  let race = getOriginRace(playerNbt);

  

  if (!race.toString().includes("angel") || !race.toString().includes("dragon")) return;

  let source = event.getSource();
  let sourceTags = source.immediate
    .getEntityType()
    .getTags()
    .map((m) => m.location().toString())
    .toList();

  let isProjectile = sourceTags.some((m) => m.includes("projectile"));

  if (!isProjectile) return;

  let persistentData = player.persistentData;

  let angelHealth = persistentData.getInt("angelHealth");
  let stuntedFlag = persistentData.getBoolean("stuntFlag");

 
  if (stuntedFlag) return;

  if (!angelHealth) {
    persistentData.merge({
      angelHealth: 100,
    });
  } else {
    if (angelHealth <= 0) {
      persistentData.merge({
        stuntFlag: true,
      });


      let server = event.server

      server.scheduleInTicks(20 * 30, () => {
        persistentData.merge({
          stuntFlag: false,
          angelHealth: 100
        });
      })
    } else {

        let damage = event.getDamage()

        persistentData.merge({
            angelHealth: angelHealth - damage
        })
    }
  }
});


PlayerEvents.tick(event => {

    let player = event.getPlayer()
    let persistentData = player.persistentData
    let stunted = persistentData.getBoolean("stuntFlag")
    if(stunted) {
        if (player.isFallFlying()){
            player.stopFallFlying()
        }
    }

})

// EntityEvents.hurt(event => {

//     console.log('hurt hurt ')

//     let player = event.getSource().getPlayer()

//     if(!player) return
//     const playerNbt = player.getNbt()

//     const source = event.getSource()
//     const sourceType = source.immediate.getEntityType().getTags().map(m => m.location().toString()).toList()

//     player.tell(sourceType)

// })
