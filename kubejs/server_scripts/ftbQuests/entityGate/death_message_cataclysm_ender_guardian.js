{
    let entityId = "cataclysm:ender_guardian"
    let deathMessage = "No... I shouldnt let you..."

    EntityEvents.death(entityId, event => {
        let entityName = event.entity.getName().getString()
        let trimmedMessage = deathMessage.trim()

        if (!trimmedMessage) return

        let message = Text.of(`[${entityName}] : ${trimmedMessage}`).lightPurple().italic()
        event.server.tell(message)
    })
}
