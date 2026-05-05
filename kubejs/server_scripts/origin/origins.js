ServerEvents.highPriorityData((event) => {
  // const jsonOrigin = JSON.parse(FilesJS.readFile('origins.json'))
  const getFileName = (p) => p.replace(/^.*[\\/]/, "");
  const originsDirPath = "kubejs/data/origin/origins";
  const powersDirPath = "kubejs/data/origin/powers";

  const originFiles = FilesJS.listFiles(originsDirPath)
    .toArray()
    .map((f) => String(f));

  const namespace = "gate";


  function registerOrigins() {
    originFiles.forEach((filePath) => {
      const fileName = getFileName(filePath);
      let filePathData = `${namespace}:origins/${fileName.slice(0, -5)}`;
      let jsonData = JSON.parse(FilesJS.readFile(filePath));

      event.addJson(filePathData, jsonData);
    });

    buildJsonLayer();
  }

  function buildJsonLayer() {

    let origins = originFiles.map((filePath) => {
        // console.log(`[GATE]: ${m.slice(0, -5)}`)
      const fileName = getFileName(filePath);
      return `${namespace}:${fileName.slice(0, -5)}`
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

   const powerFiles = FilesJS.listFiles(powersDirPath)
    .toArray()
    .map((f) => String(f));
   const powerPath = `${namespace}:powers/`

  powerFiles.forEach((filePath) => {
    const fileName = getFileName(filePath);
    let jsonData = JSON.parse(FilesJS.readFile(filePath))

    event.addJson(powerPath + fileName.slice(0, -5), jsonData)
  })
  
  }

  registerPowers()


  // const filePath = "origincustom:origins/"
  console.log("[GATE]: added custom origins")
  // event.addJson()
});

// ForgeEvents.onEvent("custom")