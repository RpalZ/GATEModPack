{
    let entityId = "cataclysm:ignis"
    let deathMessage = "I've been bested... I am sorry my lord..."

    EntityEvents.death(entityId, event => {
        let entityName = event.entity.getName().getString()
        let trimmedMessage = deathMessage.trim()

        if (!trimmedMessage) return

        let message = Text.of(`[${entityName}] : ${trimmedMessage}`).red().italic()
        event.server.tell(message)
    })
}
