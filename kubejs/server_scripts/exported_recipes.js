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
    event.shaped(
            Item.of('dungeon_realm:dungeon_map'),
            [
                    'AAA',
                    'ABA',
                    'ACA'
            ],
            {
                    C: 'minecraft:netherite_upgrade_smithing_template',
                    A: 'minecraft:netherite_ingot',
                    B: 'minecraft:nether_star'
            }
    )
});
