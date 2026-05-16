{
    let entityId = "cataclysm:scylla"
    let deathMessage = "I wish you goodluck onto the next one warrior..."

    EntityEvents.death(entityId, event => {
        let entityName = event.entity.getName().getString()
        let trimmedMessage = deathMessage.trim()

        if (!trimmedMessage) return

        let message = Text.of(`[${entityName}] : ${trimmedMessage}`).blue().italic()
        event.server.tell(message)
    })
}
