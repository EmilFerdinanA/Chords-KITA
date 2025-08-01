export function normalizeSemitone(n: number) {
  let result = n;
  while (result > 11) result -= 12;
  while (result < -11) result += 12;
  return result;
}
