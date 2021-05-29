export const enum Partition {
  First,
  Second,
}

export const partition = <T>(
  arr: T[],
  rule: (v: T) => Partition
): { first: T[]; second: T[] } => {
  const first: T[] = [];
  const second: T[] = [];

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];

    if (rule(element)) second.push(element);
    else first.push(element);
  }

  return { first, second };
};

export const last = <T>(arr: T[]): T => arr[arr.length - 1];

export const reversed = function* <T>(arr: T[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    yield arr[i];
  }
};
