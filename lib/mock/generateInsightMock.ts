import type { DraftInsight, GardenZone } from "@/lib/types/garden";

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function normalizeThought(input: string) {
  return input
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.?!]+$/g, "");
}

function polishThought(input: string) {
  const normalized = normalizeThought(input);

  if (!normalized) {
    return "";
  }

  const lower = normalized.toLowerCase();

  if (
    lower.startsWith("i ") ||
    lower.startsWith("my ") ||
    lower.startsWith("when ") ||
    lower.startsWith("sometimes ") ||
    lower.startsWith("lately ")
  ) {
    return `${sentenceCase(normalized)}.`;
  }

  return `I realized ${normalized.charAt(0).toLowerCase()}${normalized.slice(1)}.`;
}

function classifyZone(input: string): GardenZone {
  const lower = input.toLowerCase();

  if (
    /feel|felt|emotion|anxious|anxiety|sad|cry|grief|angry|upset|calm|nervous|overwhelmed/.test(
      lower,
    )
  ) {
    return "emotion";
  }

  if (
    /friend|partner|relationship|family|mom|dad|parent|coworker|colleague|team|manager|people|others/.test(
      lower,
    )
  ) {
    return "relationship";
  }

  if (
    /career|work|job|future|path|direction|plan|purpose|goal|next|decision|curiosity/.test(
      lower,
    )
  ) {
    return "direction";
  }

  return "self";
}

export async function generateInsightMock(input: string): Promise<DraftInsight> {
  const delay = 800 + Math.floor(Math.random() * 401);

  await wait(delay);

  return {
    content: polishThought(input),
    zone: classifyZone(input),
  };
}
