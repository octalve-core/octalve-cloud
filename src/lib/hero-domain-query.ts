/** Validate rather than silently deleting invalid characters. Preserve exact requested extension. */
export function prepareHeroDomainQuery(value: string, defaults: string[]): {query: string; tlds: string[]} | null {
  const clean = value.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "").replace(/\.$/, "");
  if (!clean || clean.length > 253) return null;
  const labels = clean.split(".");
  if (!labels.every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label))) return null;
  if (labels.length === 1) return {query: clean, tlds: defaults};
  const suffix = "." + labels.slice(1).join(".");
  if (!/^(?:\.[a-z][a-z0-9-]{1,62})+$/.test(suffix)) return null;
  return {query: clean, tlds: [suffix]};
}
