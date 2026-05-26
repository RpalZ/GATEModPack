ItemEvents.rightClicked("kubejs:hero_gem", (event) => {
  const gem = event.getItem();
  const player = event.getPlayer();
  const level = event.getLevel();
  const server = event.getServer();

  const playerName = player.getName();
  player.setStatusMessage(
    Text.of("You feel your feet lifted...").yellow().italic(),
  );
  const dingy = `execute in gate:leaders_world run tp ${playerName.string} 15 103 99`;

  const serverData = server.persistentData;

  const serverVersion = serverData.getString("version");

  if (
    serverData.getBoolean("hallwayGenerated") &&
    serverVersion == $GameVersion
  ) {
    server.scheduleInTicks(20, (e) => {
      server.runCommandSilent(dingy);
      player.setStatusMessage("");
    });
  } else {
    server.runCommandSilent(
      "execute in gate:leaders_world run forceload add -30 -30 30 200",
    );

    server.persistentData.merge({
      hallwayGenerated: true,
      version: $GameVersion,
    });

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

      server.scheduleInTicks(5, (e) => {
        server.runCommandSilent(dingy);
        player.setStatusMessage("");
      });
    });
  }
});
