ServerEvents.highPriorityData((event) => {
  // const jsonOrigin = JSON.parse(FilesJS.readFile('origins.json'))
  const OriginsDir = FilesJS.listFiles("kubejs/data/origin/origins")
    .toArray()
    .map((f) => f.split("/").slice(-1)[0]);

    const namespace = "gate"


  function registerOrigins() {
    OriginsDir.forEach((val) => {
      let filePathData = `${namespace}:origins/${val.slice(0, -5)}`;
      let filePath = `kubejs/data/origin/origins/${val}`;
      let jsonData = JSON.parse(FilesJS.readFile(filePath));

      event.addJson(filePathData, jsonData);
    });

    buildJsonLayer();
  }

  function buildJsonLayer() {

    let origins = OriginsDir.map(m => {
        // console.log(`[GATE]: ${m.slice(0, -5)}`)
        return `${namespace}:${m.slice(0, -5)}`
    })

    let layer = {
        replace: true,
        origins: origins
    }

    console.log(`[GATE]: ORIGINS ${origins}`)

    const path = "origins:origin_layers/origin"

    event.addJson(path, layer)

  }

  registerOrigins();


  //power generation

  function registerPowers() {

   const powersDir = FilesJS.listFiles("kubejs/data/origin/powers").toArray().map(f => f.split('/').slice(-1)[0])
   const powerPath = `${namespace}:powers/`

  powersDir.forEach(val => {
    let filePath = `kubejs/data/origin/powers/${val}`
    let jsonData = JSON.parse(FilesJS.readFile(filePath))

    event.addJson(powerPath + val.slice(0, -5), jsonData)
  })
  
  }

  registerPowers()


  // const filePath = "origincustom:origins/"
  console.log("[GATE]: added custom origins")
  // event.addJson()
});

// ForgeEvents.onEvent("custom")