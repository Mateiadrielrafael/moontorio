export type Nullable<T> = T | null;
export type Vec2 = [number, number];
export type TaggedUnion<T> = {
  [K in keyof T]: {
    type: K;
  } & T[K];
}[keyof T];

export type Pair<T> = [T, T];
export type Fn<A, B> = (input: A) => B;
export type Lazy<T> = () => T;

export const enum Direction {
  Right,
  Down,
  Left,
  Up,
}

export const enum Side {
  Left,
  Right,
}

export type Neighbour = Pair<-1 | 0 | 1>;

/** Keep a T for every direction. The elements can then be accessed as element[Direction.Blah] */
export type Directional<T> = [T, T, T, T];

/** Keep a pair of Ts, one for each side. The elements can then be accessed as element[Side.Blah] */
export type Sided<T> = [T, T];
