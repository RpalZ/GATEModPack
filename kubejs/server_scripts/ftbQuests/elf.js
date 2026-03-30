const elfTask = "2ED0C04B474E8B81";

FTBQuestsEvents.customTask(elfTask, (event) => {

  event.setCheckTimer(20);
  event.setMaxProgress(1)


  event.setCheck((task, player) => {
    let level = player.getLevel();
    let playerNbt = player.getNbt();
    let humanNbt = playerNbt
      .get("cardinal_components")
      .get("origins:origin")
      .get("OriginLayers")
      .get(0)
      .get("Origin");


     let isElf = humanNbt == "gate:elf"
     


    if(isElf){
        task.setProgress(1)
        player.persistentData.merge({isMagic:true})
    }

    // level.tell(playerNbt)
    // console.log('this is firing')
  });
});
