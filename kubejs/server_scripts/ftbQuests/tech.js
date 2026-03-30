const techTaskID = "0F4C183BF50F9FA8";

FTBQuestsEvents.customTask(techTaskID, (event) => {

  event.setCheckTimer(20);
  event.setMaxProgress(1)


  event.setCheck((task, player) => {
    let level = player.getLevel();
    let isTech = player.persistentData.getBoolean("isTech");
    

     
     

    //  level.tell(humanNbt)
    //  level.tell(isHuman)
    // level.tell(isTech)
    if(isTech){
        task.setProgress(1)
        // level.tell('hello')
    }
    // task.setProgress(10)


    // level.tell(playerNbt)
    // console.log('this is firing')
  });
});
