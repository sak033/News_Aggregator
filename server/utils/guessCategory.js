export default function guessCategory(text = "") {
  const t = text.toLowerCase();

  if (t.includes("election") || t.includes("government")) return "politics";
  if (t.includes("cricket") || t.includes("football")) return "sports";
  if (t.includes("stock") || t.includes("market")) return "business";
  if (t.includes("ai") || t.includes("software")) return "technology";

  return "general";
}
