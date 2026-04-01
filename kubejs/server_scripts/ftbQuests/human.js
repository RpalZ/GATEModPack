const taskHumanID = "57B6F68F35683C49";

FTBQuestsEvents.customTask(taskHumanID, (event) => {
  event.setCheckTimer(20);
  event.setMaxProgress(1);

  event.setCheck((task, player) => {
    let level = player.getLevel();
    let playerNbt = player.getNbt();
    let humanNbt = playerNbt
      .get("cardinal_components")
      .get("origins:origin")
      .get("OriginLayers")
      .get(0)
      .get("Origin");

    let isHuman = humanNbt == "gate:human";

    //  level.tell(humanNbt)
    //  level.tell(isHuman)

    if (isHuman) {
      task.setProgress(1);
      player.persistentData.merge({ isTech: true });
      player.setAttributeBaseValue("manaunification:max_mana", 0);
      player.setAttributeBaseValue("irons_spellbooks:max_mana", 0);

      // player.getMagicData().setMana(0)

      // player.getMagicData().saveNBTData()
      // player.syncMana()
      // level.tell('hello")
    }

    // level.tell(playerNbt)
    // console.log('this is firing')
  });
});
