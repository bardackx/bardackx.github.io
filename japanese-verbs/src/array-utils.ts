export function getRandomElementFromArray<E>(array: ReadonlyArray<E>): E {
  const index = Math.floor(array.length * Math.random());
  return array[index];
}
