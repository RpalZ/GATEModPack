
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