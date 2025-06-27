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

export const formatSentence = (
  value: string | undefined | null | number | boolean,
) => {
  if (!value) return '----';
  if (typeof value === 'number') {
    return String(value);
  }
  if (typeof value === 'boolean') {
    const word = String(value);
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return value
    ?.toLowerCase()
    ?.split(' ')
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(' ');
};
export function timeAgo(timestamp: string | undefined | null): string {
  if (!timestamp) {
    return '----';
  }

  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (seconds < 60) return `${seconds} sec ago`;
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;

  // For dates older than a week, show the actual date
  return past.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
