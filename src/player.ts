import type { GameState } from "./gameState";
import { loadAsset } from "./systems/assets";

export interface Player {
  position: [number, number];
  rotation: number;
  speedMultiplier: number;
}

const playerTexture = loadAsset("assets/player.png");

export const renderPlayer = (state: GameState) => {
  const player = state.player;

  state.ctx.save();
  state.ctx.translate(player.position[0], player.position[1]);
  state.ctx.rotate(state.player.rotation);

  state.ctx.drawImage(
    playerTexture,
    0,
    0,
    playerTexture.naturalWidth,
    playerTexture.naturalHeight,
    -20,
    -20,
    40,
    40
  );

  state.ctx.restore();
};

export const updatePlayer = (state: GameState) => {
  if (state.keyboard.pressed.has("w")) {
    state.player.position[0] +=
      Math.cos(state.player.rotation) * state.player.speedMultiplier;
    state.player.position[1] +=
      Math.sin(state.player.rotation) * state.player.speedMultiplier;

    // adjust mouse position on the canvas
    state.mouse.position = [
      state.mouse.position[0] +
        Math.cos(state.player.rotation) * state.player.speedMultiplier,
      state.mouse.position[1] +
        Math.sin(state.player.rotation) * state.player.speedMultiplier,
    ];
  }

  if (state.keyboard.pressed.has("s")) {
    state.player.position[0] -=
      Math.cos(state.player.rotation) * state.player.speedMultiplier;
    state.player.position[1] -=
      Math.sin(state.player.rotation) * state.player.speedMultiplier;

    // adjust mouse position on the canvas
    state.mouse.position = [
      state.mouse.position[0] -
        Math.cos(state.player.rotation) * state.player.speedMultiplier,
      state.mouse.position[1] -
        Math.sin(state.player.rotation) * state.player.speedMultiplier,
    ];
  }

  if (state.keyboard.pressed.has("a")) {
    state.player.rotation -= 0.1;
  }

  if (state.keyboard.pressed.has("d")) {
    state.player.rotation += 0.1;
  }
};
