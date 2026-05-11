const bossStageGates = {
    "mowziesmobs:umvuthi": "quest_6983bbc406df52c0",
    "minecraft:elder_guardian": "dragon_slayer",
    "block_factorys_bosses:sandworm": "elder_guardian",
    "mowziesmobs:frostmaw": "sandworm",
    "block_factorys_bosses:infernal_dragon": "frostmaw",
    "undergarden:forgotten_guardian": "catacombs",
    "minecraft:wither": "forgotten_guardian",
    "cataclysm:ancient_remnant": "quest_5dbf17299a0de31e",
    "cataclysm:scylla": "ancient_remnant",
    "cataclysm:the_harbinger": "scylla",
    "cataclysm:maledictus": "the_harbinger",
    "traveloptics:enraged_dead_king": "maledictus",
    "irons_spellbooks:fire_boss": "quest_6e6e267a2e4701ac",
    "block_factorys_bosses:underworld_knight": "fire_boss",
    "cataclysm:netherite_monstrosity": "underworld_knight",
    "cataclysm:ignis": "netherite_monstrosity",
    "minecraft:ender_dragon": "quest_5e66f197d6da73f9",
    "cataclysm:ender_guardian": "ender_dragon",
    "darkdoppelganger:dark_doppelganger": "ender_guardian",
    "traveloptics:the_nightwarden": "dark_doppelganger"
}

const gateMessage = Text.of("You are too weak to face this opponent...").red().italic()

Object.entries(bossStageGates).forEach(([entityId, requiredStage]) => {
    EntityEvents.hurt(entityId, event => {
        const player = event.source.getPlayer()

        if (!player) return

        if (!player.stages.has(requiredStage)) {
            player.setStatusMessage(gateMessage)
            event.cancel()
        }
    })
})