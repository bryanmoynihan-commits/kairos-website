import { Document, Font, Image, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { AREAS, LEVELS, NO_FIXES_MESSAGE, QUESTIONS } from "@/lib/scorecard/content";
import { bandFor, type Answers, type ScorecardResult } from "@/lib/scorecard/scoring";

// Printable, shareable Scorecard report. Follows the Kairos Word letterhead system
// ("Kairos Word Document Formatting Guide"): US Letter, 0.75in margins, logo header
// and teal-ruled footer on every page, Geist Light / Regular / SemiBold only, the
// Title / Heading 1 / Heading 2 / Normal / Quote type scale, and theme colors.
// Bright teal is a rule, bar, or link color only, never body text.

const BLACK = "#0e0d0d"; // Text 1: headings, Title
const OFF_BLACK = "#2d2a2b"; // Text 2: body
const OFF_WHITE = "#f0f0eb"; // light surfaces
const TEAL = "#2dd4bf"; // accent: rules, bars, links
const WARM_GRAY = "#c0bdb8"; // footer text, hairlines
const GRAY = "#6e6864"; // secondary neutral (gray ramp)
const SUBTITLE_GRAY = "#655e5e";

const PT_PER_IN = 72;
const MARGIN = 0.75 * PT_PER_IN; // page margins
const EDGE = 0.5 * PT_PER_IN; // header / footer distance from the page edge
const LOGO_WIDTH = 1.5 * PT_PER_IN; // matches the template header image

const SCORECARD_URL = "https://kairosperformance.ai/resources/ai-readiness-scorecard";
const CONTACT_URL = "https://kairosperformance.ai/contact";

let fontsRegistered = false;

export function registerPdfFonts(origin: string) {
  if (fontsRegistered) return;
  Font.register({
    family: "Geist",
    fonts: [
      { src: `${origin}/fonts/Geist-Light.ttf`, fontWeight: 300 },
      { src: `${origin}/fonts/Geist-Regular.ttf`, fontWeight: 400 },
      { src: `${origin}/fonts/Geist-SemiBold.ttf`, fontWeight: 600 },
    ],
  });
  // Keep whole words together; the default hyphenation splits brand terms.
  Font.registerHyphenationCallback((word) => [word]);
  fontsRegistered = true;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Geist",
    fontSize: 11,
    lineHeight: 1.15,
    color: OFF_BLACK,
    paddingTop: EDGE + 44,
    paddingBottom: MARGIN + 18,
    paddingHorizontal: MARGIN,
  },

  // Running header and footer (every page)
  header: { position: "absolute", top: EDGE, left: MARGIN },
  logo: { width: LOGO_WIDTH },
  footer: {
    position: "absolute",
    left: MARGIN,
    right: MARGIN,
    bottom: EDGE - 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: TEAL,
    paddingTop: 4,
    fontSize: 9,
    color: WARM_GRAY,
  },
  footerSlot: { flex: 1 },
  footerCenter: { flex: 1, textAlign: "center" },
  pageNumber: {
    position: "absolute",
    right: MARGIN,
    // Same baseline as the footer row text (measured in the rendered PDF).
    top: 792 - (EDGE - 8) - 9 * 1.15 - 2.35,
    fontSize: 9,
    color: WARM_GRAY,
  },

  // Type scale
  // lineHeight 1 like the score number: with the inherited 1.15, react-pdf
  // mis-measured the 28pt Light title and let the subtitle overlap it.
  titleBlock: { marginBottom: 8 },
  title: { fontSize: 28, fontWeight: 300, color: BLACK, letterSpacing: -0.5, lineHeight: 1 },
  subtitle: { fontSize: 14, color: SUBTITLE_GRAY, letterSpacing: 0.75 },
  h1: {
    fontSize: 18,
    color: BLACK,
    textTransform: "uppercase",
    letterSpacing: 0.75,
    borderTopWidth: 1,
    borderTopColor: TEAL,
    paddingTop: 4,
    marginTop: 24,
    marginBottom: 8,
  },
  h2: { fontSize: 14, fontWeight: 600, color: OFF_BLACK, marginTop: 12, marginBottom: 4 },
  body: { fontSize: 11, color: OFF_BLACK },
  strong: { fontWeight: 600 },
  quote: {
    fontSize: 12,
    color: OFF_BLACK,
    borderLeftWidth: 3,
    borderLeftColor: TEAL,
    marginLeft: 17,
    paddingLeft: 8,
    paddingVertical: 2,
    marginTop: 8,
  },
  link: { color: TEAL, textDecoration: "underline" },

  // Score block
  scoreRow: { flexDirection: "row", gap: 18, alignItems: "center" },
  scorePanel: {
    width: 116,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: OFF_WHITE,
  },
  scoreNumber: { fontSize: 46, fontWeight: 300, color: BLACK, lineHeight: 1 },
  scoreCaption: { fontSize: 9, color: GRAY, marginTop: 4 },
  scoreText: { flex: 1 },

  // Area rows
  areaRow: { marginBottom: 12 },
  areaHead: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  areaName: { fontSize: 12, color: OFF_BLACK },
  areaScore: { fontSize: 12, fontWeight: 600, color: BLACK },
  track: { height: 6, backgroundColor: OFF_WHITE, marginBottom: 4 },
  bar: { height: 6, backgroundColor: TEAL },

  // Fixes and numbered list (Kairos Numbers: 0.43in indent, 0.18in hanging)
  fixLine: { fontSize: 11, color: OFF_BLACK, marginBottom: 3 },
  listRow: { flexDirection: "row", marginLeft: 0.25 * PT_PER_IN, marginBottom: 6 },
  listNumber: { width: 0.18 * PT_PER_IN, fontSize: 11, color: OFF_BLACK },
  listText: { flex: 1, fontSize: 11, color: OFF_BLACK },
});

interface Props {
  result: ScorecardResult;
  answers: Answers;
  firstName: string;
  lastName: string;
  company: string;
  origin: string;
  date: string;
}

export default function ScorecardPdf({
  result,
  answers,
  firstName,
  lastName,
  company,
  origin,
  date,
}: Props) {
  const level = LEVELS[result.level];
  const areaName = (id: string) => AREAS.find((a) => a.id === id)?.name ?? id;
  const preparedFor = [`${firstName} ${lastName}`.trim(), company].filter(Boolean).join(", ");
  const fixes = result.fixes
    .map((id) => QUESTIONS.find((q) => q.id === id))
    .filter((q): q is (typeof QUESTIONS)[number] => !!q);

  return (
    <Document
      title={`AI Readiness Scorecard - ${company || "Results"}`}
      author="Kairos Performance"
      creator="Kairos Performance"
      subject="AI Readiness Scorecard results"
    >
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt */}
          <Image style={styles.logo} src={`${origin}/brand/kairos-logo-horizontal-light.png`} />
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.title}>AI Readiness Scorecard</Text>
        </View>
        <Text style={styles.subtitle}>
          {preparedFor ? `Prepared for ${preparedFor}  |  ${date}` : date}
        </Text>

        <Text style={styles.h1}>Your score</Text>
        <View style={styles.scoreRow} wrap={false}>
          <View style={styles.scorePanel}>
            <Text style={styles.scoreNumber}>{result.overall}</Text>
            <Text style={styles.scoreCaption}>out of 100</Text>
          </View>
          <View style={styles.scoreText}>
            <Text style={[styles.h2, { marginTop: 0 }]}>{level.name}</Text>
            <Text style={styles.body}>{level.headline}</Text>
          </View>
        </View>
        {result.cap && (
          <Text style={styles.quote}>
            Your overall score is {result.overall}, but your {areaName(result.cap.area)} score of{" "}
            {result.cap.score} holds your level back. Everything else you build sits on top of it.
          </Text>
        )}

        <Text style={styles.h1}>Your six areas</Text>
        {AREAS.map((area) => {
          const score = result.areas[area.id];
          return (
            <View key={area.id} style={styles.areaRow} wrap={false}>
              <View style={styles.areaHead}>
                <Text style={styles.areaName}>{area.name}</Text>
                <Text style={styles.areaScore}>{score}</Text>
              </View>
              <View style={styles.track}>
                <View style={[styles.bar, { width: `${Math.max(score, 2)}%` }]} />
              </View>
              <Text style={styles.body}>{area.readouts[bandFor(score)]}</Text>
            </View>
          );
        })}

        {/* Page 2: what to do about it */}
        <View break>
          <Text style={[styles.h1, { marginTop: 0 }]}>
            {fixes.length > 0 ? "Fix these first" : "Your next step"}
          </Text>
          {fixes.length > 0 ? (
            <>
              <Text style={styles.body}>
                The highest-impact gaps from your answers, starting with the foundation
                everything else sits on.
              </Text>
              {fixes.map((q, i) => (
                <View key={q.id} wrap={false}>
                  <Text style={styles.h2}>
                    {i + 1}. {areaName(q.area)}
                  </Text>
                  <Text style={styles.fixLine}>
                    <Text style={styles.strong}>Where you are today: </Text>
                    {q.options[answers[q.id] ?? 0]}
                  </Text>
                  <Text style={styles.fixLine}>
                    <Text style={styles.strong}>The fix: </Text>
                    {q.fix}
                  </Text>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.body}>{NO_FIXES_MESSAGE}</Text>
          )}

          <View wrap={false}>
            <Text style={[styles.h2, { marginTop: 18 }]}>Recommended way in</Text>
            <Text style={styles.quote}>{level.wayIn}</Text>
          </View>

          <Text style={styles.h1}>Next steps</Text>
          <View style={styles.listRow}>
            <Text style={styles.listNumber}>1.</Text>
            <Text style={styles.listText}>
              Share this report with your leadership team, and ask each person to{" "}
              <Link style={styles.link} src={SCORECARD_URL}>take the Scorecard</Link> on their
              own. Where your answers differ is often the most useful finding.
            </Text>
          </View>
          <View style={styles.listRow}>
            <Text style={styles.listNumber}>2.</Text>
            <Text style={styles.listText}>
              <Link style={styles.link} src={CONTACT_URL}>Book an Intro Call</Link> to walk
              through your results and the right way to start. No pitch, just a conversation
              about what&apos;s getting in the way.
            </Text>
          </View>
          <View style={styles.listRow}>
            <Text style={styles.listNumber}>3.</Text>
            <Text style={styles.listText}>
              Retake the Scorecard in a quarter to see how far your foundation has moved.
            </Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerSlot}>Kairos Performance</Text>
          <Text style={styles.footerCenter}>
            <Link style={styles.link} src={SCORECARD_URL}>Take the Scorecard</Link>
            {"  |  "}
            <Link style={styles.link} src={CONTACT_URL}>Book an Intro Call</Link>
          </Text>
          <View style={styles.footerSlot} />
        </View>
        {/* Page number sits outside the footer row: react-pdf's render-prop text
            breaks the layout of any row it shares, pushing siblings off the page. */}
        <Text
          style={styles.pageNumber}
          fixed
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        />
      </Page>
    </Document>
  );
}
