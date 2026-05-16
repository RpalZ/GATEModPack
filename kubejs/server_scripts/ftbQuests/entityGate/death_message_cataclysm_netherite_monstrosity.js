{
    let entityId = "cataclysm:netherite_monstrosity"
    let deathMessage = "Finally free from this prison..."

    EntityEvents.death(entityId, event => {
        let entityName = event.entity.getName().getString()
        let trimmedMessage = deathMessage.trim()

        if (!trimmedMessage) return

        let message = Text.of(`[${entityName}] : ${trimmedMessage}`).darkRed().italic()
        event.server.tell(message)
    })
}
