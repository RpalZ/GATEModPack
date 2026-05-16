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

    event.shapeless(
            Item.of('minecraft:string', 4),
            [
                    Ingredient.of("#minecraft:wool", 1)
            ]
    )
    event.shaped(
            Item.of('minecraft:cobweb'),
            [
                    ' A ',
                    'AAA',
                    ' A '
            ],
            {
                    A: 'minecraft:string'
            }
    )
});
