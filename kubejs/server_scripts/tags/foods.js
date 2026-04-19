ServerEvents.tags("item", (event) => {
  Item.of("veggiesdelight:chicken_fajitas_wrap");

  const meatList = [
    "chicken",
    "steak",
    "salmon",
    "mutton",
    "cod",
    "dragon",
    "meat",
    "pork",
    "rabbit",
    "flesh",
    "fish",
    "wilden",
    "chimera",
    "bison",
    "pig",
    "kangaroo",
    "cyclop",
    "hydra",
    "myrmex",
    "sea",
    "troll",
    "eye",
    "tuna",
  ];

  const fishList = [
    "kelp",
    "fish",
    "cod",
    "salmon",
    "tuna",
    "sea",
    "sushi",
    "squid",
  ];
  Item.list.forEach((item, i) => {
    const isFood = item.isEdible();

    if (!isFood) return;

    const isIncluded = meatList.some((v) => item.id.includes(v));

    if (isIncluded) {
      event.add("origins:meat", item.id);
    }

    const isFish = fishList.some((v) => item.id.includes(v));

    if (isFish) {
      event.add("gate:fish", item.id);
    }
  });
});
