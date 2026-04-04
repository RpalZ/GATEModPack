EntityEvents.hurt(event => {
  const player = event.getSource().getActual()
  
  const damage = event.getDamage()
  const playerNbt = player.getNbt()

  if(!player) return
  if(!player.isPlayer()) return
 
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