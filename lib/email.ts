// We ask for a work email everywhere. Common free/personal providers are
// turned away with a clear message so leads route to a real company.
const PERSONAL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "ymail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "zoho.com",
  "yandex.com",
  "mail.com",
]);

export const WORK_EMAIL_MESSAGE =
  "Please use your work email, not a personal address like Gmail or Yahoo.";

export function isPersonalEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  return PERSONAL_DOMAINS.has(domain);
}
