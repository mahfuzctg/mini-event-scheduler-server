export const generateCategory = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes("meeting")) return "Work";
  if (t.includes("birthday") || t.includes("party")) return "Personal";
  return "Other";
};
