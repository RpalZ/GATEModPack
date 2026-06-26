ServerEvents.recipes((event) => {
  //removing superbwarfare guns

  const guns = FilesJS.readFile("kubejs/config/superbwarfare/guns.json");

  const gunsArray = JSON.parse(guns);

  gunsArray.forEach((val, i) => {
    event.remove({ output: val });
  });
  console.log("Superbwarfare recipes for guns removed");

  //adding some weapons back using tacz gun smith table

  const blacklist = [
    "tacz:gun/springfield1873",
    "ronmc:gun/m32a1",
    "tacz:gun/m320",
    "tacz:misc/blood_strike_1",
    "tacz:gun/rpg7",
    "mk16:guns/rpk16",
    "maxstuff:gun/ai_aws",
    "maxstuff:gun/ai_awp",
    "maxstuff:gun/m320t",
    "maxstuff:gun/can_cannon",
    "maxstuff:gun/kar98",
    "maxstuff:gun/deagle_50bmg",
  ];

  const legendaries = [
    "tacz:gun/minigun",
    "tacz:gun/m95",
    "tacz:gun/m107",
    "maxstuff:gun/excaliber",
    "maxstuff:gun/mrad",
    "maxstuff:gun/m82a2",
    "maxstuff:gun/gm6_lynx",
    "maxstuff:gun/genesis12_dragons_breath",
    "maxstuff:gun/thunderbird_short"
  ];
  const epics = [
    "tacz:gun/ai_awp",
    "tacz:gun/spas_12",
    "tacz:gun/fn_evolys",
    "maxstuff:gun/scar_ssr",
    "maxstuff:gun/mk18_mjolnir",
    "maxstuff:gun/dragunov_svdm",
    "maxstuff:gun/dp28",
    "maxstuff:gun/beowulf_tcr",
    "maxstuff:gun/ar10b",
    "maxstuff:gun/ar10",
    "tacz:gun/mk14",
    "mk16:guns/sr25pc",
    "tacz:gun/scar_h",
    "maple:gun/deagle_diamond",
    "tacz:gun/deagle",
    "maxstuff:gun/db_short_d",
  ];

  blacklist.forEach((val) => {
    event.remove({ id: val });
  });

  event.forEachRecipe({ type: "tacz:gun_smith_table_crafting" }, (recipe) => {
    const json = recipe.json;
    const id = recipe.getId();

    const jsonObj = JSON.parse(json);
    let pack = "superbwarfare:rare_material_pack";
    if (blacklist.includes(id)) return;

    if (legendaries.includes(id)) {
      pack = "superbwarfare:legendary_material_pack";
    } else if (epics.includes(id)) {
      pack = "superbwarfare:epic_material_pack";
    }

    const type = jsonObj.result.type;
    const isGun = type == "gun";

    if (!isGun) return;
    jsonObj.materials.push({
      item: {
        item: pack,
      },
      count: 1,
    });

    console.log(recipe.getId());
    event.custom(jsonObj).id(id);
  });

  event.custom({
    materials: [
      {
        item: {
          item: "superbwarfare:rare_material_pack",
        },
        count: 1,
      },
      {
        item: {
          item: "minecraft:dispenser",
        },
        count: 1,
      },
      {
        item: {
          item: "superbwarfare:rpg_blueprint",
        },
        count: 1,
      },
    ],
    result: {
      type: "custom",
      group: "tacz:rpg",
      item: {
        item: "superbwarfare:rpg",

        count: 1,
      },
    },
    type: "tacz:gun_smith_table_crafting",
  });
  event.custom({
    materials: [
      {
        item: {
          item: "superbwarfare:legendary_material_pack",
        },
        count: 1,
      },
      {
        item: {
          item: "superbwarfare:ancient_cpu",
        },
        count: 1,
      },
      {
        item: {
          item: "superbwarfare:javelin_blueprint",
        },
        count: 1,
      },
    ],
    result: {
      type: "custom",
      group: "tacz:rpg",
      item: {
        item: "superbwarfare:javelin",

        count: 1,
      },
    },
    type: "tacz:gun_smith_table_crafting",
  });

  event.forEachRecipe(
    {
      output: [
        "superbwarfare:rpg_rocket_standard",
        "superbwarfare:rpg_rocket_tbg",
      ],
    },
    (recipe) => {
      let json = JSON.parse(recipe.json);
      json.result.count = 1;
      event.custom(json).id(recipe.getId());
    },
  );
});
