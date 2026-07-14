let $LivingHurtEvent = Java.loadClass(
  "net.minecraftforge.event.entity.living.LivingHurtEvent",
);

NativeEvents.onEvent($LivingHurtEvent, (event) => {
  let source = event.getSource();
  let player = source.getPlayer();

  if (!player) return;

  let playerNbt = player.nbt;

  let race = getOriginRace(playerNbt);

  if (race == "gate:human") return;

  if (source.getType() != "player") return;

  let immediateSource = source.getImmediate();

  if (!immediateSource) return;

  // player.tell(immediateSource.type)

  let damage = event.getAmount();

  let spellPower = player.getAttributeTotalValue(
    "irons_spellbooks:spell_power",
  );


  event.setAmount(damage * (1 + spellPower / 5));
});

// EntityEvents.hurt("wither", (event) => {
//   let source = event.getSource();
//   let player = source.getPlayer();

//   if (!player) return;

//   let playerNbt = player.nbt;

//   let race = getOriginRace(playerNbt);

//   if (race == "gate:human") return;

//   if (source.getType() != "player") return;

//   let immediateSource = source.getImmediate();

//   if (!immediateSource) return;

//   // player.tell(immediateSource.type)

//   let damage = event.damage;

//   let spellPower = player.getAttributeTotalValue(
//     "irons_spellbooks:spell_power",
//   );

//   let wither = event.getEntity();

//   wither.attack(source, damage * (1 + spellPower / 7));
// });
