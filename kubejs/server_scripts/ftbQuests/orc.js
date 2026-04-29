const orcTask = "5F4D1FECEB56E979";

FTBQuestsEvents.customTask(orcTask, (event) => {

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


     let isOrc = humanNbt == "gate:orc"
     


    if(isOrc){
        task.setProgress(1)
        player.persistentData.merge({isMagic:true})
        player.give(Item.of("traveloptics:evocation_echo"))
      SpellRegistry.getSpellsForSchool("irons_spellbooks:evocation").forEach((m) => {
        if (!m.requiresLearning()) return;
        player.irons_spellbooks$getMagicData().getSyncedData().learnSpell(m);
      });
    }

    // level.tell(playerNbt)
    // console.log('this is firing')
  });
});
