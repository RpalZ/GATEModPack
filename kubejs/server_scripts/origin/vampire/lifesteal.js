EntityEvents.hurt(event => {
  const player = event.getSource().getPlayer()

  if(!player) return
  if(!player.isPlayer()) return
  
  const damage = event.getDamage()
  
  
  const playerNbt = player.getNbt()
   let humanNbt = playerNbt
      .get("cardinal_components")
      .get("origins:origin")
      .get("OriginLayers")
      .get(0)
      .get("Origin");
      
      
      let isVampire = humanNbt == "gate:vampire" 
      
      if(!isVampire) return
      
   const bloodPower = player.getAttributeValue("irons_spellbooks:blood_spell_power") - 1

   player.heal(damage * Math.min(1, bloodPower))

})