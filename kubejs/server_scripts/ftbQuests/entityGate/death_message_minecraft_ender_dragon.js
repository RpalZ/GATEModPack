{
    let entityId = "minecraft:ender_dragon"
    let deathMessage = "You cant go near him... not yet..."

    EntityEvents.death(entityId, event => {
        let entityName = event.entity.getName().getString()
        let trimmedMessage = deathMessage.trim()

        if (!trimmedMessage) return

        let message = Text.of(`[${entityName}] : ${trimmedMessage}`).lightPurple().italic()
        event.server.tell(message)
    })
}
