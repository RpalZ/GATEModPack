{
    let entityId = "traveloptics:the_nightwarden"
    let deathMessage = "After all these years... I tried my best knowing it will be my demise... Thank you player... For you have freed me from reality..."

    EntityEvents.death(entityId, event => {
        let entityName = event.entity.getName().getString()
        let trimmedMessage = deathMessage.trim()

        if (!trimmedMessage) return

        let message = Text.of(`[${entityName}] : ${trimmedMessage}`).darkPurple().italic()
        event.server.tell(message)
    })
}
