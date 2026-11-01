import { AREAS, QUESTIONS, type AreaId, type Band, type LevelId } from "./content";

/** Question id -> points (0 to 3). */
export type Answers = Record<string, number>;

export interface ScorecardResult {
  /** 0-100 in steps of 5, from total raw points. */
  overall: number;
  areas: Record<AreaId, number>;
  level: LevelId;
  /** Set only when a foundation area lowered the level. */
  cap: { area: AreaId; score: number } | null;
  /** Question ids for the top fixes, in display order. */
  fixes: string[];
}

const MAX_POINTS = 3;
const LEVEL_ORDER: LevelId[] = ["foundation", "targeted", "scale"];

export function toScore(points: number, max: number): number {
  return Math.round((points / max) * 100 / 5) * 5;
}

export function bandFor(score: number): Band {
  if (score < 40) return "low";
  if (score < 70) return "mid";
  return "high";
}

const levelFor = (score: number): LevelId =>
  LEVEL_ORDER[["low", "mid", "high"].indexOf(bandFor(score))];

export function scoreScorecard(answers: Answers): ScorecardResult {
  const pointsFor = (id: string) => answers[id] ?? 0;

  const areas = {} as Record<AreaId, number>;
  for (const area of AREAS) {
    const qs = QUESTIONS.filter((q) => q.area === area.id);
    const points = qs.reduce((sum, q) => sum + pointsFor(q.id), 0);
    areas[area.id] = toScore(points, qs.length * MAX_POINTS);
  }

  const total = QUESTIONS.reduce((sum, q) => sum + pointsFor(q.id), 0);
  const overall = toScore(total, QUESTIONS.length * MAX_POINTS);

  // The weakest foundation area sets a ceiling on the level.
  const weakest = AREAS.filter((a) => a.foundation).reduce((low, a) =>
    areas[a.id] < areas[low.id] ? a : low
  );
  const scoreLevel = levelFor(overall);
  const ceiling = levelFor(areas[weakest.id]);
  const capped =
    LEVEL_ORDER.indexOf(ceiling) < LEVEL_ORDER.indexOf(scoreLevel);

  return {
    overall,
    areas,
    level: capped ? ceiling : scoreLevel,
    cap: capped ? { area: weakest.id, score: areas[weakest.id] } : null,
    fixes: topFixes(answers),
  };
}

// Questions scored 0 or 1, at most one per area (its lowest, earliest
// question), foundation areas first, then in question order. Up to three.
function topFixes(answers: Answers): string[] {
  const perArea = AREAS.map((area) => {
    const candidates = QUESTIONS.filter(
      (q) => q.area === area.id && (answers[q.id] ?? 0) <= 1
    );
    const pick = candidates.reduce<(typeof candidates)[number] | null>(
      (best, q) =>
        best === null || (answers[q.id] ?? 0) < (answers[best.id] ?? 0) ? q : best,
      null
    );
    return pick ? { area, id: pick.id } : null;
  }).filter((x): x is NonNullable<typeof x> => x !== null);

  const ordered = [
    ...perArea.filter((x) => x.area.foundation),
    ...perArea.filter((x) => !x.area.foundation),
  ];
  return ordered.slice(0, 3).map((x) => x.id);
}
