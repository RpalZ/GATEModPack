const stormkinTask = "7D75EC37C645AE40";

FTBQuestsEvents.customTask(stormkinTask, (event) => {

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


     let isStormkin = humanNbt == "gate:stormkin"
     


    if(isStormkin){
        task.setProgress(1)
        player.persistentData.merge({isMagic:true})
        player.give(Item.of("traveloptics:lightning_echo"))
        SpellRegistry.getSpellsForSchool("irons_spellbooks:lightning").forEach((m) => {
        if (!m.requiresLearning()) return;
        player.irons_spellbooks$getMagicData().getSyncedData().learnSpell(m);
      });
    }

    // level.tell(playerNbt)
    // console.log('this is firing')
  });
});
