// Run: npx tsx --test lib/scorecard/scoring.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { QUESTIONS } from "./content";
import { scoreScorecard, toScore, bandFor, type Answers } from "./scoring";

/** Every question answered with the same points. */
const uniform = (points: number): Answers =>
  Object.fromEntries(QUESTIONS.map((q) => [q.id, points]));

/** Per-area points, three questions each, in question order. */
const byArea = (areaPoints: Record<string, [number, number, number]>): Answers => {
  const answers: Answers = {};
  const seen: Record<string, number> = {};
  for (const q of QUESTIONS) {
    const i = seen[q.area] ?? 0;
    answers[q.id] = areaPoints[q.area][i];
    seen[q.area] = i + 1;
  }
  return answers;
};

test("area score rounds points out of 9 to the nearest 5", () => {
  assert.deepEqual(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((p) => toScore(p, 9)),
    [0, 10, 20, 35, 45, 55, 65, 80, 90, 100]
  );
});

test("bands: below 40 low, 40-69 mid, 70+ high", () => {
  assert.equal(bandFor(35), "low");
  assert.equal(bandFor(40), "mid");
  assert.equal(bandFor(65), "mid");
  assert.equal(bandFor(70), "high");
});

test("overall score comes from raw points, not rounded area scores", () => {
  // 21 of 54 points = 38.9 -> 40. Averaging rounded area scores would differ.
  const answers = byArea({
    dataIntegrity: [2, 2, 1],
    processDocumentation: [1, 1, 1],
    systemsArchitecture: [2, 1, 1],
    teamAlignment: [1, 1, 1],
    measurementFramework: [1, 1, 1],
    aiAdoption: [1, 1, 1],
  });
  assert.equal(scoreScorecard(answers).overall, 40);
});

test("levels follow the overall score when the foundation is strong", () => {
  assert.equal(scoreScorecard(uniform(0)).level, "foundation");
  assert.equal(scoreScorecard(uniform(3)).level, "scale");
  // 4,5 per area mix -> overall in the mid band, foundations mid too
  assert.equal(scoreScorecard(uniform(2)).level, "targeted");
});

test("a low foundation area caps the level at Foundation first", () => {
  const answers = byArea({
    dataIntegrity: [1, 1, 1], // 3/9 -> 35, low
    processDocumentation: [3, 3, 3],
    systemsArchitecture: [3, 3, 3],
    teamAlignment: [3, 3, 3],
    measurementFramework: [3, 3, 3],
    aiAdoption: [3, 3, 3],
  });
  const result = scoreScorecard(answers);
  assert.ok(result.overall >= 70);
  assert.equal(result.level, "foundation");
  assert.deepEqual(result.cap, { area: "dataIntegrity", score: 35 });
});

test("a mid foundation area caps the level at targeted automation", () => {
  const answers = byArea({
    dataIntegrity: [3, 3, 3],
    processDocumentation: [3, 3, 3],
    systemsArchitecture: [2, 2, 2], // 6/9 -> 65, mid
    teamAlignment: [3, 3, 3],
    measurementFramework: [3, 3, 3],
    aiAdoption: [3, 3, 3],
  });
  const result = scoreScorecard(answers);
  assert.equal(result.level, "targeted");
  assert.deepEqual(result.cap, { area: "systemsArchitecture", score: 65 });
});

test("when both foundation areas cap, the lower one is named", () => {
  const answers = byArea({
    dataIntegrity: [1, 1, 1], // 35
    processDocumentation: [3, 3, 3],
    systemsArchitecture: [1, 0, 1], // 20
    teamAlignment: [3, 3, 3],
    measurementFramework: [3, 3, 3],
    aiAdoption: [3, 3, 3],
  });
  assert.deepEqual(scoreScorecard(answers).cap, {
    area: "systemsArchitecture",
    score: 20,
  });
});

test("no cap reported when the cap doesn't lower the level", () => {
  assert.equal(scoreScorecard(uniform(0)).cap, null);
  assert.equal(scoreScorecard(uniform(3)).cap, null);
});

test("top fixes: scored 0-1, one per area, foundation areas first, max three", () => {
  const fixes = scoreScorecard(uniform(0)).fixes;
  assert.deepEqual(fixes, ["q1", "q7", "q4"]);
});

test("top fixes skip questions scored 2 or 3, and can be empty", () => {
  const answers = { ...uniform(3), q14: 1, q16: 0 };
  assert.deepEqual(scoreScorecard(answers).fixes, ["q14", "q16"]);
  assert.deepEqual(scoreScorecard(uniform(2)).fixes, []);
});

test("the lowest-scoring question in an area wins its slot", () => {
  const answers = { ...uniform(3), q1: 1, q2: 0 };
  assert.deepEqual(scoreScorecard(answers).fixes, ["q2"]);
});
