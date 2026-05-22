{
    let entityId = "cataclysm:maledictus"
    let deathMessage = "Impossible... You will pay with your next life..."

    EntityEvents.death(entityId, event => {
        let entityName = event.entity.getName().getString()
        let trimmedMessage = deathMessage.trim()

        if (!trimmedMessage) return

        let message = Text.of(`[${entityName}] : ${trimmedMessage}`).darkGreen().italic()
        event.server.tell(message)
    })
}
