const angelTask = "18BE6843EA14D664";

FTBQuestsEvents.customTask(angelTask, (event) => {

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


     let isAngel = humanNbt == "gate:angel"
     


    if(isAngel){
        task.setProgress(1)
        player.persistentData.merge({isMagic:true})
        player.give(Item.of("traveloptics:holy_echo"))
    }

    // level.tell(playerNbt)
    // console.log('this is firing')
  });
});
