import { components, ecs, Env } from "../../ecs";
import { tileSize } from "../../settings";
import { add2, addN2, mul2, mulN2, Vec2Like } from "@thi.ng/vectors";
import { rotateAround } from "../../utils/rotateAround";

const group = ecs.defGroup([
  components.groundAnimation,
  components.position,
  components.direction,
]);

export const update = (env: Env) => {
  group.forEach((entity) => {
    const frame =
      Math.floor(env.tick / entity.groundAnimation.speed) %
      entity.groundAnimation.length;

    const position = mulN2([], entity.position, tileSize);

    env.ctx.save();
    rotateAround(
      env.ctx,
      addN2([], position, tileSize / 2) as Vec2Like,
      (entity.direction * Math.PI) / 2
    );

    env.ctx.drawImage(
      entity.groundAnimation.spritesheet,
      frame * 16,
      0,
      tileSize,
      tileSize,
      position[0],
      position[1],
      tileSize,
      tileSize
    );
    entity.groundAnimation;

    env.ctx.restore();
  });
};
