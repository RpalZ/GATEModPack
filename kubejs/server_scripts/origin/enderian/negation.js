EntityEvents.hurt("player", (event) => {
  let player = event.player;
  if (!player) return;

  let server = event.server;
  let race = getOriginRace(player.nbt);
  if (race !== "gate:enderian") return;

  if (event.damage >= player.health) {
    if (Math.random() < 0.35) {
      // 30% chance
        player.setInvulnerable(true)
      server.scheduleInTicks(2, (c) => {

        player.setInvulnerable(false)
        player.setStatusMessage(
          Text.of("Void energy teleports you away from death!")
            .darkPurple()
            .italic(),
        );
        let rx = (Math.random() - 0.5) * 100;
        let rz = (Math.random() - 0.5) * 100;

        player.teleportTo(player.x + rx, player.y + 5, player.z + rz);

        player.level.spawnParticles(
          "minecraft:portal",
          true,
          player.x,
          player.y + 1,
          player.z,
          1,
          1,
          1,
          50,
          0.1,
        );
        player.level.playSound(
          null,
          player.blockPosition(),
          "minecraft:entity.enderman.teleport",
          "players",
          1.0,
          1.0,
        );
      });

      // Random teleport in 50 block radius
      player.heal(player.maxHealth)
      event.cancel();
    }
  }
});

