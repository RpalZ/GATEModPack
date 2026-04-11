StartupEvents.registry("item", (event) => {
  const heroGem = event
    .create("hero_gem")
    .maxStackSize(1)
    .glow(true)
    .modelJson({
      parent: "gate:item/hero_gem"
    })
    .displayName("Hero Gem")
   
    
    
    
});
