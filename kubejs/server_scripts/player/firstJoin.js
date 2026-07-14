PlayerEvents.loggedIn((event) => {
  let player = event.getPlayer();

  let playerPersistent = player.persistentData;

  if (playerPersistent.firstJoined) return;

  playerPersistent.merge({
    firstJoined: true,
  });

  player.notify(
    Text.of("Welcome to GGM!"),
    Text.of("Check out your questbook to get started!"),
  );
});
