{
    let entityId = "block_factorys_bosses:infernal_dragon"
    let deathMessage = "I don't know what has gotten into me..."

    EntityEvents.death(entityId, event => {
        let entityName = event.entity.getName().getString()
        let trimmedMessage = deathMessage.trim()

        if (!trimmedMessage) return

        let message = Text.of(`[${entityName}] : ${trimmedMessage}`).red().italic()
        event.server.tell(message)
    })
}
