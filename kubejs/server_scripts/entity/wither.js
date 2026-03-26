
EntityEvents.hurt(event => {
    const { source, amount, entity} = event;
    // This tells you exactly what the 'source.type' is
    const tags = source.getImmediate().entityType?.getTags().map(t => t.location().toString())

    if (source.player) {
        source.player.tell(Text.lightPurple(`Detected Source Type: `).append(Text.white(source.getImmediate().getType().toString())));
        source.player.tell(Text.darkPurple(`Entity: ${entity.type.toString()}`))
        source.player.tell(Text.darkPurple(`Tag: ${tags.toList()}`))
        // console.log(`[GATE]: TAGGY ${tags}`)
        
        // const nbt = source.getImmediate().getNbt()
        // const f = FilesJS.writeFile('kubejs/config/superbwarfare/important.json', nbt)
        // source.player.tell(Text.blue(source.getImmediate().getType().toString().includes("superbwarfare")))
    }
});

