export function normalizeBangladeshPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("880")) return `0${digits.slice(3)}`;
  if (digits.length === 10 && digits.startsWith("1")) return `0${digits}`;
  return digits;
}

export function isBangladeshMobile(value: string) {
  return /^01[3-9]\d{8}$/.test(normalizeBangladeshPhone(value));
}
