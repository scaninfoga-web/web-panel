export function isValidIndianMobileNumber(input: string): {
  result: boolean;
  fixedNumber: string;
} {
  const mobileRegex = /^(?:\+91[\-\s]?)?[5-9]\d{9}$/;
  input = input.replace(/\s/g, '');
  if (input.length === 12) {
    input = input.slice(2, 13);
  }
  if (input.length === 13) {
    input = input.slice(3, 14);
  }
  const isValid = mobileRegex.test(input.trim());

  return {
    result: isValid,
    fixedNumber: input,
  };
}
