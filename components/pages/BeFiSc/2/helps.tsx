export function convertMoneyToString(amount: number): string {
  if (amount >= 1_00_00_000) {
    return `${(amount / 1_00_00_000).toFixed(amount % 1_00_00_000 === 0 ? 0 : 1)} crore`;
  } else if (amount >= 1_00_000) {
    return `${(amount / 1_00_000).toFixed(amount % 1_00_000 === 0 ? 0 : 1)} lakh`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)} thousand`;
  } else {
    return amount.toString();
  }
}
