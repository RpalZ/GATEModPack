const dragonborneTask = "31ED1007EDCD5A49";

FTBQuestsEvents.customTask(dragonborneTask, (event) => {

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


     let isDragonborne = humanNbt == "gate:dragonborne"
     


    if(isDragonborne){
        task.setProgress(1)
        player.persistentData.merge({isMagic:true})
        player.give(Item.of("traveloptics:fire_echo"))

        SpellRegistry.getSpellsForSchool("irons_spellbooks:fire").forEach((m) => {
        if (!m.requiresLearning()) return;
        player.irons_spellbooks$getMagicData().getSyncedData().learnSpell(m);
      });
    }

    // level.tell(playerNbt)
    // console.log('this is firing')
  });
});
