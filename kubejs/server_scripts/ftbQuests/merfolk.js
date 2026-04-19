const merfolkTask = "7EC6B96F6D25DE7B";

FTBQuestsEvents.customTask(merfolkTask, (event) => {

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


     let isMerfolk = humanNbt == "gate:merfolk"
     


    if(isMerfolk){
        task.setProgress(1)
        player.persistentData.merge({isMagic:true})
        player.give(Item.of("traveloptics:aqua_echo"))

    }

    // level.tell(playerNbt)
    // console.log('this is firing')
  });
});
