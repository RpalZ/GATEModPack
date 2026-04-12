ServerEvents.recipes((event) => {
  //removing superbwarfare guns

  const guns = FilesJS.readFile("kubejs/config/superbwarfare/guns.json");

  const gunsArray = JSON.parse(guns);

  gunsArray.forEach((val, i) => {
    event.remove({ output: val });
  });
  console.log("Superbwarfare recipes for guns removed");

  //adding some weapons back using tacz gun smith table

  event.forEachRecipe({ type: "tacz:gun_smith_table_crafting" }, (recipe) => {
    const json = recipe.json;
    console.log(recipe.getId());
  });

  event.remove({ id: "tacz:gun/rpg7" });
  event.remove({ id: "tacz:misc/blood_strike_1" });
  event.remove({ id: "tacz:gun/m320" });
  event.remove({ id: "tacz:attachments/ammo_mod_he" });
  event.remove({ id: "ronmc:gun/m32a1"})

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
