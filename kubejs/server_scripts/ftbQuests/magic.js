const magicID = "3CD98C0AC429E1B8";

FTBQuestsEvents.customTask(magicID, (event) => {
    
  event.setCheckTimer(20);
  event.setMaxProgress(1)

  event.setCheck((task, player) => {
    let level = player.getLevel();
    let isMagic = player.persistentData.getBoolean("isMagic")

    if(isMagic){
        task.setProgress(1)
    }

    // level.tell(playerNbt)
    // console.log('this is firing')
  });
});

