{
    let entityId = "irons_spellbooks:fire_boss"
    let deathMessage = "Flames burn out quick dont they?"

    EntityEvents.death(entityId, event => {
        let entityName = event.entity.getName().getString()
        let trimmedMessage = deathMessage.trim()

        if (!trimmedMessage) return

        let message = Text.of(`[${entityName}] : ${trimmedMessage}`).yellow().italic()
        event.server.tell(message)
    })
}
