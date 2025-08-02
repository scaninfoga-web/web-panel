export function isValidIndianMobileNumber(input: string): {
  result: boolean;
  fixedNumber: string;
} {
  const mobileRegex = /^(?:\+91[\-\s]?)?[5-9]\d{9}$/;
  input = input
    .normalize('NFKD')
    .replace(/[\u200B-\u200D\uFEFF\u202C\u202D\u202E]/g, '')
    .trim();
  input = input.replace(/\s/g, '');
  if (input.length === 12) {
    input = input.slice(2, 13);
  }
  if (input.length === 13) {
    input = input.slice(3, 14);
  }
  const isValid = mobileRegex.test(input);

  return {
    result: isValid,
    fixedNumber: input,
  };
}

export function isValidVehicleNumber(input: string): {
  result: boolean;
  fixedNumber: string;
} {
  const vehicleRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]?[A-Z]{1,2}[0-9]{1,4}$/;
  input = input
    .normalize('NFKD')
    .replace(/[\u200B-\u200D\uFEFF\u202C\u202D\u202E]/g, '')
    .trim()
    .toUpperCase();
  input = input.replace(/\s/g, '');
  const isValid = vehicleRegex.test(input);

  return {
    result: isValid,
    fixedNumber: input,
  };
}
export function isValidPanNumber(input: string): {
  result: boolean;
  fixedNumber: string;
} {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  input = input
    .normalize('NFKD')
    .replace(/[\u200B-\u200D\uFEFF\u202C\u202D\u202E]/g, '')
    .trim()
    .toUpperCase();
  input = input.replace(/\s/g, '');
  const isValid = panRegex.test(input);

  return {
    result: isValid,
    fixedNumber: input,
  };
}
