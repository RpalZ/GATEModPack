{
    let entityId = "cataclysm:ancient_remnant"
    let deathMessage = "Rahhhh...!"

    EntityEvents.death(entityId, event => {
        let entityName = event.entity.getName().getString()
        let trimmedMessage = deathMessage.trim()

        if (!trimmedMessage) return

        let message = Text.of(`[${entityName}] : ${trimmedMessage}`).yellow().italic()
        event.server.tell(message)
    })
}

