export function sharedMfe(): string {
  return 'shared-mfe';
}

export function counterMfe(): string {
  return 'counterMfe';
}

export function food() {
  console.log({ food: 'food' });
}

export default {
  food,
};
