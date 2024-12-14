export function maskNumbers(numberString) {
  const lastFour = numberString.slice(-4);
  const masked = '*'.repeat(numberString.length - 4);
  return masked + lastFour;
}
