import type { DraftInsight, GardenZone } from "@/lib/types/garden";

const KEYWORDS = {
  emotion: [
    "anxious",
    "anxiety",
    "worried",
    "worry",
    "stress",
    "stressed",
    "fear",
    "afraid",
    "sad",
    "cry",
    "grief",
    "angry",
    "frustrated",
    "overwhelmed",
    "nervous",
    "hurt",
  ],
  relationship: [
    "friend",
    "partner",
    "family",
    "parent",
    "mom",
    "dad",
    "people",
    "someone",
    "they",
    "others",
    "boundary",
    "boundaries",
    "feedback",
    "relationship",
    "compare",
    "comparison",
  ],
  direction: [
    "future",
    "plan",
    "career",
    "goal",
    "work",
    "job",
    "purpose",
    "decision",
    "choose",
    "choice",
    "path",
    "direction",
    "next step",
  ],
  self: [
    "myself",
    "habit",
    "growth",
    "discipline",
    "routine",
    "consistency",
    "confidence",
    "trust myself",
    "self-worth",
    "self doubt",
    "self-doubt",
  ],
} as const satisfies Record<GardenZone, readonly string[]>;

const ZONE_PRIORITY: GardenZone[] = [
  "emotion",
  "relationship",
  "direction",
  "self",
];

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function normalizeThought(input: string) {
  return input.trim().replace(/\s+/g, " ").replace(/[.?!]+$/g, "");
}

function sanitizeForMatching(input: string) {
  return ` ${normalizeThought(input)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
}

function hashString(value: string) {
  let hash = 0;

  for (const character of value) {
    hash = (hash * 31 + character.charCodeAt(0)) % 100000;
  }

  return hash;
}

function countMatches(input: string, keywords: readonly string[]) {
  return keywords.reduce((score, keyword) => {
    return input.includes(` ${keyword} `) ? score + 1 : score;
  }, 0);
}

function buildFallbackInsight(zone: GardenZone) {
  if (zone === "emotion") {
    return "The feeling becomes easier to carry once it is named honestly.";
  }

  if (zone === "relationship") {
    return "Relationships become steadier when your needs are named clearly.";
  }

  if (zone === "direction") {
    return "Direction becomes clearer when you commit to one honest next step.";
  }

  return "Self-trust grows when your actions stay close to what you know is true.";
}

function classifyZone(input: string): GardenZone {
  const searchableInput = sanitizeForMatching(input);
  let bestZone: GardenZone = "self";
  let bestScore = 0;

  for (const zone of ZONE_PRIORITY) {
    const score = countMatches(searchableInput, KEYWORDS[zone]);

    if (score > bestScore) {
      bestZone = zone;
      bestScore = score;
    }
  }

  return bestZone;
}

function polishThought(input: string, zone: GardenZone) {
  const searchableInput = sanitizeForMatching(input);

  if (
    searchableInput.includes(" moving faster than me ") ||
    searchableInput.includes(" compare ") ||
    searchableInput.includes(" comparison ")
  ) {
    return "Comparison pulls you away from your own pace.";
  }

  if (
    searchableInput.includes(" boundary ") ||
    searchableInput.includes(" boundaries ")
  ) {
    return "Clear boundaries protect connection by making your limits visible.";
  }

  if (
    searchableInput.includes(" friend ") ||
    searchableInput.includes(" partner ") ||
    searchableInput.includes(" family ") ||
    searchableInput.includes(" people ") ||
    searchableInput.includes(" someone ") ||
    searchableInput.includes(" they ") ||
    searchableInput.includes(" feedback ")
  ) {
    return "Clearer communication matters more than mind-reading in close relationships.";
  }

  if (
    searchableInput.includes(" anxious ") ||
    searchableInput.includes(" worried ") ||
    searchableInput.includes(" stress ") ||
    searchableInput.includes(" stressed ") ||
    searchableInput.includes(" nervous ") ||
    searchableInput.includes(" overwhelmed ")
  ) {
    return "Anxiety softens when it is named instead of managed through more pressure.";
  }

  if (
    searchableInput.includes(" angry ") ||
    searchableInput.includes(" frustrated ") ||
    searchableInput.includes(" upset ")
  ) {
    return "Naming frustration clearly helps it move instead of leaking into everything else.";
  }

  if (
    searchableInput.includes(" sad ") ||
    searchableInput.includes(" grief ") ||
    searchableInput.includes(" cry ") ||
    searchableInput.includes(" hurt ")
  ) {
    return "Sadness moves more gently when it is allowed instead of resisted.";
  }

  if (
    searchableInput.includes(" future ") ||
    searchableInput.includes(" plan ") ||
    searchableInput.includes(" goal ") ||
    searchableInput.includes(" career ") ||
    searchableInput.includes(" purpose ")
  ) {
    return "Direction becomes clearer when you choose the next honest step instead of demanding the whole path.";
  }

  if (
    searchableInput.includes(" decision ") ||
    searchableInput.includes(" choose ") ||
    searchableInput.includes(" choice ")
  ) {
    return "A decision becomes lighter once you stop asking it to remove all uncertainty.";
  }

  if (
    searchableInput.includes(" habit ") ||
    searchableInput.includes(" discipline ") ||
    searchableInput.includes(" routine ") ||
    searchableInput.includes(" consistency ")
  ) {
    return "Discipline becomes steadier when it is built through small repeated choices.";
  }

  if (
    searchableInput.includes(" growth ") ||
    searchableInput.includes(" myself ") ||
    searchableInput.includes(" trust myself ") ||
    searchableInput.includes(" confidence ")
  ) {
    return "Growth deepens when you stop leaving your own perspective behind.";
  }

  return buildFallbackInsight(zone);
}

export async function generateInsightMock(input: string): Promise<DraftInsight> {
  const normalizedInput = normalizeThought(input);
  const zone = classifyZone(normalizedInput);
  const delay = 800 + (hashString(normalizedInput.toLowerCase()) % 401);

  await wait(delay);

  return {
    content: polishThought(normalizedInput, zone),
    zone,
  };
}
