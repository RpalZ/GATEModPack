{
    let entityId = "darkdoppelganger:dark_doppelganger"
    let deathMessage = "Alas... I couldnt protect you as the final bulwark..."

    EntityEvents.death(entityId, event => {
        let entityName = event.entity.getName().getString()
        let trimmedMessage = deathMessage.trim()

        if (!trimmedMessage) return

        let message = Text.of(`[${entityName}] : ${trimmedMessage}`).darkPurple().italic()
        event.server.tell(message)
    })
}
