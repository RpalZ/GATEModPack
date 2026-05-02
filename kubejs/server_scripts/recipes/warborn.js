ServerEvents.recipes(event => {

    event.shaped(
            Item.of('fracturepoint:nato_sqad_leader_helmet_woodland'),
            [
                    'AAA',
                    'ABA',
                    'CDC'
            ],
            {
                    A: 'mekanism:ingot_steel',
                    B: 'minecraft:green_dye',
                    C: 'minecraft:redstone',
                    D: 'minecraft:amethyst_shard'
            }
    )
    event.shaped(
            Item.of('fracturepoint:nato_sqad_leader_chestplate_woodland'),
            [
                    'ABA',
                    'AAA',
                    'AAA'
            ],
            {
                    A: 'mekanism:ingot_steel',
                    B: 'minecraft:green_dye'
            }
    )
    event.shaped(
            Item.of('fracturepoint:nato_shoulderpads_woodland'),
            [
                    'ABA',
                    '   ',
                    '   '
            ],
            {
                    A: 'mekanism:ingot_steel',
                    B: 'minecraft:green_dye'
            }
    )
    event.shaped(
            Item.of('fracturepoint:ru_helmet'),
            [
                    'AAA',
                    'ABA',
                    '   '
            ],
            {
                    A: 'mekanism:ingot_steel',
                    B: 'minecraft:green_dye'
            }
    )
    event.shaped(
            Item.of('fracturepoint:shturmovik_ru_chestplate'),
            [
                    'ABA',
                    'AAA',
                    'AAA'
            ],
            {
                    A: 'mekanism:ingot_steel',
                    B: 'minecraft:green_dye'
            }
    )
    event.shaped(
            Item.of('fracturepoint:beta7_helmet'),
            [
                    'AAA',
                    'ABA',
                    '   '
            ],
            {
                    A: 'mekanism:ingot_steel',
                    B: 'minecraft:black_dye'
            }
    )
    event.shaped(
            Item.of('fracturepoint:beta7_nvg_helmet'),
            [
                    'AAA',
                    'ABA',
                    'CDC'
            ],
            {
                    A: 'mekanism:ingot_steel',
                    C: 'minecraft:redstone',
                    D: 'minecraft:amethyst_shard',
                    B: 'minecraft:black_dye'
            }
    )
    event.shaped(
            Item.of('fracturepoint:beta7_chestplate'),
            [
                    'ABA',
                    'AAA',
                    'AAA'
            ],
            {
                    A: 'mekanism:ingot_steel',
                    B: 'minecraft:black_dye'
            }
    )
    event.shaped(
            Item.of('fracturepoint:nato_sqad_leader_helmet'),
            [
                    'AAA',
                    'ABA',
                    'CDC'
            ],
            {
                    B: 'minecraft:sand',
                    A: 'mekanism:ingot_steel',
                    C: 'minecraft:redstone',
                    D: 'minecraft:amethyst_shard'
            }
    )
    event.shaped(
            Item.of('fracturepoint:nato_sqad_leader_chestplate'),
            [
                    'ABA',
                    'AAA',
                    'AAA'
            ],
            {
                    B: 'minecraft:sand',
                    A: 'mekanism:ingot_steel'
            }
    )
    event.shaped(
            Item.of('fracturepoint:tagilla_leggings'),
            [
                    'ABA',
                    'C C',
                    'C C'
            ],
            {
                    B: 'minecraft:leather',
                    C: 'mekanism:ingot_steel',
                    A: 'minecraft:black_dye'
            }
    )
    event.shaped(
            Item.of('fracturepoint:killa_helmet'),
            [
                    'AAA',
                    'ABA',
                    'CBC'
            ],
            {
                    A: 'mekanism:ingot_steel',
                    C: 'minecraft:black_dye',
                    B: 'minecraft:white_dye'
            }
    )
    event.shaped(
            Item.of('fracturepoint:nato_shoulderpads'),
            [
                    '   ',
                    'ABA',
                    '   '
            ],
            {
                    B: 'minecraft:sand',
                    A: 'mekanism:ingot_steel'
            }
    )
    event.shaped(
            Item.of('fracturepoint:beta7_shoulderpads'),
            [
                    '   ',
                    'ABA',
                    '   '
            ],
            {
                    A: 'mekanism:ingot_steel',
                    B: 'minecraft:black_dye'
            }
    )
    event.shaped(
            Item.of('fracturepoint:ru_shoulderpads'),
            [
                    '   ',
                    'ABA',
                    '   '
            ],
            {
                    A: 'mekanism:ingot_steel',
                    B: 'minecraft:green_dye'
            }
    )

    // ======================================
    // Warborn Renewed & extra Fracturepoint
    // ======================================

    const steel = 'mekanism:ingot_steel';

    const camos = {
        'desert': 'minecraft:sand',
        'wood': 'minecraft:green_dye',
        'jungle': 'minecraft:green_dye',
        'winter': 'minecraft:white_dye',
        'white': 'minecraft:white_dye',
        'green': 'minecraft:green_dye',
        'emr': 'minecraft:green_dye',
        'atacsfg': 'minecraft:green_dye',
        'multicam': 'minecraft:brown_dye',
        'ucp': 'minecraft:light_gray_dye',
        'mm14': 'minecraft:gray_dye',
        'slate': 'minecraft:gray_dye',
        'sso': 'minecraft:green_dye',
        'voevoda': 'minecraft:black_dye',
        'default': 'minecraft:black_dye'
    };

    const getCamo = (name) => {
        for (const [key, dye] of Object.entries(camos)) {
            if (name.includes(key)) return dye;
        }
        return camos['default'];
    };

    const addRecipe = (item, type, isNvg) => {
        let dye = getCamo(item);
        
        let mainMat = steel;
        if (item.includes('ghillie')) {
            mainMat = '#minecraft:leaves'; // Ghillies are crafted with any leaves
        } else if (item.includes('panama')) {
            mainMat = 'minecraft:leather'; // Boonie hats use leather
        }

        let pattern = [];
        let keys = { A: mainMat, B: dye };

        if (type === 'helmet') {
            if (isNvg) {
                pattern = [
                    'AAA',
                    'ABA',
                    'CDC'
                ];
                keys.C = 'minecraft:redstone';
                keys.D = 'minecraft:amethyst_shard';
            } else {
                pattern = [
                    'AAA',
                    'ABA',
                    '   '
                ];
            }
        } else if (type === 'chestplate' || type === 'body') {
            pattern = [
                'ABA',
                'AAA',
                'AAA'
            ];
        } else if (type === 'leggings' || type === 'legs') {
            pattern = [
                'ABA',
                'A A',
                'A A'
            ];
        } else if (type === 'shoulderpads') {
            pattern = [
                '   ',
                'ABA',
                '   '
            ];
        } else if (type === 'hat') {
            pattern = [
                '   ',
                'ABA',
                'A A'
            ];
        }

        if (pattern.length > 0) {
            event.shaped(Item.of(item), pattern, keys);
        }
    };

    const nvgs = [
        'warbornrenewed:gpngv-nato-wood',
        'warbornrenewed:gpngv-nato-desert',
        'warbornrenewed:ratnik-10t-wood',
        'warbornrenewed:opscore-fc-b2200-voevoda',
        'warbornrenewed:6b47-fc-b2200-sso',
        'warbornrenewed:ratnik-10t-desert',
        'fracturepoint:beta7_nvg_helmet_slate'
    ];

    const helmets = [
        'warbornrenewed:ghillie-helmet-desert',
        'warbornrenewed:ghillie-helmet-jungle',
        'warbornrenewed:ghillie-helmet-winter',
        'warbornrenewed:6b47-winteremr',
        'warbornrenewed:nato-wood-helmet',
        'warbornrenewed:nato-sand-helmet',
        'fracturepoint:beta7_helmet_slate',
        'fracturepoint:insurgency_shturmovik_helmet',
        'fracturepoint:insurgency_commander_helmet'
    ];

    const chestplates = [
        'warbornrenewed:ghillie-body-desert',
        'warbornrenewed:ghillie-body-jungle',
        'warbornrenewed:ghillie-body-winter',
        'warbornrenewed:jpc-desert',
        'warbornrenewed:warmor-desert',
        'warbornrenewed:warmor-green',
        'warbornrenewed:warmor-mm14',
        'warbornrenewed:warmor-multicam',
        'warbornrenewed:warmor-ucp',
        'warbornrenewed:warmor-white',
        'warbornrenewed:jpc',
        'warbornrenewed:uwin',
        'warbornrenewed:uwin-desert',
        'warbornrenewed:nato-wood-chestplate',
        'warbornrenewed:nato-sand-chestplate',
        'fracturepoint:insurgency_commander_chestplate',
        'fracturepoint:killa_chestplate',
        'fracturepoint:beta7_chestplate_slate'
    ];

    const leggings = [
        'warbornrenewed:ghillie-legs-desert',
        'warbornrenewed:ghillie-legs-jungle',
        'warbornrenewed:ghillie-legs-winter',
        'fracturepoint:insurgency_commander_leggings',
        'fracturepoint:fsb_leggings',
        'fracturepoint:beta7_leggings_slate',
        'fracturepoint:beta7_leggings'
    ];
    
    const shoulderpads = [
        'fracturepoint:beta7_shoulderpads',
        'fracturepoint:insurgency_commander_shoulderpads'
    ]

    const hats = [
        'warbornrenewed:panama-atacsfg',
        'warbornrenewed:panama-desert',
        'warbornrenewed:panama-emr',
        'warbornrenewed:panama-green',
        'warbornrenewed:panama-multicam',
        'warbornrenewed:panama-ucp',
        'warbornrenewed:panama-white'
    ];

    nvgs.forEach(item => addRecipe(item, 'helmet', true));
    helmets.forEach(item => addRecipe(item, 'helmet', false));
    chestplates.forEach(item => addRecipe(item, 'chestplate', false));
    leggings.forEach(item => addRecipe(item, 'leggings', false));
    shoulderpads.forEach(item => addRecipe(item, 'shoulderpads', false));
    hats.forEach(item => addRecipe(item, 'hat', false));

});
