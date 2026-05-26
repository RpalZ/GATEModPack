ServerEvents.recipes((event) => {
  //removing superbwarfare guns

  const guns = FilesJS.readFile("kubejs/config/superbwarfare/guns.json");

  const gunsArray = JSON.parse(guns);

  gunsArray.forEach((val, i) => {
    event.remove({ output: val });
  });
  console.log("Superbwarfare recipes for guns removed");

  //adding some weapons back using tacz gun smith table

  event.remove({ id: "tacz:gun/rpg7" });
  event.remove({ id: "tacz:misc/blood_strike_1" });
  event.remove({ id: "tacz:gun/m320" });
  event.remove({ id: "ronmc:gun/m32a1" });
  event.remove({ id: "tacz:gun/springfield1873" });

  event.forEachRecipe({ type: "tacz:gun_smith_table_crafting" }, (recipe) => {
    const json = recipe.json;
    const id = recipe.getId();
    const legendaries = ["tacz:gun/minigun", "tacz:gun/m95", "tacz:gun/m107"];
    const epics = ["tacz:gun/ai_awp", "tacz:gun/spas_12", "tacz:gun/fn_evolys"];
    const blacklist = [
      "tacz:gun/springfield1873",
      "ronmc:gun/m32a1",
      "tacz:gun/m320",
      "tacz:misc/blood_strike_1",
      "tacz:gun/rpg7",
    ];
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
