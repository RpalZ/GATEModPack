// Located in kubejs/startup_scripts/projectile_fix.js

const $HitResultType = Java.loadClass("net.minecraft.world.phys.HitResult$Type")

global.onProjectileImpact = event => {
    // 1. In Forge 1.20.1, the getter is getRayTraceResult()
    const ray = event.getRayTraceResult()
    const projectile = event.getProjectile()

    const level = projectile.level
    
    if (level.isClientSide()) return
    
    // 2. Safety check: ensure ray isn't null
    if (!ray) return

    // 3. Check if we hit an ENTITY
    const isEntity = ray.getType() === $HitResultType.ENTITY
    if (!isEntity) return

    // 4. Get the entity and check its type
    const targetEntity = ray.getEntity()
    
    // In KubeJS, .type returns the ResourceLocation (e.g., "minecraft:wither")
    if (targetEntity.type === "minecraft:wither") {
        console.log(`[GATE]: Projectile type: ${projectile.getType()}`)
        console.log('[GATE]: Projectile impact detected on Wither!')
        
        if(!projectile.getType().toString().includes("superbwarfare")) return


        const nbt = projectile.getNbt()
        const damage = nbt.getDouble("Damage")

        if(!damage) return
        
        // FilesJS.writeFile('kubejs/config/important.txt', nbt)

        // const vulnerable = targetEntity.getNbt().getInt('Invul') != 0


        if (targetEntity.health >= (targetEntity.maxHealth / 2)) {
        return 
    }

        let newHealth = targetEntity.health - damage
        targetEntity.setHealth(newHealth)

         if (newHealth <= 0) {
                targetEntity.kill() // Ensure it actually dies and drops stars
            }
        console.log(`[GATE]: Explosion Pierce! Wither took ${damage} damage from RPG blast.`)
        
        projectile.discard()

        
        // Example: If you wanted to cancel the damage/impact:
        // event.setCanceled(true)
    }
}

// Register the listener AFTER the function is defined
ForgeEvents.onEvent("net.minecraftforge.event.entity.ProjectileImpactEvent", event => {
    global.onProjectileImpact(event)
})