{
    let entityId = "minecraft:wither"
    let deathMessage = "Fools... You will regret goin further..."

    EntityEvents.death(entityId, event => {
        let entityName = event.entity.getName().getString()
        let trimmedMessage = deathMessage.trim()

        if (!trimmedMessage) return

        let message = Text.of(`[${entityName}] : ${trimmedMessage}`).red().italic()
        event.server.tell(message)
    })
}
