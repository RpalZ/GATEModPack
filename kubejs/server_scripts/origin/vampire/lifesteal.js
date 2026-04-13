EntityEvents.hurt(event => {
  const player = event.getSource().getActual()
  
  const damage = event.getDamage()
  
  if(!player) return
  if(!player.isPlayer()) return
  
  const playerNbt = player.getNbt()
   let humanNbt = playerNbt
      .get("cardinal_components")
      .get("origins:origin")
      .get("OriginLayers")
      .get(0)
      .get("Origin");


   let isVampire = humanNbt == "gate:vampire" 
   
   if(!isVampire) return

   const actualPlayer = event.getSource().getPlayer()
   const bloodPower = actualPlayer.getAttributeValue("irons_spellbooks:blood_spell_power") - 1



   player.heal(damage * Math.min(1, bloodPower))

})