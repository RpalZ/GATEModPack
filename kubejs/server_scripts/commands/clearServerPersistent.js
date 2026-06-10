ServerEvents.customCommand("clearServerPersistent", (event) => {
  const server = event.getServer();
  server.persistentData.merge({
    golemUUIDs: [],
  });
  server.tell("Server NBT Cleared");
});

ServerEvents.customCommand("logServerData", (event) => {
  const server = event.server;
  const data = server.persistentData;
  console.log(data);
  event.server.tell(data);
});
