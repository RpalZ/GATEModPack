
ServerEvents.customCommand("getNbt", (event) => {
  let nbt = event.player.getNbt();

  FilesJS.writeFile("kubejs/config/debug/playerNbt.json", NBT.toJson(nbt));
  event.level.tell(Text.gold("Check !"));
});

ServerEvents.customCommand("injectNbt", (event) => {
  let custom = {
    hello: "im nbt",
    tree: {
      tree1: "lol",
    },
  };

  let theNbt = NBT.toTagCompound(JSON.stringify(custom));

  let player = event.getPlayer();
  
  // if(player.persistentData == null){
  //   player.persistentData = {}
  // }

  // let health = player.mergeNbt({Health: 100})
  

  player.persistentData.merge(theNbt)
  
  console.log(`[GATE]: ${theNbt}`)
  player.tell(`done lol check ${player.getNbt().contains("hello")}`);
});

ServerEvents.customCommand("removeSpells", event => {
  let player = event.getPlayer()
  let nbt = player.getNbt()

  player.runCommandSilent("/learnSpell forget_all")
  event.getLevel().tell("removed !")
})


ServerEvents.customCommand("resetPersistentData", event => {
    let player  = event.getPlayer()
    if(player) {
        player.persistentData.merge({isTech: false, isMagic: false})
    }
    event.getLevel().tell("Data Resetted!")
})

ServerEvents.customCommand("birthdaySurprise", event => {
  const server = event.getServer()

  const TITLE_1 = "Hey Lina"
  const SUBTITLE_1 = "I Love you!"
  const TITLE_2 = "I like your squishiness"
  const SUBTITLE_2 = "You are so cute"
  const TITLE_3 = "Hope you have a nice day"
  const SUBTITLE_3 = "Thank you for being with me! Mwuah"

  const rainGemsBurst = () => {
    server.runCommandSilent("execute as @a at @s run summon minecraft:item ~2 ~9 ~2 {Item:{id:\"minecraft:diamond\",Count:1b},PickupDelay:40}")
    server.runCommandSilent("execute as @a at @s run summon minecraft:item ~-2 ~10 ~-1 {Item:{id:\"minecraft:diamond\",Count:1b},PickupDelay:40}")
    server.runCommandSilent("execute as @a at @s run summon minecraft:item ~1 ~11 ~-2 {Item:{id:\"minecraft:emerald\",Count:1b},PickupDelay:40}")
    server.runCommandSilent("execute as @a at @s run summon minecraft:item ~-1 ~9 ~2 {Item:{id:\"minecraft:emerald\",Count:1b},PickupDelay:40}")
    server.runCommandSilent("execute as @a at @s run particle minecraft:totem_of_undying ~ ~2 ~ 1.2 1.2 1.2 0.02 40 force @a")
  }

  const startGemRain = (bursts, intervalTicks) => {
    for (let i = 0; i < bursts; i++) {
      server.scheduleInTicks(i * intervalTicks, () => {
        rainGemsBurst()
      })
    }
  }

  const runWave = (title, subtitle, fireworkType) => {
    server.runCommandSilent("title @a times 10 50 20")
    server.runCommandSilent(`title @a title {\"text\":\"${title}\",\"color\":\"gold\",\"bold\":true}`)
    server.runCommandSilent(`title @a subtitle {\"text\":\"${subtitle}\",\"color\":\"light_purple\",\"italic\":true}`)
    server.runCommandSilent("execute as @a at @s run particle minecraft:happy_villager ~ ~1 ~ 0.8 0.8 0.8 0.03 60 force @a")
    server.runCommandSilent("execute as @a at @s run particle minecraft:end_rod ~ ~1.2 ~ 0.6 0.8 0.6 0.01 40 force @a")
    server.runCommandSilent(`execute as @a at @s run summon minecraft:firework_rocket ~ ~1 ~ {LifeTime:15,FireworksItem:{id:\"minecraft:firework_rocket\",Count:1b,tag:{Fireworks:{Flight:2b,Explosions:[{Type:${fireworkType}b,Trail:1b,Flicker:1b,Colors:[I;16738740,16761035,65484],FadeColors:[I;16777215]}]}}}}`)
  }

  server.runCommandSilent("title @a clear")
  server.runCommandSilent('title @a title {"text":"Birthday Event Starting...","color":"yellow","bold":true}')
  server.runCommandSilent('title @a subtitle {"text":"3","color":"gold","bold":true}')

  server.scheduleInTicks(20, () => {
    server.runCommandSilent('title @a subtitle {"text":"2","color":"gold","bold":true}')
    server.runCommandSilent("execute as @a at @s run particle minecraft:flash ~ ~1 ~ 0 0 0 0 1 force @a")
  })

  server.scheduleInTicks(40, () => {
    server.runCommandSilent('title @a subtitle {"text":"1","color":"gold","bold":true}')
    server.runCommandSilent("execute as @a at @s run particle minecraft:flash ~ ~1 ~ 0 0 0 0 1 force @a")
  })

  server.scheduleInTicks(60, () => {
    runWave(TITLE_1, SUBTITLE_1, 0)
  })

  server.scheduleInTicks(130, () => {
    runWave(TITLE_2, SUBTITLE_2, 1)
  })

  server.scheduleInTicks(200, () => {
    runWave(TITLE_3, SUBTITLE_3, 2)
  })

  server.scheduleInTicks(270, () => {
    server.runCommandSilent("title @a times 10 60 30")
    server.runCommandSilent('title @a title {"text":"HAPPY BIRTHDAY!","color":"aqua","bold":true}')
    server.runCommandSilent('title @a subtitle {"text":"❤️","color":"red"}')
    server.runCommandSilent("execute as @a at @s run particle minecraft:firework ~ ~1.2 ~ 1 1 1 0.1 120 force @a")
    server.runCommandSilent("execute as @a at @s run summon minecraft:firework_rocket ~ ~1 ~ {LifeTime:15,FireworksItem:{id:\"minecraft:firework_rocket\",Count:1b,tag:{Fireworks:{Flight:2b,Explosions:[{Type:3b,Trail:1b,Flicker:1b,Colors:[I;16711680,16776960,16777215],FadeColors:[I;16761035]}]}}}}")
  })

  server.scheduleInTicks(300, () => {
    server.runCommandSilent('title @a subtitle {"text":"MONEY Rain!","color":"green","bold":true}')
    startGemRain(12, 8)
  })

  event.getLevel().tell("Birthday sequence started for everyone online!")
})