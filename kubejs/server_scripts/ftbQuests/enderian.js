const enderianTask = "5B1D25FCC98ADB14";

FTBQuestsEvents.customTask(enderianTask, (event) => {

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


     let isEnderian = humanNbt == "gate:enderian"
     


    if(isEnderian){
        task.setProgress(1)
        player.persistentData.merge({isMagic:true})
        player.give(Item.of("traveloptics:ender_echo"))

        SpellRegistry.getSpellsForSchool("irons_spellbooks:ender").forEach((m) => {
        if (!m.requiresLearning()) return;
        player.irons_spellbooks$getMagicData().getSyncedData().learnSpell(m);
      });
    }

    // level.tell(playerNbt)
    // console.log('this is firing')
  });
});
