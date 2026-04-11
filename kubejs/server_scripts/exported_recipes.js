ServerEvents.recipes(event => {

    event.shaped(
            Item.of('minecraft:gunpowder', 4),
            [
                    ' A ',
                    'ABA',
                    ' A '
            ],
            {
                    B: 'minecraft:glowstone_dust',
                    A: 'minecraft:charcoal'
            }
    )
});
