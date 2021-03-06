import type { KeyboardState } from "./keyboard";
import type { Player } from "./player";
import type { TransportLineConfig } from "./systems/belts";
import type { Entity, ITransform, IUpdate } from "./utils/entity";
import type { EventEmitter } from "./utils/events";
import type { IToJson } from "./utils/json";
import type { FiniteMatrix, InfiniteMatrix } from "./utils/matrix";
import type { TaggedUnion, Vec2 } from "./utils/types";

export type Item = string;

export interface TimedItem {
  id: Item;
  birth: number;
}

export type Machine = Entity & ITransform & IUpdate & IToJson;

export type Tile = {
  subTile: Vec2;
  machine: Machine;
};

export type Chunk = FiniteMatrix<Tile | null>;

export interface GameMap {
  chunkMap: InfiniteMatrix<Chunk>;
}

export interface JunctionConfig {
  delay: number;
  capacity: number;
}

export interface RouterConfig extends JunctionConfig {
  /** Size in tiles a side of the router should take.
   * Eg: a size of 2 will create a 2x2 tile
   */
  size: number;
}

export interface ChestConfig {
  slots: number;
  size: number;
}

export interface AssemblerConfig {
  size: number;
  speed: number;
}

export type ItemOptions = TaggedUnion<{
  conveyorBelt: TransportLineConfig;
  loader: TransportLineConfig;
  unloader: TransportLineConfig;
  junction: JunctionConfig;
  router: RouterConfig;
  chest: ChestConfig;
  assembler: AssemblerConfig;
}>;

export interface ItemConfig {
  texture: Image;
  stackSize: number;
  tileTexture?: Image;
  options?: ItemOptions;
}

export interface GameEvents {
  machineCreated: {
    machine: Machine;
  };
}

export interface Mouse {
  position: [number, number];
}

export interface GameState {
  ctx: CanvasRenderingContext2D;
  camera: {
    translation: [number, number];
    scale: number;
  };
  keyboard: KeyboardState;
  player: Player;
  map: GameMap;
  items: Record<Item, ItemConfig>;
  recipes: Array<Recipe>;
  mouse: Mouse;
  tick: number;
  time: number;
  paused: boolean;
  pausedTimeDifference: number;
  lastPausedAt: number;
  emitter: EventEmitter<GameEvents>;
}

export interface Recipe {
  inputs: Record<Item, number>;
  outputs: Record<Item, number>;

  /**
   * Time it takes to create the outputs (in ticks)
   */
  time: number;
}

// ========== Asset stuff
export type Image = HTMLImageElement;
