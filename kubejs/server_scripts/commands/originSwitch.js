ServerEvents.commandRegistry((event) => {
  const CommandManager = event.commands;
  const Arguments = event.arguments;


  event.register(
    CommandManager.literal("originExchange")
      .requires((source) => source.hasPermission(2))
      .then(
        CommandManager.argument("starAmount", Arguments.INTEGER.create(event)).then(
          CommandManager.argument("raceItem", Arguments.ITEM_STACK.create(event)).then(
            CommandManager.argument("race", Arguments.STRING.create(event)).executes(
              (ctx) => {
                let player = ctx.source.getPlayer();

                /**@type {Number} */
                let starAmount = Arguments.INTEGER.getResult(ctx, "starAmount")
                /**@type {Internal.ItemStack} */
                let raceItem = Arguments.ITEM_STACK.getResult(ctx, "raceItem")
                /**@type {String} */
                let race = Arguments.STRING.getResult(ctx, "race")

                if (!race || !raceItem || !starAmount) return 0;

                // let netherStar = Item.of("nether_star")

                let netherStars = player.inventory.countItem("nether_star");


                if (netherStars < starAmount) {
                  player.setStatusMessage(Text.of("Not enough nether stars!").red().italic());
                  return 0;
                }

                let raceItemN = player.inventory.countItem(raceItem.item.id)

                if(raceItemN <= 0) {
                    player.setStatusMessage(Text.of("You do not have the required race item!").red().italic())
                    return 0
                }



                let invStarIndex = player.inventory.findSlotMatchingItem('nether_star')
                let invStar = player.inventory.getItem(invStarIndex)

                invStar.count -= starAmount


                let raceItemIndex = player.inventory.findSlotMatchingItem(raceItem.item.id)
                let invRaceItem = player.inventory.getItem(raceItemIndex)

                invRaceItem.count -= 1


                //  /origin set RpalQ origins:origin gate:angel 

                let server = ctx.source.server

                let command = `origin set ${player.name.string} origins:origin gate:${race}`
                server.runCommandSilent(command)
                player.setStatusMessage(Text.of(`You felt something has changed...`).yellow().italic())
                return 1;
              },
            ),
          ),
        ),
      ),
  );

  //to be continued tmr
});
