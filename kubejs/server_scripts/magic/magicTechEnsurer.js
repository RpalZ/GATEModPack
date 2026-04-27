ItemEvents.rightClicked((event) => {
  const item = event.getItem();
  const hasTech = item.hasTag(global.techTag);
  const hasMagic = item.hasTag(global.magicTag);
  const player = event.getPlayer();
  const playerMagic = player.persistentData.getBoolean("isMagic");
  const playerTech = player.persistentData.getBoolean("isTech");

  const level = event.getLevel();

  //   level.tell(`magic: ${playerMagic}, tech: ${playerTech}`)

  if (item.isBlock()) return;
  if (item.isEdible()) return;
  

  if (!playerMagic && hasMagic) {
    player.setStatusMessage(
      Text.of("You need to unlock magic to use this item...").yellow().italic(),
    );
    event.cancel();
  }
  if (!playerTech && hasTech) {
    player.setStatusMessage(
      Text.of("You need to unlock tech to use this item...").yellow().italic(),
    );
    event.cancel();
  }
});

PlayerEvents.spellPreCast((event) => {
  const player = event.getPlayer();

  if (!player) return;
  const isMagic = player.persistentData.getBoolean("isMagic");

  if (!isMagic) {
    player.setStatusMessage(
      Text.of("You need to unlock magic to cast spells...").yellow().italic(),
    );

    event.cancel();
  }
});


CuriosJSEvents.equip(event => {
  const player = event.getPlayer()
  const isMagicItem = event.stack.hasTag(global.magicTag)
  const isTechItem = event.stack.hasTag(global.techTag)


  if(!player) return
  
  const hasMagic = player.persistentData.getBoolean("isMagic")
  const hasTech = player.persistentData.getBoolean("isTech")

  if(!hasMagic && isMagicItem){
    player.setStatusMessage(
      Text.of("You need to unlock magic to equip this item...").yellow().italic(),
    );

    player.give(event.stack.copyAndClear());
    
  }
  if(!hasTech && isTechItem){
     player.setStatusMessage(
      Text.of("You need to unlock magic to equip this item...").yellow().italic(),
    );

    player.give(event.stack.copyAndClear());
  
  }
})


TimelessGunEvents.gunFire(event => {
  const player = event.getShooter()
  if(!player.isPlayer()) return

  const hasTech = player.persistentData.getBoolean("isTech")

  if(!hasTech) {
    player.setStatusMessage(
      Text.of("Your hands lack the dexterity...").yellow().italic()
    )

    event.cancel()
  }
})


ItemEvents.entityInteracted(event =>{
  const interacted = event.getTarget()
  const tags = interacted.getEntityType().getTags().map(m => m.location().toString()).toList()
  
  const tech = "gate:tech"
  const magic = "gate:magic"

  const player = event.getPlayer()

  // player.tell(tags)

  if(tags.contains(magic) && !player.persistentData.getBoolean("isMagic")) {
    player.setStatusMessage(Text.of("You lack Magical Tendency").red().italic())
    event.cancel()
  }

  if(tags.contains(tech) && !player.persistentData.getBoolean("isTech")) {
    player.setStatusMessage(Text.of("You lack Technical Tendency").red().italic())
    event.cancel()
  }
  
})
