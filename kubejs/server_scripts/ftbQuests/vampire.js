const vampTask = "051700C9843FD136";

FTBQuestsEvents.customTask(vampTask, (event) => {

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


     let isVampire = humanNbt == "gate:vampire"
     


    if(isVampire){
        task.setProgress(1)
        player.persistentData.merge({isMagic:true})

    }

    // level.tell(playerNbt)
    // console.log('this is firing')
  });
});
