export function numberToIndianRuppe(amount: number | string): string {
  if (typeof amount === 'string') {
    amount = Number(amount);
  }
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
export function cleanAndCapitalize(input: string | undefined): string {
  if (!input) {
    return '----';
  }
  const cleaned = input
    .normalize('NFKD')
    .replace(/[\u200B-\u200D\uFEFF\u202C\u202D\u202E]/g, '')
    .trim();
  return cleaned.toUpperCase();
}

export const formatSentence = (value: string | undefined) => {
  if (!value) return '----';
  return value
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
