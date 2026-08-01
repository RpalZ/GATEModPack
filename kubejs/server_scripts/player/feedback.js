function feedback (
    /**@type {Internal.SimplePlayerEventJS} */
    event) {
    
        let server = event.server

        let message = Text.of("Enjoying the pack? Consider giving feedback to speed up development!").lightPurple().italic()


        server.tell(message)
}

