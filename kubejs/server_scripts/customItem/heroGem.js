ItemEvents.rightClicked('kubejs:hero_gem', event => {
    const gem = event.getItem()
    const player = event.getPlayer()
    const level = event.getLevel()
    const server = event.getServer()

    const playerName = player.getName()
    player.setStatusMessage(Text.of("You feel your feet lifted...").yellow().italic())
    const dingy = `execute in gate:leaders_world run tp ${playerName.string} 15 103 99`


    
    const serverData = server.persistentData;

  // console.log("[GATE]: FIRED")
  // server.tell("fired")

  if (serverData.getBoolean("hallwayGenerated")) return;

  // console.log("[GATE]: FIRED AGAIN")

  // if(dimension.toString() !== "gate:leaders_world") return

  server.runCommandSilent(
    "execute in gate:leaders_world run forceload add -30 -30 30 200",
  );

  // console.log("[GATE]: FIRED AGAIN!!")

  server.persistentData.merge({ hallwayGenerated: true });

  server.scheduleInTicks(20, (e) => {
    const result = server.runCommandSilent(
      "execute in gate:leaders_world run place template gate:story/main/leaders_hallway 0 100 0 none none",
    );
    server.runCommandSilent(
      "execute in gate:leaders_world run setworldspawn 15 103 99",
    );
    server.runCommandSilent(
      "execute in gate:leaders_world run forceload remove all",
    );


    server.scheduleInTicks(20, (e) => {
        server.runCommandSilent(dingy)
        player.setStatusMessage("")
    })

    // console.log("[GATE]: YAY")
  });


    
})