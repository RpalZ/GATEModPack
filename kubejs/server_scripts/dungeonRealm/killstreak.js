EntityEvents.death((event) => {
  const level = event.level;

  const dimension = level.getDimension();

  if (dimension.toString() !== "dungeon_realm:dungeon") return;

  const player = event.source.getPlayer();

  if (!player) return;

  const persistentData = player.persistentData;

  let preKill = persistentData.getInt("dungeonKills") || 0;

  let postKill = preKill + 1;

  // player.tell(postKill)
  let nKillsNeeded = 5

  if (postKill % nKillsNeeded == 0) {
    //special effects
    const effects = [
      "minecraft:speed",
      "minecraft:regeneration",
      "minecraft:absorption",
      "minecraft:resistance",
      "minecraft:strength",
    ];

    let triggers = Math.floor(postKill / nKillsNeeded);
    let index = (triggers - 1) % effects.length;
    if (index < 0) index = (index + effects.length) % effects.length;
    player.setStatusMessage(Text.of("You feel rage...").red().italic());

    player.potionEffects.add(effects[index], 30 * 20, 2, true, false);

    const mainHandItem = player.getMainHandItem()

    const isGun = $GunTags.isTargetItem(mainHandItem)

    if(isGun) {



      const randomN = Math.floor(Math.random() * 3)


      if(randomN == 2) {

        const tagGun = mainHandItem.getOrCreateTag()
        
        const gunId = tagGun.getString("GunId")
        const gunData = TaCZJSUtils.getGunIndex(gunId).getGunData()
        const maxAmmoAmount = gunData.ammoAmount
        
        const currentAmmo = tagGun.getInt("GunCurrentAmmoCount")
        
        // player.tell(currentAmmo)
        const ammoToAdd = Math.max(maxAmmoAmount - currentAmmo, 0) + currentAmmo
        
        // player.tell(ammoToAdd)
        mainHandItem.getOrCreateTag().putInt("GunCurrentAmmoCount", ammoToAdd)
        
        
        
        player.setMainHandItem(mainHandItem)
        
        //   const ammoId = gunData.ammoId
        
        //  player.give(Item.of("tacz:ammo", 30, {AmmoId: ammoId.toString()}))
      }
    }

  }

  persistentData.merge({
    dungeonKills: postKill,
    timerKill: 8,
  });
});

PlayerEvents.tick((event) => {
  const level = event.level;
  const server = event.server;

  if (server.tickCount % 20 !== 0) return;

  const dimension = level.getDimension();

  if (dimension.toString() !== "dungeon_realm:dungeon") return;

  const player = event.getPlayer();

  const persData = player.persistentData;

  const timer = persData.getInt("timerKill");

  // player.tell(timer)

  if (timer !== null) {
    if (timer < 0) return;

    if (timer <= 0) {
      persData.merge({
        dungeonKills: 0,
        timerKill: -1,
      });

      return;
    }

    persData.merge({
      timerKill: timer - 1,
    });
  } else {
    return;
  }
});
