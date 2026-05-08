const ChunkPos = Java.loadClass("net.minecraft.world.level.ChunkPos");
const Registries = Java.loadClass("net.minecraft.core.registries.Registries");
const TagKey = Java.loadClass("net.minecraft.tags.TagKey");
const ResourceLocation = Java.loadClass(
  "net.minecraft.resources.ResourceLocation",
);
const StructureCheckResult = Java.loadClass(
  "net.minecraft.world.level.levelgen.structure.StructureCheckResult",
);
const BlockPos = Java.loadClass("net.minecraft.core.BlockPos");

function getStructure(level, id) {
  const opt = level.registryAccess().registry(Registries.STRUCTURE);
  if (opt.isEmpty()) throw `No STRUCTURE registry`;
  const reg = opt.get();
  return reg.get(new ResourceLocation(id)); // returns a Structure instance
}

function structureFinderInRadius(
  targetStructure,
  player,
  serverLevel,
  radiusChunks
) {

  const structureManager = serverLevel.structureManager();

  const structure = getStructure(serverLevel, targetStructure);
  //radius will be a circle radius
  const playerPos = player.blockPosition();
  const centerChunkX = playerPos.x >> 4;
  const centerChunkZ = playerPos.z >> 4;
  let found = false;
  let foundChunkPos = null;

  for (let dx = -radiusChunks; dx <= radiusChunks; dx++) {
    for (let dz = -radiusChunks; dz <= radiusChunks; dz++) {
      if (dx * dx + dz * dz > radiusChunks * radiusChunks) continue;

      let chunkX = centerChunkX + dx;
      let chunkZ = centerChunkZ + dz;

      let chunkPosition = new ChunkPos(chunkX, chunkZ);

      let structureCheck = structureManager.checkStructurePresence(
        chunkPosition,
        structure,
        false,
      );

      if (structureCheck === StructureCheckResult.START_PRESENT) {
        // player.tell("FOUND");
        found = true;
        foundChunkPos = chunkPosition;
        break;
      }
    }
  }
  if (found) {
    //find distance to player
    let chunkXC = foundChunkPos.getMiddleBlockX();
    let chunkZC = foundChunkPos.getMiddleBlockZ();

    let structureAt = structureManager.getStructureAt(
      new BlockPos(chunkXC, playerPos.y, chunkZC),
      structure,
    );

    if (!structureAt || !structureAt.isValid()) {
      return false;
    }

    const pieces = structureAt.getPieces ? structureAt.getPieces() : null;
    if (pieces && pieces.isEmpty()) {
      return false;
    }

    const boundingBox = structureAt.getBoundingBox();
    if (!boundingBox) {
      return false;
    }

    const insideStructure = boundingBox.isInside(playerPos);

    // player.tell(insideStructure)
    // player.tell(`found chunk: ${chunkXC}, ${chunkZC}`)
    // player.tell(`player pos: ${playerPos.x}, ${playerPos.z}`)

    // let dx = chunkXC - playerPos.x;
    // let dz = chunkZC - playerPos.z;

    // player.tell(`dx: ${dx}, dz: ${dz}`)
    // let distance = Math.sqrt(dx * dx + dz * dz);
    // player.tell(`found distance: ${distance}`)
    return insideStructure
  }
  return found;
}


function getOriginRace(playerNbt) {
  let race = playerNbt
      .get("cardinal_components")
      .get("origins:origin")
      .get("OriginLayers")
      .get(0)
      .get("Origin");

  return race
}