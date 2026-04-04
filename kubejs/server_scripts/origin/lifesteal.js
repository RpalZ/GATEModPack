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

   player.heal(damage * .1)

})