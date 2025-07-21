export const generateCategory = (title: string, notes?: string): string => {
  const text = `${title} ${notes || ""}`.toLowerCase();

  const workKeywords = ["meeting", "project", "client"];
  const personalKeywords = ["birthday", "family", "party"];

  if (workKeywords.some((kw) => text.includes(kw))) return "Work";
  if (personalKeywords.some((kw) => text.includes(kw))) return "Personal";
  return "Other";
};
