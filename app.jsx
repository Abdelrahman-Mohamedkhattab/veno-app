const { useState, useEffect, useRef, useMemo } = React;

/* =========================================================================
   BRAND ASSETS — exact vector data pulled from the Veno Brand Identity file
   ========================================================================= */

const WM = {
  vw: 361.66, vh: 280.14,
  V: "M 71.09910573038636,49.267001726208605 C 75.40769873038636,48.30215772620858 80.34519873038636,50.15372072620863 85.91160573038636,54.821689726208604 C 76.79832473038635,216.7513767262086 65.06004273038636,279.64981372620855 52.228011730386356,280.13418972620866 C 25.384261730386356,281.1420017262086 -20.197769269613644,9.618563726208606 9.907698730386358,0.25137672620860485 C 14.708480730386356,-1.244717273791423 22.450667730386357,3.6224707262086326 35.267074730386355,22.286532726208577 C 39.821761730386356,68.90372072620863 44.37644873038636,115.5170017262086 48.931136730386356,162.13418972620866 C 48.66941773038636,90.2435637262086 56.06004273038636,52.62247072620863 71.09910573038636,49.267001726208605",
  E: "M 152.41160573038638,170.00528272620863 C 149.08348073038638,170.52872072620858 143.77879273038633,171.19668972620866 137.21629273038633,171.27090772620863 C 125.84519873038636,171.39590772620863 122.78269873038636,169.59903272620863 119.43504273038633,171.83731372620855 C 111.93113673038636,176.8607517262086 112.39598073038638,195.8607517262086 119.45848073038638,199.73965772620863 C 122.00144873038636,201.13418972620866 124.01316773038633,199.80606372620855 137.84910573038638,195.9076267262086 C 153.31785573038638,191.5482517262086 155.13816773038633,191.9857517262086 156.27488673038636,192.64981372620855 C 158.43894873038636,193.91153272620863 163.14988673038636,198.91934572620858 156.07176173038636,226.23184572620858 C 152.68894873038636,227.16934572620858 149.44285573038638,228.22403272620863 146.22410573038638,229.38418972620866 C 146.22410573038638,229.38418972620866 141.33738673038636,231.11465772620863 136.55613673038636,233.15372072620858 C 121.00535573038638,239.7826267262086 105.75926173038636,255.0170017262086 97.41551173038636,252.99747072620858 C 87.23582473038635,250.5326267262086 86.06004273038636,222.10293972620866 85.91160573038636,162.16934572620858 C 85.74363673038636,93.3138767262086 87.14207473038635,68.5873137262086 97.41551173038636,65.7435637262086 C 104.66551173038636,63.735751726208605 110.45457473038635,74.2513767262086 139.39207473038635,85.5716897262086 C 145.66941773038633,88.02872072620863 150.99754273038633,89.72403272620858 154.66941773038633,90.8060637262086 C 160.54832473038635,112.71622072620863 158.36473073038638,120.57559572620863 154.48582473038635,123.1810637262086 C 145.98973073038638,128.88028272620858 128.43504273038633,110.0091897262086 119.44676173038636,116.2748137262086 C 113.39598073038638,120.48965772620858 112.97410573038638,134.8920017262086 119.27879273038633,140.55215772620858 C 127.87644873038636,148.2748137262086 144.52879273038633,135.72403272620858 152.39988673038636,142.8685637262086 C 155.54441773038633,145.72403272620863 157.99754273038633,152.3763767262086 152.41160573038638,170.00528272620863",
  N: "M 220.48582473038635,214.94278272620863 C 208.97410573038638,181.41153272620863 196.95457473038635,148.88809572620863 193.70457473038635,149.95059572620863 C 192.98582473038635,150.1810637262086 192.72410573038638,152.03653272620858 193.56785573038638,164.36465772620863 C 196.12644873038636,201.77481372620855 199.11082473038635,211.3138767262086 193.64207473038635,218.3295017262086 C 188.87254273038633,224.45059572620858 178.68113673038636,227.29043972620866 173.20848073038638,223.4076267262086 C 164.35301173038636,217.13418972620866 171.05613673038636,195.49747072620858 173.84129273038633,162.16934572620858 C 175.23191773038633,145.5638767262086 176.07957473038635,122.3607517262086 173.54832473038635,93.98184572620863 C 179.25144873038636,93.64590772620858 188.29441773038633,94.0326267262086 196.72410573038638,99.51309572620863 C 221.88816773038633,115.87247072620863 221.47019873038636,164.57168972620866 223.20066773038633,164.31778272620863 C 224.64988673038636,164.10684572620858 216.13426173038636,131.23965772620858 225.64207473038635,100.8216897262086 C 233.06785573038638,77.0560637262086 249.59519873038636,60.852939726208604 264.5678557303864,50.05997072620863 C 256.01707473038635,74.3451267262086 246.30223073038638,111.9779397262086 250.52879273038633,156.7357517262086 C 255.00535573038638,204.09122072620858 273.15379273038633,238.95840772620863 264.34519873038636,245.32168972620866 C 260.31004273038633,248.2357517262086 250.02488673038636,245.60293972620866 220.48582473038635,214.94278272620863",
  O: "M 349.29051173038636,60.290439726208604 C 339.64988673038636,32.80997072620863 321.1147307303864,5.306063726208606 299.66551173038636,18.642001726208605 C 287.6303557303864,26.110751726208605 278.16941773038633,43.34122072620863 272.1147307303864,60.56778272620858 C 255.78660573038638,107.0248137262086 256.8959807303864,164.9388767262086 273.2709807303864,211.02481372620855 C 279.18894873038636,227.6732517262086 288.4741057303864,245.0795017262086 300.0678557303864,252.3763767262086 C 321.31394873038636,265.7357517262086 339.8803557303864,237.59903272620863 349.4076987303863,210.30997072620858 C 365.7866057303863,163.44668972620866 365.71238673038636,107.09122072620863 349.29051173038636,60.290439726208604",
};
const O_TX = 260.414, O_TY = 15.172;
const ICON_OVAL = "M 88.87580465250295,45.117962952667085 C 79.23517965250295,17.637493952667114 60.70002365250298,-9.866413047332912 39.25080465250295,3.4695249526670864 C 27.215648652502978,10.938274952667086 17.754710652502922,28.168743952667114 11.700023652502978,45.39530595266706 C -4.628101347497022,91.85233695266709 -3.5187263474970223,149.7663999526671 12.856273652502978,195.85233695266703 C 18.77424165250295,212.5007749526671 28.059398652502978,229.9070249526671 39.65314865250298,237.2038999526671 C 60.89924165250295,250.5632749526671 79.46564865250298,222.42655595266712 88.9929916525029,195.13749395266706 C 105.37189865250292,148.27421295266714 105.29767965250295,91.91874395266711 88.87580465250295,45.117962952667085";
const OVAL_CX = 50.6, OVAL_CY = 120.3;

function IconIcon({ scale, fill }) {
  return (
    <path
      d={ICON_OVAL}
      fill={fill}
      transform={`translate(${OVAL_CX} ${OVAL_CY}) scale(${scale}) translate(${-OVAL_CX} ${-OVAL_CY})`}
    />
  );
}

function Logo({ height = 34, color = "var(--navy)", oval = "var(--navy)", face = "var(--white)" }) {
  const w = height * (WM.vw / WM.vh);
  return (
    <svg width={w} height={height} viewBox={`0 0 ${WM.vw} ${WM.vh}`} style={{ display: "block" }}>
      <path d={WM.V} fill={color} />
      <path d={WM.E} fill={color} />
      <path d={WM.N} fill={color} />
      <path d={WM.O} fill={oval} />
      <g transform={`translate(${O_TX},${O_TY})`}>
        <IconIcon scale={0.78} fill={face} />
        <IconIcon scale={0.58} fill={oval} />
        <IconIcon scale={0.34} fill={face} />
        <circle cx={OVAL_CX} cy={98} r={6} fill={oval} />
      </g>
    </svg>
  );
}

function Glow({ size = 120, mood = "happy" }) {
  const mouth = {
    happy: "M150,252 Q192,278 232,252",
    calm: "M152,258 Q192,270 232,258",
    tired: "M156,262 Q192,256 228,262",
  }[mood] || "M150,252 Q192,278 232,252";
  const eyeH = mood === "tired" ? 30 : 52;
  const eyeY = mood === "tired" ? 202 : 188;
  return (
    <svg width={size} height={size} viewBox="0 0 400 400">
      <path
        d="M100,230 C60,230 40,190 55,158 C38,136 52,98 92,92 C96,54 142,36 168,58 C182,32 222,32 236,58 C268,42 306,58 304,96 C336,106 344,144 322,168 C338,196 320,232 284,232 C284,276 246,312 196,312 C146,312 100,276 100,230 Z"
        fill="var(--blue)"
      />
      <line x1="168" y1="58" x2="168" y2="92" stroke="var(--navy)" strokeWidth="5" strokeLinecap="round" opacity="0.35" />
      <rect x="132" y={eyeY} width="34" height={eyeH} rx="16" fill="var(--white)" />
      <rect x="206" y={eyeY} width="34" height={eyeH} rx="16" fill="var(--white)" />
      <path d={mouth} fill="none" stroke="var(--white)" strokeWidth="9" strokeLinecap="round" />
      <circle cx="300" cy="66" r="15" fill="var(--gold)" opacity="0.25" />
      <circle cx="300" cy="66" r="7" fill="var(--gold)" />
    </svg>
  );
}

/* =========================================================================
   ICONS (small line icons for nav + UI, hand-styled to match the rounded brand)
   ========================================================================= */
const IconHome = (p) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 11.5 12 4l8 7.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 10.5V20h12v-9.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconBook = (p) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 5.5c2-1 5-1.2 8 .3v13c-3-1.5-6-1.3-8-.3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M20 5.5c-2-1-5-1.2-8 .3v13c3-1.5 6-1.3 8-.3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const IconChart = (p) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);
const IconCalendar = (p) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <rect x="4" y="5.5" width="16" height="14.5" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M4 10h16M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconUser = (p) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="8.3" r="3.4" stroke="currentColor" strokeWidth="2" />
    <path d="M4.5 20c1.6-4 4.2-6 7.5-6s5.9 2 7.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconUpload = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 15V4M7 8.5 12 4l5 4.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.5 15.5V19a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-3.5" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
  </svg>
);
const IconClock = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="12" r="8.3" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconCheck = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M5 12.5 10 17l9-10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconClose = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
  </svg>
);
const IconChevron = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconBack = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconCoin = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <circle cx="12" cy="12" r="8.5" fill="var(--gold)" stroke="var(--gold-deep)" strokeWidth="1.2" />
    <path d="M12 7.5v9M9.3 9.6c0-1.2 1.2-1.8 2.7-1.8s2.6.7 2.6 1.7c0 2.3-5.3 1-5.3 3.3 0 1 1.1 1.8 2.7 1.8s2.8-.6 2.8-1.8" stroke="var(--gold-deep)" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const IconSpark = (p) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconPlus = (p) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
  </svg>
);
const IconFile = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M7 3.5h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M14 3.5v4h4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
const IconTrendUp = (p) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 17 10 11l4 4 6-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 7h5v5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconTrendDown = (p) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M4 7l6 6 4-4 6 8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 17h5v-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
function MoodFace({ mood, size = 26, style }) {
  const mouths = {
    great: "M8 15.5c1.4 1.8 3.2 2.7 5 2.7s3.6-.9 5-2.7",
    okay: "M8 15.5c1.4 1.3 3.2 2 5 2s3.6-.7 5-2",
    tired: "M8.5 16.5h11",
    stressed: "M8 17c1.4-1.6 3.2-2.4 5-2.4s3.6.8 5 2.4",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      <circle cx="12" cy="12" r="10.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8.6" cy="10" r="1.15" fill="currentColor" />
      <circle cx="15.4" cy="10" r="1.15" fill="currentColor" />
      <path d={mouths[mood] || mouths.okay} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* =========================================================================
   MOCK DATA
   ========================================================================= */
const COURSE_COLORS = ["#1A56DB", "#3B74E8", "#14275A", "#5B8DEF"];

const COURSES = [
  {
    id: "dsa", name: "Data Structures & Algorithms", code: "CSE 221", color: COURSE_COLORS[0],
    progress: 72,
    topics: [
      { id: "sorting", name: "Sorting & Complexity", mastery: 81, trend: [52, 58, 66, 71, 77, 81] },
      { id: "graphs", name: "Graph Traversal", mastery: 54, trend: [71, 66, 61, 57, 55, 54] },
      { id: "dp", name: "Dynamic Programming", mastery: 38, trend: [18, 24, 29, 33, 36, 38] },
    ],
  },
  {
    id: "calc", name: "Calculus II", code: "MATH 202", color: COURSE_COLORS[1],
    progress: 65,
    topics: [
      { id: "integrals", name: "Integration Techniques", mastery: 74, trend: [45, 53, 60, 66, 70, 74] },
      { id: "series", name: "Infinite Series", mastery: 47, trend: [40, 44, 45, 44, 46, 47] },
    ],
  },
  {
    id: "phys", name: "General Physics", code: "PHYS 214", color: COURSE_COLORS[2],
    progress: 58,
    topics: [
      { id: "em", name: "Electromagnetism", mastery: 63, trend: [30, 38, 47, 53, 59, 63] },
      { id: "thermo", name: "Thermodynamics", mastery: 41, trend: [56, 51, 47, 44, 42, 41] },
    ],
  },
  {
    id: "eng", name: "Academic English", code: "HUMA 101", color: COURSE_COLORS[3],
    progress: 83,
    topics: [
      { id: "essay", name: "Argumentative Essays", mastery: 88, trend: [60, 68, 76, 82, 85, 88] },
      { id: "vocab", name: "Academic Vocabulary", mastery: 77, trend: [55, 61, 66, 70, 74, 77] },
    ],
  },
];

const QUESTION_BANK = {
  sorting: [
    { type: "mcq", prompt: "What is the average-case time complexity of Quicksort?", choices: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correct: 1,
      explain: "Quicksort partitions around a pivot; on average the array splits roughly in half each time, giving log n levels of n work each — the same shape as Merge Sort, just without the extra memory.",
      source: { file: "Lecture 4 – Sorting.pdf", slide: 6 } },
    { type: "mcq", prompt: "Which sort is stable by default?", choices: ["Quicksort", "Heapsort", "Merge Sort", "Selection Sort"], correct: 2,
      explain: "Merge Sort never swaps equal elements past each other during the merge step, so items with equal keys keep their original relative order.",
      source: { file: "Lecture 4 – Sorting.pdf", slide: 9 } },
    { type: "written", prompt: "In one or two sentences, explain why Bubble Sort is rarely used in practice despite being easy to understand.",
      explain: "Bubble Sort does O(n²) comparisons even when the array is nearly sorted (unless you add an early-exit check), so it scales badly — real systems use O(n log n) sorts like Merge or Tim Sort instead.",
      source: { file: "Recitation notes.docx", slide: 2 } },
  ],
  graphs: [
    { type: "mcq", prompt: "BFS on an unweighted graph finds the shortest path because it explores nodes:", choices: ["In DFS order", "Layer by layer, by distance", "Randomly", "By node ID"], correct: 1,
      explain: "A queue makes BFS finish all nodes at distance k before starting distance k+1, so the first time it reaches a node is guaranteed to be via a shortest path.",
      source: { file: "Lecture 4 – Graphs.pdf", slide: 12 } },
    { type: "mcq", prompt: "Which structure does DFS typically use (implicitly or explicitly)?", choices: ["Queue", "Stack", "Heap", "Hash map"], correct: 1,
      explain: "DFS dives down one path fully before backtracking — that back-and-forth is exactly stack (LIFO) behaviour, whether it's an explicit stack or the recursion call stack.",
      source: { file: "Lecture 4 – Graphs.pdf", slide: 15 } },
  ],
  dp: [
    { type: "mcq", prompt: "Dynamic programming is most useful when a problem has:", choices: ["Random substructure", "Overlapping subproblems + optimal substructure", "No recursion", "Only greedy choices"], correct: 1,
      explain: "If subproblems repeat, caching (memoizing) their answers avoids recomputing them — that's the entire trick behind DP.",
      source: { file: "Week 4 slides.pptx", slide: 3 } },
    { type: "written", prompt: "What's the difference between memoization (top-down) and tabulation (bottom-up) DP?",
      explain: "Memoization is recursion + a cache: you solve subproblems on demand. Tabulation fills a table iteratively from the smallest subproblems up, avoiding recursion overhead entirely.",
      source: { file: "Week 4 slides.pptx", slide: 7 } },
  ],
  integrals: [
    { type: "mcq", prompt: "Integration by parts is derived from which rule?", choices: ["Chain rule", "Product rule", "Quotient rule", "Power rule"], correct: 1,
      explain: "∫ u dv = uv − ∫ v du falls directly out of reversing the product rule for derivatives.",
      source: { file: "Series convergence slides.pdf", slide: 2 } },
    { type: "mcq", prompt: "Which substitution helps most with ∫ 1/(1+x²) dx?", choices: ["x = sinθ", "x = tanθ", "x = secθ", "No substitution needed"], correct: 3,
      explain: "That integral is the direct antiderivative of arctan(x) — recognizing the standard form saves a substitution entirely.",
      source: { file: "Series convergence slides.pdf", slide: 5 } },
  ],
  series: [
    { type: "mcq", prompt: "A series where the ratio test gives r = 1 is:", choices: ["Always convergent", "Always divergent", "Inconclusive", "Always zero"], correct: 2,
      explain: "r = 1 is exactly the boundary case the ratio test can't resolve — you need another test (like comparison or integral test) to decide.",
      source: { file: "Series convergence slides.pdf", slide: 11 } },
  ],
  em: [
    { type: "mcq", prompt: "Gauss's Law relates electric flux through a closed surface to:", choices: ["Enclosed charge", "Total charge in the universe", "Surface area only", "Magnetic field"], correct: 0,
      explain: "Φ = Q_enclosed / ε₀ — only charge inside the surface matters, which is what makes symmetric problems solvable by inspection.",
      source: { file: "Chapter scan.pdf", slide: 4 } },
  ],
  thermo: [
    { type: "mcq", prompt: "In an adiabatic process:", choices: ["No work is done", "No heat is exchanged", "Temperature is constant", "Pressure is constant"], correct: 1,
      explain: "Adiabatic literally means 'no heat transfer' (Q = 0) — all internal energy change comes from work done on or by the gas.",
      source: { file: "Chapter scan.pdf", slide: 8 } },
  ],
  essay: [
    { type: "written", prompt: "Write a one-sentence thesis statement arguing for or against remote learning for university students.",
      explain: "A strong thesis takes a clear side and previews your reasoning, e.g. 'Remote learning benefits students most when paired with structured weekly deadlines, because flexibility without structure tends to reduce follow-through.'",
      source: { file: "Essay rubric.pdf", slide: 1 } },
  ],
  vocab: [
    { type: "mcq", prompt: "Which word best fits: 'The study's findings were later ___ by a larger trial.'", choices: ["corroborated", "confused", "canceled", "copied"], correct: 0,
      explain: "'Corroborated' means confirmed by additional evidence — the common academic phrasing for one study supporting another's results.",
      source: { file: "Essay rubric.pdf", slide: 3 } },
  ],
};

const PRIORITIES = [
  { id: "hardest", label: "What feels hardest right now", sub: "We'll surface that material more often" },
  { id: "urgent", label: "What has a deadline soonest", sub: "Upcoming quizzes and exams get priority" },
  { id: "forgetting", label: "What you're forgetting fastest", sub: "Topics with fading recall come back sooner" },
  { id: "confidence", label: "Quick wins to build momentum", sub: "Start with things you're close to mastering" },
];

const TODAY_PLAN = [
  { courseId: "dsa", topicId: "graphs", minutes: 12, reason: "You said Graph Traversal feels hardest" },
  { courseId: "calc", topicId: "series", minutes: 10, reason: "Recall is fading — due for a refresh" },
  { courseId: "phys", topicId: "thermo", minutes: 8, reason: "Quiz on Thursday" },
  { courseId: "eng", topicId: "vocab", minutes: 6, reason: "Quick win to start strong" },
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const INITIAL_SCHEDULE = [
  { id: "s1", day: 0, time: "16:00", courseId: "dsa", topic: "Sorting & Complexity", status: "done" },
  { id: "s2", day: 1, time: "18:30", courseId: "calc", topic: "Integration Techniques", status: "done" },
  { id: "s3", day: 2, time: "17:00", courseId: "phys", topic: "Electromagnetism", status: "upcoming" },
  { id: "s4", day: 3, time: "19:00", courseId: "dsa", topic: "Graph Traversal", status: "upcoming" },
  { id: "s5", day: 4, time: "16:30", courseId: "eng", topic: "Argumentative Essays", status: "upcoming" },
  { id: "s6", day: 5, time: "11:00", courseId: "calc", topic: "Infinite Series", status: "upcoming" },
  { id: "s7", day: 0, time: "20:00", courseId: "phys", topic: "Thermodynamics", status: "missed" },
];

const PLANS = [
  { id: "monthly", name: "Monthly", price: 249, cadence: "/ month", note: "Billed every month", recommended: false,
    features: ["Unlimited AI-generated questions", "Upload unlimited materials"] },
  { id: "semester", name: "Per Semester", price: 179, cadence: "/ month", note: "Billed once per semester — save 28%", recommended: true,
    features: ["Everything in Monthly", "Matches your actual term — no gaps", "Save 28% vs. monthly"] },
  { id: "annual", name: "Annual", price: 149, cadence: "/ month", note: "Billed yearly — best value", recommended: false,
    features: ["Everything in Per Semester", "Best per-month value"] },
];

const MOODS = [
  { id: "great", label: "Great", message: "Love it — let's keep today's full plan, maybe even add a bonus round." },
  { id: "okay", label: "Okay", message: "Sounds good. Today's plan stays as is — steady and manageable." },
  { id: "tired", label: "Tired", message: "Got it — I trimmed today's session to the essentials so it feels lighter." },
  { id: "stressed", label: "Overwhelmed", message: "Thanks for telling me. I moved the hardest topic to tomorrow — today's just a gentle review." },
];

const FEATURES = [
  { title: "Personalized daily plan", body: "Every session is built around what feels hardest, what's due soonest, and what you're forgetting fastest.", icon: IconCalendar },
  { title: "Adaptive practice questions", body: "Glow pulls questions straight from your own lecture slides and notes — not a generic question bank.", icon: IconBook },
  { title: "Mastery tracking", body: "See trendlines per topic, not just a single score, so you always know if you're improving or slipping.", icon: IconChart },
  { title: "Wellbeing check-ins", body: "Tell Glow how you're feeling and today's plan adjusts automatically — lighter when tired, gentler when stressed.", icon: IconUser },
];

const STEPS = [
  { title: "Upload your materials", body: "Slides, notes, or recordings for each course." },
  { title: "Tell us how you study", body: "Your best hours, your realistic hours, and what's competing for your time." },
  { title: "Get your plan, every day", body: "Short, focused sessions that adapt as your mastery and mood change." },
];

function courseById(id) { return COURSES.find((c) => c.id === id); }
function topicById(courseId, topicId) {
  const c = courseById(courseId);
  return c ? c.topics.find((t) => t.id === topicId) : null;
}

function courseTrend(course) {
  const len = course.topics[0].trend.length;
  return Array.from({ length: len }, (_, i) => Math.round(course.topics.reduce((a, t) => a + t.trend[i], 0) / course.topics.length));
}
function courseRising(course) {
  const trend = courseTrend(course);
  return trend[trend.length - 1] >= trend[0];
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);
  return isDesktop;
}

/* =========================================================================
   REUSABLE UI
   ========================================================================= */
function Sparkline({ data, color = "var(--blue)", width = 84, height = 34 }) {
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const areaPath = path + ` L${width},${height} L0,${height} Z`;
  const last = pts[pts.length - 1];
  const rising = data[data.length - 1] >= data[0];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={`grad-${color.replace(/[^a-zA-Z0-9]/g, "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={rising ? color : "var(--danger)"} stopOpacity="0.28" />
          <stop offset="100%" stopColor={rising ? color : "var(--danger)"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#grad-${color.replace(/[^a-zA-Z0-9]/g, "")})`} />
      <path d={path} fill="none" stroke={rising ? color : "var(--danger)"} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="3.4" fill={rising ? color : "var(--danger)"} />
    </svg>
  );
}

function RingProgress({ value, size = 64, stroke = 8, color = "var(--blue)", track = "rgba(20,39,90,0.08)", label }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset .5s ease" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <span style={{ fontFamily: "Marhey", fontWeight: 700, fontSize: size * 0.26, color: "var(--navy)", lineHeight: 1 }}>{value}%</span>
        {label && <span style={{ fontSize: 9, fontWeight: 700, color: "var(--ink-faint)", marginTop: 2 }}>{label}</span>}
      </div>
    </div>
  );
}

function TopBar({ streak, onAvatar, title, isDesktop }) {
  return (
    <div className="topbar">
      {title ? (
        <h3 className="section-title">{title}</h3>
      ) : isDesktop ? (
        <div />
      ) : (
        <Logo height={28} color="var(--navy)" oval="var(--navy)" face="var(--white)" />
      )}
      <div className="row" style={{ gap: 10 }}>
        <div className="streak-pill">
          <IconCoin /> {streak}
        </div>
        <button className="avatar-btn" onClick={onAvatar}>A</button>
      </div>
    </div>
  );
}

function SheetModal({ onClose, children }) {
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        {children}
      </div>
    </div>
  );
}

function ScreenHeader({ onBack, title, right }) {
  return (
    <div className="row between px" style={{ paddingTop: 20, paddingBottom: 6, flexShrink: 0 }}>
      <button className="avatar-btn" style={{ background: "var(--blue-pale)", color: "var(--navy)" }} onClick={onBack}>
        <IconBack />
      </button>
      <h3 className="section-title" style={{ fontSize: 18 }}>{title}</h3>
      <div style={{ width: 40 }}>{right}</div>
    </div>
  );
}

/* =========================================================================
   ONBOARDING
   ========================================================================= */
const STUDY_TIMES = ["Early morning", "Afternoon", "Evening", "Late night"];
const HOURS_OPTIONS = ["Under 1 hour", "1–2 hours", "2–4 hours", "4+ hours"];
const LIFE_CONTEXT = ["Part-time job", "Sports or activities", "Long commute", "Family responsibilities", "None of these"];

function Onboarding({ onDone, onSkip }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [studyTime, setStudyTime] = useState(null);
  const [hours, setHours] = useState(null);
  const [context, setContext] = useState([]);
  const total = 4;

  function toggleContext(item) {
    setContext((c) => {
      if (item === "None of these") return c.includes(item) ? [] : ["None of these"];
      const withoutNone = c.filter((x) => x !== "None of these");
      return withoutNone.includes(item) ? withoutNone.filter((x) => x !== item) : [...withoutNone, item];
    });
  }

  const canNext = [name.trim().length > 0, !!studyTime, !!hours, context.length > 0][step];

  function next() {
    if (step === total - 1) { onDone({ name: name.trim() || "Student", studyTime, hours, context }); return; }
    setStep((s) => s + 1);
  }

  return (
    <div className="screen">
      <div className="row between px" style={{ paddingTop: 24, flexShrink: 0 }}>
        <div className="dots">
          {Array.from({ length: total }).map((_, i) => <span key={i} className={"dot" + (i <= step ? " on" : "")} />)}
        </div>
        <button className="btn btn-ghost btn-sm" onClick={onSkip}>Skip to app</button>
      </div>

      <div className="scroll px" style={{ paddingTop: 26 }}>
        {step === 0 && (
          <div className="fade-item">
            <div className="row" style={{ gap: 12, alignItems: "flex-start" }}>
              <div className="chat-avatar"><Glow size={30} /></div>
              <div className="card chat-bubble">
                <h1 style={{ fontSize: 22, lineHeight: 1.2 }}>Hi, I'm Glow — what should I call you?</h1>
                <p className="section-sub" style={{ marginTop: 6 }}>I'll use this to personalize your study plan.</p>
                <div className="ar-hint">يلا نتعرف على أسلوبك في المذاكرة</div>
              </div>
            </div>
            <div style={{ marginTop: 22 }}>
              <input type="text" placeholder="Your first name" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="fade-item">
            <h1 style={{ fontSize: 24, lineHeight: 1.2 }}>When do you usually study best?</h1>
            <p className="section-sub" style={{ marginTop: 8 }}>We'll suggest sessions around this window.</p>
            <div className="ar-hint">إمتى بتركز أكتر؟</div>
            <div className="stack" style={{ gap: 10, marginTop: 22 }}>
              {STUDY_TIMES.map((opt) => (
                <button key={opt} className={"choice" + (studyTime === opt ? " selected" : "")} onClick={() => setStudyTime(opt)}>
                  <span className="box">{studyTime === opt && <IconCheck style={{ color: "#fff" }} />}</span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="fade-item">
            <h1 style={{ fontSize: 24, lineHeight: 1.2 }}>How many hours a day can you realistically study?</h1>
            <p className="section-sub" style={{ marginTop: 8 }}>Be honest — a realistic plan is one you'll actually follow.</p>
            <div className="stack" style={{ gap: 10, marginTop: 22 }}>
              {HOURS_OPTIONS.map((opt) => (
                <button key={opt} className={"choice" + (hours === opt ? " selected" : "")} onClick={() => setHours(opt)}>
                  <span className="box">{hours === opt && <IconCheck style={{ color: "#fff" }} />}</span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="fade-item">
            <h1 style={{ fontSize: 24, lineHeight: 1.2 }}>Anything else going on we should know?</h1>
            <p className="section-sub" style={{ marginTop: 8 }}>Pick all that apply — this helps us pace things kindly.</p>
            <div className="ar-hint">في حاجة تانية شاغلاك؟</div>
            <div className="stack" style={{ gap: 10, marginTop: 22 }}>
              {LIFE_CONTEXT.map((opt) => (
                <button key={opt} className={"choice" + (context.includes(opt) ? " selected" : "")} onClick={() => toggleContext(opt)}>
                  <span className="box">{context.includes(opt) && <IconCheck style={{ color: "#fff" }} />}</span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px" style={{ paddingBottom: 26, paddingTop: 14, flexShrink: 0 }}>
        <button className="btn btn-primary btn-block" disabled={!canNext} onClick={next}>
          {step === total - 1 ? "Continue" : "Next"} <IconChevron style={{ color: "#fff" }} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   UPLOAD MATERIALS
   ========================================================================= */
const UPLOAD_COLORS = ["#5B8DEF", "#14275A", "#1A56DB", "#3B74E8"];

function UploadMaterials({ onDone, onSkip, isDesktop }) {
  const [files, setFiles] = useState({
    dsa: [{ name: "Lecture 4 – Graphs.pdf", size: "2.1 MB" }, { name: "Recitation notes.docx", size: "340 KB" }],
    calc: [{ name: "Series convergence slides.pdf", size: "1.8 MB" }],
    phys: [],
    eng: [{ name: "Essay rubric.pdf", size: "210 KB" }],
  });
  const [extraCourses, setExtraCourses] = useState([]);
  const [addingCourse, setAddingCourse] = useState(false);
  const [newCourseName, setNewCourseName] = useState("");
  const allCourses = [...COURSES, ...extraCourses];
  const [activeCourse, setActiveCourse] = useState(allCourses[0].id);
  const [uploading, setUploading] = useState(null); // { courseId, name, size, progress }
  const fileNamesPool = ["Chapter scan.pdf", "Lecture recording notes.txt", "Slides – week 6.pptx", "Practice sheet.pdf", "Summary.docx"];

  function simulateUpload(courseId) {
    if (uploading) return;
    const pool = fileNamesPool[(files[courseId]?.length || 0) % fileNamesPool.length];
    const size = (0.3 + Math.random() * 2.4).toFixed(1) + " MB";
    const entry = { courseId, name: pool, size, progress: 4 };
    setUploading(entry);
    const timer = setInterval(() => {
      setUploading((u) => {
        if (!u) { clearInterval(timer); return u; }
        const next = Math.min(100, u.progress + 12 + Math.random() * 10);
        if (next >= 100) {
          clearInterval(timer);
          setFiles((f) => ({ ...f, [courseId]: [...(f[courseId] || []), { name: u.name, size: u.size }] }));
          return null;
        }
        return { ...u, progress: next };
      });
    }, 160);
  }

  function addCourse() {
    const name = newCourseName.trim();
    if (!name) return;
    const id = "custom-" + Date.now();
    setExtraCourses((c) => [...c, { id, name, code: "Added course", color: UPLOAD_COLORS[c.length % UPLOAD_COLORS.length] }]);
    setFiles((f) => ({ ...f, [id]: [] }));
    setActiveCourse(id);
    setNewCourseName("");
    setAddingCourse(false);
  }

  const totalFiles = Object.values(files).reduce((a, l) => a + l.length, 0);
  const course = allCourses.find((c) => c.id === activeCourse) || allCourses[0];
  const courseFiles = files[course.id] || [];
  const isUploadingHere = uploading && uploading.courseId === course.id;

  const dropZone = (
    <button className="drop-zone" onClick={() => simulateUpload(course.id)} disabled={!!uploading}>
      <div className="drop-icon"><IconUpload /></div>
      <div style={{ fontWeight: 700, fontSize: 14.5 }}>Drag files here, or tap to upload</div>
      <div style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 600 }}>Slides, notes, recordings — PDF, PPTX, MP3</div>
      <div className="ar-hint">اسحب ملفاتك أو دوس هنا عشان ترفعها</div>
    </button>
  );

  const fileList = (
    <div className="stack" style={{ gap: 8, marginTop: 14 }}>
      <div style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 700 }}>{course.name} · {courseFiles.length} file{courseFiles.length === 1 ? "" : "s"}</div>
      {courseFiles.map((f, i) => (
        <div key={i} className="row between fade-item" style={{ padding: "10px 2px", borderBottom: "1px solid var(--line)" }}>
          <div className="row" style={{ gap: 8, minWidth: 0 }}>
            <IconFile style={{ color: "var(--blue)", flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
              <div style={{ fontSize: 11, color: "var(--ink-faint)", fontWeight: 700 }}>{f.size} · Ready</div>
            </div>
          </div>
          <IconCheck className="file-status-ready" />
        </div>
      ))}
      {isUploadingHere && (
        <div className="fade-item" style={{ padding: "10px 2px" }}>
          <div className="row between">
            <div className="row" style={{ gap: 8, minWidth: 0 }}>
              <IconFile style={{ color: "var(--ink-faint)", flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{uploading.name}</div>
                <div style={{ fontSize: 11, color: "var(--ink-faint)", fontWeight: 700 }}>Uploading — {Math.round(uploading.progress)}%</div>
              </div>
            </div>
          </div>
          <div className="file-progress-track"><div className="file-progress-fill" style={{ width: uploading.progress + "%" }} /></div>
        </div>
      )}
      {courseFiles.length === 0 && !isUploadingHere && (
        <div style={{ fontSize: 12.5, color: "var(--ink-faint)", fontWeight: 600, padding: "6px 2px" }}>No materials yet</div>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <div className="screen">
        <div className="px" style={{ paddingTop: 4, flexShrink: 0 }}>
          <h1 style={{ fontSize: 25 }}>Upload materials</h1>
          <div className="ar-hint" style={{ marginTop: -4 }}>اسحب ملفاتك أو دوس هنا عشان ترفعها</div>
        </div>
        <div className="px" style={{ marginTop: 20, display: "grid", gridTemplateColumns: "200px 1fr", gap: 24 }}>
          <div className="stack" style={{ gap: 2 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-faint)", padding: "0 12px 6px" }}>COURSES</div>
            {allCourses.map((c) => (
              <button key={c.id} className={"course-list-item" + (activeCourse === c.id ? " active" : "")} onClick={() => setActiveCourse(c.id)}>
                {c.name}
              </button>
            ))}
            {addingCourse ? (
              <div className="row" style={{ gap: 6, padding: "8px 10px" }}>
                <input type="text" placeholder="Course name" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} autoFocus style={{ fontSize: 13, padding: "8px 10px" }} />
                <button className="btn btn-primary btn-sm" onClick={addCourse}>Add</button>
              </div>
            ) : (
              <button className="course-list-item" style={{ color: "var(--blue)" }} onClick={() => setAddingCourse(true)}><IconPlus style={{ width: 14, height: 14 }} /> Add course</button>
            )}
          </div>
          <div>
            {dropZone}
            {fileList}
          </div>
        </div>
        <div className="px" style={{ paddingTop: 22, paddingBottom: 4 }}>
          <button className="btn btn-primary" onClick={onDone} disabled={totalFiles === 0}>
            Continue with {totalFiles} file{totalFiles === 1 ? "" : "s"} <IconChevron style={{ color: "#fff" }} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="px" style={{ paddingTop: 24, flexShrink: 0 }}>
        <div className="chip muted">Step 2 of 3</div>
        <h1 style={{ fontSize: 25, marginTop: 12 }}>Add your course materials</h1>
        <p className="section-sub" style={{ marginTop: 6 }}>Slides, notes or recordings — Glow builds your questions straight from these.</p>
      </div>
      <div className="scroll px" style={{ marginTop: 18 }}>
        <div className="row" style={{ gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {allCourses.map((c) => (
            <button key={c.id} className={"course-tab" + (activeCourse === c.id ? " active" : "")} onClick={() => setActiveCourse(c.id)}>
              {c.name}
            </button>
          ))}
          {addingCourse ? (
            <input type="text" placeholder="Course name" value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} onBlur={addCourse} onKeyDown={(e) => e.key === "Enter" && addCourse()} autoFocus style={{ fontSize: 13, padding: "6px 10px", width: 130, flexShrink: 0 }} />
          ) : (
            <button className="course-tab" onClick={() => setAddingCourse(true)}><IconPlus style={{ width: 12, height: 12 }} /> Add course</button>
          )}
        </div>
        <div style={{ marginTop: 16 }}>
          {dropZone}
          {fileList}
        </div>
      </div>
      <div className="px row between" style={{ paddingBottom: 26, paddingTop: 14, flexShrink: 0, gap: 10 }}>
        <button className="btn btn-outline" onClick={onSkip}>Skip</button>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={onDone} disabled={totalFiles === 0}>
          Continue with {totalFiles} file{totalFiles === 1 ? "" : "s"} <IconChevron style={{ color: "#fff" }} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   PRIORITIZATION CHECK-IN
   ========================================================================= */
function Prioritization({ onDone }) {
  const [choice, setChoice] = useState(null);
  const [urgentPick, setUrgentPick] = useState(null);
  const [step, setStep] = useState(0);

  return (
    <div className="screen">
      <div className="px" style={{ paddingTop: 24, flexShrink: 0 }}>
        <div className="chip muted">Step 3 of 3</div>
      </div>
      <div className="scroll px" style={{ marginTop: 10 }}>
        {step === 0 && (
          <div className="fade-item">
            <div className="row" style={{ gap: 12, alignItems: "flex-start" }}>
              <div className="chat-avatar"><Glow size={30} mood="calm" /></div>
              <div className="card chat-bubble">
                <h1 style={{ fontSize: 20, lineHeight: 1.25 }}>When you sit down to study, what usually decides what you tackle first?</h1>
                <div className="ar-hint">إيه اللي حاسس إنه أهم دلوقتي؟</div>
              </div>
            </div>
            <div className="stack" style={{ gap: 10, marginTop: 20 }}>
              {PRIORITIES.map((p) => (
                <button key={p.id} className={"choice" + (choice === p.id ? " selected" : "")} onClick={() => setChoice(p.id)} style={{ alignItems: "flex-start" }}>
                  <span className="box" style={{ marginTop: 2 }}>{choice === p.id && <IconCheck style={{ color: "#fff" }} />}</span>
                  <span>
                    <div>{p.label}</div>
                    <div style={{ fontWeight: 500, fontSize: 12.5, color: "var(--ink-faint)", marginTop: 2 }}>{p.sub}</div>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="fade-item">
            <h1 style={{ fontSize: 24, lineHeight: 1.2 }}>Right now, which topic worries you the most?</h1>
            <p className="section-sub" style={{ marginTop: 8 }}>We'll make sure it shows up early in your plan.</p>
            <div className="ar-hint">إيه اللي حاسس إنه أهم دلوقتي؟</div>
            <div className="stack" style={{ gap: 10, marginTop: 20 }}>
              {COURSES.flatMap((c) => c.topics.map((t) => ({ ...t, courseName: c.name, courseId: c.id }))).slice(0, 5).map((t) => (
                <button key={t.id} className={"choice" + (urgentPick === t.id ? " selected" : "")} onClick={() => setUrgentPick(t.id)}>
                  <span className="box">{urgentPick === t.id && <IconCheck style={{ color: "#fff" }} />}</span>
                  <span>
                    <div>{t.name}</div>
                    <div style={{ fontWeight: 500, fontSize: 12, color: "var(--ink-faint)" }}>{t.courseName}</div>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="px" style={{ paddingBottom: 26, paddingTop: 14, flexShrink: 0 }}>
        <button
          className="btn btn-primary btn-block"
          disabled={step === 0 ? !choice : !urgentPick}
          onClick={() => (step === 0 ? setStep(1) : onDone({ priority: choice, urgentTopic: urgentPick }))}
        >
          {step === 0 ? "Next" : "Build my plan"} <IconChevron style={{ color: "#fff" }} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   HOME / DASHBOARD
   ========================================================================= */
function ThisWeekWidget({ sessions, onOpenSchedule }) {
  const upcoming = sessions.filter((s) => s.status !== "moved").slice(0, 3);
  return (
    <div className="week-widget">
      <h3 className="section-title" style={{ fontSize: 15 }}>This week</h3>
      <div className="ar-hint" style={{ marginBottom: 4 }}>جدولك الأسبوعي</div>
      {upcoming.map((s) => {
        const c = courseById(s.courseId);
        return (
          <div key={s.id} className="week-widget-row row" style={{ gap: 10 }}>
            <div style={{ width: 5, height: 30, borderRadius: 3, background: c.color, flexShrink: 0 }} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{s.topic}</div>
              <div style={{ fontSize: 11.5, color: "var(--ink-faint)", fontWeight: 600 }}>
                {WEEK_DAYS[s.day]} · {s.time}{s.rescheduledNote ? ` · ${s.rescheduledNote}` : ""}
              </div>
            </div>
          </div>
        );
      })}
      <button className="btn btn-ghost btn-sm btn-block" style={{ marginTop: 12 }} onClick={onOpenSchedule}>View full schedule</button>
    </div>
  );
}

function Home({ user, streak, plan, moodState, isDesktop, sessions, onOpenWellbeing, onStartSession, onOpenCourse, onOpenSchedule, onOpenProfile }) {
  const overall = Math.round(COURSES.reduce((a, c) => a + c.progress, 0) / COURSES.length);
  const mood = MOODS.find((m) => m.id === moodState);

  const body = (
    <div style={{ minWidth: 0 }}>
      <div style={{ marginTop: 4 }}>
        <h1 style={{ fontSize: 24 }}>Hey {user.name} {"\u{1F44B}"}</h1>
        <div className="ar-hint">مساء الخير، {user.name}</div>
        <p className="section-sub" style={{ marginTop: 4 }}>
          {mood ? mood.message : "How are you feeling about studying today?"}
        </p>
      </div>

      {!moodState && (
        <button className="card fade-item" onClick={onOpenWellbeing} style={{ marginTop: 16, padding: 14, width: "100%", textAlign: "left", border: "1.5px solid var(--blue-pale)" }}>
          <div className="row between">
            <div className="row" style={{ gap: 12 }}>
              <Glow size={44} mood="calm" />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>Quick check-in</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)", fontWeight: 600 }}>How are you feeling today?</div>
              </div>
            </div>
            <IconChevron style={{ color: "var(--ink-faint)" }} />
          </div>
        </button>
      )}

      <div className="row between" style={{ marginTop: 22 }}>
        <h3 className="section-title" style={{ fontSize: 17 }}>Today's plan</h3>
        <span className="chip">{plan.reduce((a, p) => a + p.minutes, 0)} min total</span>
      </div>
      <div className="ar-hint">خطتك النهارده</div>
      <div className={"stack" + (isDesktop ? " grid-cards" : "")} style={{ gap: 10, marginTop: 12 }}>
        {plan.map((item, i) => {
          const c = courseById(item.courseId);
          const t = topicById(item.courseId, item.topicId);
          return (
            <div key={i} className="card fade-item" style={{ padding: 14, width: "100%" }}>
              <div className="row between">
                <div className="row" style={{ gap: 12, minWidth: 0 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: c.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Marhey", fontSize: 15 }}>
                    {c.name[0]}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 600 }}>{item.minutes} min · {item.reason}</div>
                  </div>
                </div>
                <button className={"btn btn-sm " + (i === 0 ? "btn-primary" : "btn-outline")} style={{ flexShrink: 0 }} onClick={() => onStartSession(item.courseId, item.topicId)}>
                  Start
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="row between" style={{ marginTop: 24 }}>
        <h3 className="section-title" style={{ fontSize: 17 }}>Your courses</h3>
        <button className="chip" style={{ border: "none" }} onClick={onOpenCourse}>See all</button>
      </div>
      <div className="ar-hint">كورساتك</div>
      <div className={"stack" + (isDesktop ? " grid-cards" : "")} style={{ gap: 10, marginTop: 12, marginBottom: 6 }}>
        {COURSES.map((c) => {
          const rising = courseRising(c);
          return (
            <button key={c.id} className="card fade-item row" style={{ padding: 14, width: "100%", textAlign: "left", gap: 14 }} onClick={() => onOpenCourse(c.id)}>
              <RingProgress value={c.progress} size={50} stroke={6} color={c.color} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>{c.name}</div>
                <div className={rising ? "trend-up" : "trend-down"}>
                  {rising ? <IconTrendUp /> : <IconTrendDown />} {rising ? "rising" : "needs focus"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <TopBar streak={streak} onAvatar={onOpenProfile} isDesktop={isDesktop} />
      <div className="scroll px" style={{ paddingBottom: 18 }}>
        {isDesktop ? (
          <div className="home-desktop-grid">
            {body}
            <ThisWeekWidget sessions={sessions} onOpenSchedule={onOpenSchedule} />
          </div>
        ) : body}
      </div>
    </>
  );
}

/* =========================================================================
   STUDY SESSION
   ========================================================================= */
function StudySession({ courseId, topicId, isDesktop, onExit, onComplete }) {
  const course = courseById(courseId);
  const topic = topicById(courseId, topicId);
  const questions = QUESTION_BANK[topicId] || [];
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState(null);
  const [written, setWritten] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [moreDetail, setMoreDetail] = useState(false);

  const q = questions[qi];
  const progressPct = Math.round((qi / questions.length) * 100);

  function submit() {
    if (q.type === "mcq") {
      if (selected === q.correct) setCorrectCount((n) => n + 1);
    } else {
      setCorrectCount((n) => n + 1);
    }
    setRevealed(true);
  }

  function nextQ() {
    if (qi + 1 >= questions.length) {
      setFinished(true);
      return;
    }
    setQi((n) => n + 1);
    setSelected(null);
    setWritten("");
    setRevealed(false);
    setMoreDetail(false);
  }

  if (finished) {
    const scorePct = Math.round((correctCount / questions.length) * 100);
    const newMastery = Math.min(100, topic.mastery + Math.round(scorePct / 12));
    return (
      <div className="screen">
        <div className="scroll px stack" style={{ alignItems: "center", textAlign: "center", paddingTop: 60, gap: 6 }}>
          <Glow size={110} mood={scorePct >= 60 ? "happy" : "calm"} />
          <h1 style={{ fontSize: 24, marginTop: 14 }}>Nice work, session complete!</h1>
          <p className="section-sub">{correctCount} of {questions.length} correct · {topic.name}</p>
          <div className="card" style={{ width: "100%", marginTop: 22, padding: 20 }}>
            <div className="row between">
              <span style={{ fontWeight: 700, fontSize: 14 }}>Mastery</span>
              <span style={{ fontWeight: 700, color: "var(--good)" }}>{topic.mastery}% → {newMastery}%</span>
            </div>
            <div className="progress-track" style={{ marginTop: 10 }}>
              <div className="progress-fill" style={{ width: newMastery + "%", background: "var(--good)" }} />
            </div>
          </div>
          <div className="chip gold" style={{ marginTop: 16 }}><IconCoin /> +{questions.length * 5} coins earned</div>
        </div>
        <div className="px" style={{ paddingBottom: 26, paddingTop: 14, flexShrink: 0 }}>
          <button className="btn btn-primary btn-block" onClick={() => onComplete(topicId, newMastery)}>Back to plan</button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <ScreenHeader onBack={onExit} title={topic.name} />
      <div className="px" style={{ flexShrink: 0, marginTop: 6 }}>
        <div className="progress-track"><div className="progress-fill" style={{ width: progressPct + "%", background: course.color }} /></div>
        <div className="row between" style={{ marginTop: 6 }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink-faint)" }}>Question {qi + 1} of {questions.length}</span>
          <span className="chip muted" style={{ fontSize: 11 }}>{course.name}</span>
        </div>
      </div>

      <div className="scroll px" style={{ marginTop: 18 }}>
        <div className={isDesktop ? "row" : undefined} style={{ gap: 24, alignItems: "flex-start" }}>
          <div className="fade-item" key={qi} style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontSize: 19, lineHeight: 1.35, fontFamily: "Quicksand", fontWeight: 700 }}>{q.prompt}</h2>

            {q.type === "mcq" ? (
              <div className="stack" style={{ gap: 10, marginTop: 18 }}>
                {q.choices.map((choice, i) => {
                  let state = "";
                  if (revealed) {
                    if (i === q.correct) state = " selected";
                    else if (i === selected) state = " wrong";
                  }
                  return (
                    <button
                      key={i}
                      className={"choice" + (selected === i && !revealed ? " selected" : "")}
                      style={revealed && i === q.correct ? { borderColor: "var(--good)", background: "rgba(26,157,108,0.1)" } : revealed && i === selected && i !== q.correct ? { borderColor: "var(--danger)", background: "rgba(214,69,69,0.08)" } : {}}
                      onClick={() => !revealed && setSelected(i)}
                      disabled={revealed}
                    >
                      <span className="box" style={revealed && i === q.correct ? { background: "var(--good)", borderColor: "var(--good)" } : revealed && i === selected && i !== q.correct ? { background: "var(--danger)", borderColor: "var(--danger)" } : {}}>
                        {revealed && i === q.correct && <IconCheck style={{ color: "#fff" }} />}
                        {revealed && i === selected && i !== q.correct && <IconClose style={{ color: "#fff" }} />}
                      </span>
                      {choice}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div style={{ marginTop: 18 }}>
                <textarea placeholder="Type your answer…" value={written} onChange={(e) => setWritten(e.target.value)} disabled={revealed} rows={4} />
              </div>
            )}

            {revealed && (
              <div className="card fade-item" style={{ marginTop: 18, padding: 16, background: "var(--blue-pale)", border: "none" }}>
                <div className="row" style={{ gap: 8, marginBottom: 6 }}>
                  <Glow size={26} />
                  <span style={{ fontWeight: 700, fontSize: 13, color: "var(--blue)" }}>Let's break it down</span>
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--navy)" }}>{q.explain}</p>
                {moreDetail && (
                  <p className="fade-item" style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--navy)", marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(20,39,90,0.12)" }}>
                    Want to revisit this? It's covered in {q.source ? `${q.source.file} — slide ${q.source.slide}` : "your uploaded materials"} for {topic.name}.
                  </p>
                )}
                <div className="row" style={{ gap: 10, marginTop: 14 }}>
                  <button className="btn btn-primary btn-sm" onClick={nextQ}>Got it</button>
                  {!moreDetail && <button className="btn btn-ghost btn-sm" onClick={() => setMoreDetail(true)}>More detail</button>}
                </div>
              </div>
            )}
          </div>

          {isDesktop && q.source && (
            <div className="source-panel fade-item" style={{ width: 280, flexShrink: 0 }}>
              <div className="source-label">From {q.source.file} — slide {q.source.slide}</div>
              <div className="source-thumb" />
            </div>
          )}
        </div>
      </div>

      <div className="px" style={{ paddingBottom: 26, paddingTop: 14, flexShrink: 0 }}>
        {!revealed && (
          <button className="btn btn-primary btn-block" disabled={q.type === "mcq" ? selected === null : written.trim().length === 0} onClick={submit}>
            Check answer
          </button>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   PROGRESS / MASTERY
   ========================================================================= */
function ProgressView({ streak, isDesktop, onOpenProfile, onStartSession }) {
  const [courseFilter, setCourseFilter] = useState("all");
  const allTopics = COURSES.flatMap((c) => c.topics.map((t) => ({ ...t, courseId: c.id, courseName: c.name, color: c.color })));
  const shown = courseFilter === "all" ? allTopics : allTopics.filter((t) => t.courseId === courseFilter);
  const risingCount = allTopics.filter((t) => t.trend[t.trend.length - 1] >= t.trend[0]).length;
  const topCourse = COURSES.reduce((a, c) => (c.progress > a.progress ? c : a), COURSES[0]);
  const topTrend = courseTrend(topCourse);
  const topChangePct = topTrend[0] === 0 ? 0 : Math.round(((topTrend[topTrend.length - 1] - topTrend[0]) / topTrend[0]) * 100);
  const topRising = topChangePct >= 0;

  return (
    <>
      <TopBar streak={streak} onAvatar={onOpenProfile} title="Progress" />
      <div className="scroll px">
        <div className="ar-hint" style={{ marginTop: -2 }}>تقدمك في المواد</div>

        <div className="card hero-chart-card fade-item" style={{ marginTop: 12 }}>
          <div className="row between">
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{topCourse.name}</div>
              <div className={topRising ? "trend-up" : "trend-down"} style={{ marginTop: 4 }}>
                {topRising ? <IconTrendUp /> : <IconTrendDown />} {topRising ? "up" : "down"} {Math.abs(topChangePct)}% this week — {topRising ? "trending well" : "needs focus"}
              </div>
            </div>
            <div style={{ fontFamily: "Marhey", fontWeight: 700, fontSize: 24, color: topCourse.color }}>{topCourse.progress}%</div>
          </div>
          <div className="hero-chart-wrap">
            <Sparkline data={topTrend} color={topCourse.color} width={560} height={100} />
          </div>
          <div className="hero-chart-dates"><span>6 weeks ago</span><span>Today</span></div>
        </div>

        <div className="row" style={{ gap: 14, marginTop: 20 }}>
          <RingProgress value={Math.round(allTopics.reduce((a, t) => a + t.mastery, 0) / allTopics.length)} size={78} label="MASTERY" />
          <div className="stack" style={{ gap: 6 }}>
            <span className="chip good"><IconChart /> {risingCount} of {allTopics.length} topics trending up</span>
            <span className="section-sub">Trend matters more than any single score — keep an eye on direction.</span>
          </div>
        </div>

        <div className="row" style={{ gap: 8, marginTop: 20, overflowX: "auto", paddingBottom: 4 }}>
          <button className={"chip" + (courseFilter === "all" ? "" : " muted")} style={{ border: "none" }} onClick={() => setCourseFilter("all")}>All</button>
          {COURSES.map((c) => (
            <button key={c.id} className={"chip" + (courseFilter === c.id ? "" : " muted")} style={{ border: "none", whiteSpace: "nowrap" }} onClick={() => setCourseFilter(c.id)}>{c.name}</button>
          ))}
        </div>

        <div className={"stack" + (isDesktop ? " grid-cards" : "")} style={{ gap: 10, marginTop: 16, marginBottom: 10 }}>
          {shown.map((t) => {
            const rising = t.trend[t.trend.length - 1] >= t.trend[0];
            return (
              <button key={t.courseId + t.id} className="card fade-item" style={{ padding: 14, width: "100%", textAlign: "left" }} onClick={() => onStartSession(t.courseId, t.id)}>
                <div className="row between">
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14.5 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 600, marginTop: 2 }}>{t.courseName}</div>
                    <div className={"chip " + (rising ? "good" : "warn")} style={{ marginTop: 8 }}>
                      {rising ? "Trending up" : "Needs attention"} · {t.mastery}%
                    </div>
                  </div>
                  <Sparkline data={t.trend} color={t.color} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* =========================================================================
   SCHEDULE
   ========================================================================= */
const DAY_NUMS = [22, 23, 24, 25, 26, 27, 28];

function SessionCard({ s, onReschedule }) {
  const c = courseById(s.courseId);
  return (
    <div className={"card" + (s.status === "moved" ? " session-moved" : "")} style={{ padding: 13 }}>
      <div className="row between">
        <div className="row" style={{ gap: 10, minWidth: 0 }}>
          <div style={{ width: 6, height: 34, borderRadius: 4, background: c.color, flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <div className="session-title" style={{ fontWeight: 700, fontSize: 13.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.topic}</div>
            <div style={{ fontSize: 11.5, color: "var(--ink-faint)", fontWeight: 600 }}>
              {s.status === "moved" ? `was ${s.time}` : `${c.code} · ${s.time}`}
            </div>
          </div>
        </div>
        {s.status === "done" && <span className="chip good" style={{ flexShrink: 0 }}><IconCheck />Done</span>}
        {s.status === "upcoming" && <span className="chip muted" style={{ flexShrink: 0 }}><IconClock />{s.rescheduledNote || "Planned"}</span>}
        {s.status === "missed" && <span className="chip warn" style={{ flexShrink: 0 }}>Missed</span>}
      </div>
      {s.status === "missed" && (
        <button className="btn btn-ghost btn-sm btn-block" style={{ marginTop: 10 }} onClick={() => onReschedule(s)}>
          Reschedule it
        </button>
      )}
    </div>
  );
}

function Schedule({ streak, isDesktop, onOpenProfile, sessions, onReschedule }) {
  const [note, setNote] = useState(null);
  const todayIdx = 2; // fixed "today" (Wed) for a believable demo snapshot

  function reschedule(s) {
    onReschedule(s.id);
    setNote(`Moved "${s.topic}" to ${WEEK_DAYS[(s.day + 1) % 7]} — same time, no penalty.`);
    setTimeout(() => setNote(null), 3400);
  }

  return (
    <>
      <TopBar streak={streak} onAvatar={onOpenProfile} title="Schedule" />
      <div className="scroll px" style={{ paddingBottom: 10 }}>
        <p className="section-sub" style={{ marginTop: 2 }}>Miss a session and we reshape the week around it — nothing lost, just moved.</p>
        <div className="ar-hint">جدولك الأسبوعي</div>

        <div className="day-strip">
          {WEEK_DAYS.map((day, di) => (
            <div key={di} className={"day-strip-cell" + (di === todayIdx ? " today" : "")}>
              {day.slice(0, 1)}
              <span className="day-num">{DAY_NUMS[di]}</span>
            </div>
          ))}
        </div>

        {note && (
          <div className="card fade-item" style={{ marginTop: 14, padding: "12px 14px", background: "var(--blue-pale)", border: "none" }}>
            <div className="row" style={{ gap: 8 }}>
              <IconCheck style={{ color: "var(--blue)" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--blue)" }}>{note}</span>
            </div>
          </div>
        )}

        {isDesktop ? (
          <div className="schedule-grid">
            {WEEK_DAYS.map((day, di) => {
              const items = sessions.filter((s) => s.day === di).sort((a, b) => a.time.localeCompare(b.time));
              return (
                <div key={di} className={"schedule-col" + (di === todayIdx ? " today" : "")}>
                  <div className="schedule-col-head">{day}<span className="day-num">{DAY_NUMS[di]}</span></div>
                  <div className="stack" style={{ gap: 8, marginTop: 8 }}>
                    {items.map((s) => <SessionCard key={s.id} s={s} onReschedule={reschedule} />)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="stack" style={{ gap: 16, marginTop: 16, marginBottom: 8 }}>
            {WEEK_DAYS.map((day, di) => {
              const items = sessions.filter((s) => s.day === di).sort((a, b) => a.time.localeCompare(b.time));
              if (items.length === 0) return null;
              return (
                <div key={di}>
                  <div className="row" style={{ gap: 8, marginBottom: 8 }}>
                    <span style={{ fontFamily: "Marhey", fontWeight: 700, fontSize: 14 }}>{day}</span>
                    {di === todayIdx && <span className="chip" style={{ fontSize: 10 }}>TODAY</span>}
                  </div>
                  <div className="stack" style={{ gap: 8 }}>
                    {items.map((s) => <SessionCard key={s.id} s={s} onReschedule={reschedule} />)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button className="btn btn-outline btn-block" style={{ marginTop: 16, marginBottom: 8 }}>+ Add a session</button>
      </div>
    </>
  );
}

/* =========================================================================
   WELLBEING CHECK-IN (modal)
   ========================================================================= */
function WellbeingCheckin({ onClose, onSelect, getPreviewPlan }) {
  const [picked, setPicked] = useState(null);
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    const mood = MOODS.find((m) => m.id === picked);
    const preview = getPreviewPlan(picked);
    const isLight = picked === "tired" || picked === "stressed";
    return (
      <SheetModal onClose={onClose}>
        <div className="px" style={{ paddingTop: 6, paddingBottom: 28, textAlign: "center" }}>
          <button className="avatar-btn" style={{ width: 34, height: 34, background: "var(--blue-pale)", color: "var(--navy)", marginLeft: "auto" }} onClick={onClose}><IconClose /></button>
          <MoodFace mood={picked} size={64} style={{ color: "var(--blue)", margin: "8px auto 0" }} />
          <h2 style={{ fontSize: 20, marginTop: 14 }}>{isLight ? "Let's keep today light." : "Sounds good — let's get started."}</h2>
          <p className="section-sub" style={{ marginTop: 6 }}>{mood.message}</p>
          {preview[0] && (
            <div className="card" style={{ marginTop: 18, padding: 14, textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{topicById(preview[0].courseId, preview[0].topicId).name}</div>
              <div style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 600, marginTop: 2 }}>{preview[0].minutes} min · {isLight ? "lighter pace" : "full session"}</div>
            </div>
          )}
          <button className="btn btn-primary btn-block" style={{ marginTop: 20 }} onClick={() => onSelect(picked, false)}>
            Start {isLight ? "light" : "full"} session
          </button>
          {isLight && (
            <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }} onClick={() => onSelect(picked, true)}>
              I'd rather do the full session
            </button>
          )}
        </div>
      </SheetModal>
    );
  }

  return (
    <SheetModal onClose={onClose}>
      <div className="px" style={{ paddingTop: 6, paddingBottom: 28 }}>
        <div className="row between" style={{ marginTop: 4 }}>
          <span className="chip muted">Wellbeing check-in</span>
          <button className="avatar-btn" style={{ width: 34, height: 34, background: "var(--blue-pale)", color: "var(--navy)" }} onClick={onClose}><IconClose /></button>
        </div>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <h2 style={{ fontSize: 19 }}>How are you feeling today?</h2>
          <div className="ar-hint" style={{ textAlign: "center" }}>حاسس بإيه النهارده؟</div>
        </div>
        <div className="row" style={{ marginTop: 22 }}>
          {MOODS.map((m) => (
            <button key={m.id} className={"mood-face-btn" + (picked === m.id ? " selected" : "")} onClick={() => setPicked(m.id)}>
              <div className="mood-face" style={{ color: picked === m.id ? "var(--blue)" : "var(--ink-faint)" }}>
                <MoodFace mood={m.id} />
              </div>
              <span className="mood-label">{m.label}</span>
            </button>
          ))}
        </div>
        <button className="btn btn-primary btn-block" style={{ marginTop: 24 }} disabled={!picked} onClick={() => setConfirming(true)}>
          Share with Glow
        </button>
      </div>
    </SheetModal>
  );
}

/* =========================================================================
   PRICING
   ========================================================================= */
function Pricing({ onBack, currentPlan, onSubscribe }) {
  const [selected, setSelected] = useState(currentPlan || "semester");
  const [confirmed, setConfirmed] = useState(null);

  if (confirmed) {
    const p = PLANS.find((x) => x.id === confirmed);
    return (
      <div className="screen">
        <ScreenHeader onBack={onBack} title="Subscription" />
        <div className="scroll px stack" style={{ alignItems: "center", textAlign: "center", paddingTop: 50, gap: 8 }}>
          <Glow size={100} />
          <h1 style={{ fontSize: 23, marginTop: 10 }}>You're on the {p.name} plan</h1>
          <p className="section-sub">EGP {p.price} {p.cadence} · {p.note}</p>
          <button className="btn btn-outline" style={{ marginTop: 20 }} onClick={onBack}>Back to profile</button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <ScreenHeader onBack={onBack} title="Choose your plan" />
      <div className="scroll px" style={{ marginTop: 8 }}>
        <p className="section-sub">Pick what works for your semester.</p>
        <div className="ar-hint">اختار الخطة اللي تناسبك</div>
        <div className="stack" style={{ gap: 12, marginTop: 18, marginBottom: 8 }}>
          {PLANS.map((p) => (
            <button
              key={p.id}
              className="card fade-item"
              style={{
                padding: 18, textAlign: "left", width: "100%", position: "relative",
                border: selected === p.id ? "2px solid var(--blue)" : "1px solid rgba(20,39,90,0.05)",
              }}
              onClick={() => setSelected(p.id)}
            >
              {p.recommended && (
                <span className="chip gold" style={{ position: "absolute", top: -11, left: 16 }}>MOST POPULAR</span>
              )}
              <div className="row between">
                <div>
                  <div style={{ fontFamily: "Marhey", fontWeight: 700, fontSize: 17 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 600, marginTop: 2 }}>{p.note}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "Marhey", fontWeight: 700, fontSize: 20, color: "var(--blue)" }}>EGP {p.price}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-faint)", fontWeight: 700 }}>{p.cadence}</div>
                </div>
              </div>
              <ul className="plan-features">
                {p.features.map((f) => (
                  <li key={f}><IconCheck />{f}</li>
                ))}
              </ul>
            </button>
          ))}
        </div>
        <p className="section-sub" style={{ textAlign: "center", marginBottom: 12 }}>Cancel anytime. Prices shown are placeholders.</p>
      </div>
      <div className="px" style={{ paddingBottom: 26, paddingTop: 14, flexShrink: 0 }}>
        <button className="btn btn-primary btn-block" onClick={() => { onSubscribe(selected); setConfirmed(selected); }}>
          Subscribe — EGP {PLANS.find((p) => p.id === selected).price}{PLANS.find((p) => p.id === selected).cadence}
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   PROFILE / SETTINGS
   ========================================================================= */
function Profile({ user, onBack, plan, onOpenPricing, connected, onToggleConnected, notifs, onToggleNotif, pacing, onSetPacing, sessionLength, onSetSessionLength, onRestart, onExitToLanding }) {
  const connectedCourses = COURSES.filter((c) => connected[c.id] !== false);
  const disconnectedCourses = COURSES.filter((c) => connected[c.id] === false);
  return (
    <>
      <ScreenHeader onBack={onBack} title="Profile" />
      <div className="scroll px" style={{ marginTop: 4 }}>
        <div className="row" style={{ gap: 14, marginTop: 6 }}>
          <div className="avatar-btn" style={{ width: 58, height: 58, fontSize: 22 }}>{user.name[0]}</div>
          <div>
            <div style={{ fontFamily: "Marhey", fontWeight: 700, fontSize: 18 }}>{user.name}</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-faint)", fontWeight: 600 }}>Cairo University · Computer Engineering</div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20, padding: 16 }}>
          <div className="row between">
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>Subscription</div>
              <div style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 600, marginTop: 2 }}>
                {PLANS.find((p) => p.id === plan)?.name || "Free"} plan
              </div>
            </div>
            <button className="btn btn-gold btn-sm" onClick={onOpenPricing}>Manage</button>
          </div>
        </div>

        <h3 className="section-title" style={{ fontSize: 15, marginTop: 22 }}>Account</h3>
        <div className="card" style={{ marginTop: 10, padding: "2px 14px" }}>
          <div className="account-row">
            <span className="account-row-label">Email</span>
            <span className="row" style={{ gap: 6 }}>
              <span className="account-row-value">{user.name.toLowerCase()}@example.com</span>
              <IconChevron style={{ color: "var(--ink-faint)", width: 14, height: 14 }} />
            </span>
          </div>
          <div className="account-row">
            <span className="account-row-label">Password</span>
            <span className="row" style={{ gap: 6 }}>
              <span className="account-row-value">••••••••</span>
              <IconChevron style={{ color: "var(--ink-faint)", width: 14, height: 14 }} />
            </span>
          </div>
        </div>

        <h3 className="section-title" style={{ fontSize: 15, marginTop: 22 }}>Connected courses</h3>
        <div className="ar-hint" style={{ marginBottom: 4 }}>كورساتك المتصلة</div>
        <div className="row wrap" style={{ gap: 8, marginTop: 8 }}>
          {connectedCourses.map((c) => (
            <div key={c.id} className="course-chip">
              {c.name}
              <button onClick={() => onToggleConnected(c.id)}><IconClose style={{ width: 11, height: 11 }} /></button>
            </div>
          ))}
          {disconnectedCourses.map((c) => (
            <button key={c.id} className="course-chip-add" onClick={() => onToggleConnected(c.id)}>
              <IconPlus style={{ width: 12, height: 12 }} /> {c.name}
            </button>
          ))}
        </div>

        <h3 className="section-title" style={{ fontSize: 15, marginTop: 22 }}>Notifications</h3>
        <div className="stack" style={{ gap: 8, marginTop: 10 }}>
          {[
            ["reminders", "Study reminders"],
            ["wellbeing", "Wellbeing check-ins"],
            ["summary", "Weekly summary email"],
            ["streakAlerts", "Streak alerts"],
          ].map(([key, label]) => (
            <div key={key} className="card row between" style={{ padding: "12px 14px" }}>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{label}</span>
              <Toggle on={notifs[key]} onClick={() => onToggleNotif(key)} />
            </div>
          ))}
        </div>

        <h3 className="section-title" style={{ fontSize: 15, marginTop: 22 }}>Study pacing</h3>
        <div className="card" style={{ marginTop: 10, padding: 14 }}>
          <div className="row" style={{ gap: 6, background: "rgba(20,39,90,0.06)", borderRadius: 12, padding: 4 }}>
            {["Relaxed", "Balanced", "Intense"].map((p) => (
              <button
                key={p}
                onClick={() => onSetPacing(p)}
                className="btn-sm"
                style={{
                  flex: 1, border: "none", borderRadius: 9, padding: "9px 6px", fontWeight: 700, fontSize: 12.5,
                  background: pacing === p ? "var(--card)" : "transparent",
                  color: pacing === p ? "var(--blue)" : "var(--ink-faint)",
                  boxShadow: pacing === p ? "0 3px 10px rgba(20,39,90,0.12)" : "none",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <h3 className="section-title" style={{ fontSize: 15, marginTop: 22 }}>Session length</h3>
        <p className="section-sub" style={{ marginTop: 2 }}>How long should a typical session run?</p>
        <div className="card" style={{ marginTop: 10, padding: 14 }}>
          <div className="row" style={{ gap: 6, background: "rgba(20,39,90,0.06)", borderRadius: 12, padding: 4 }}>
            {["Short", "Standard", "Long"].map((p) => (
              <button
                key={p}
                onClick={() => onSetSessionLength(p)}
                className="btn-sm"
                style={{
                  flex: 1, border: "none", borderRadius: 9, padding: "9px 6px", fontWeight: 700, fontSize: 12.5,
                  background: sessionLength === p ? "var(--card)" : "transparent",
                  color: sessionLength === p ? "var(--blue)" : "var(--ink-faint)",
                  boxShadow: sessionLength === p ? "0 3px 10px rgba(20,39,90,0.12)" : "none",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <button className="btn btn-outline btn-block" style={{ marginTop: 26 }} onClick={onRestart}>
          Restart onboarding demo
        </button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }} onClick={onExitToLanding}>
          Back to homepage
        </button>
        <button style={{ display: "block", margin: "18px auto 30px", background: "none", border: "none", color: "var(--danger)", fontWeight: 700, fontSize: 14 }} onClick={onExitToLanding}>
          Log out
        </button>
      </div>
    </>
  );
}

function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 42, height: 25, borderRadius: 999, border: "none", flexShrink: 0,
        background: on ? "var(--blue)" : "rgba(20,39,90,0.15)", position: "relative", transition: "background .15s ease",
      }}
    >
      <span style={{
        position: "absolute", top: 3, left: on ? 20 : 3, width: 19, height: 19, borderRadius: "50%",
        background: "#fff", transition: "left .15s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
      }} />
    </button>
  );
}

/* =========================================================================
   LANDING / MARKETING SITE
   ========================================================================= */
function Landing({ onGetStarted, onPreview }) {
  return (
    <div className="site">
      <header className="site-header">
        <Logo height={28} color="#fff" oval="#fff" face="var(--navy-deep)" />
        <nav className="site-nav">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <div className="row" style={{ gap: 10 }}>
          <button className="btn btn-ghost btn-sm" onClick={onPreview}>View demo</button>
          <button className="btn btn-gold btn-sm" onClick={onGetStarted}>Get started</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="chip gold"><IconSpark /> AI-personalized studying</span>
            <h1>Study smarter, not longer — with Glow by your side.</h1>
            <p>Veno turns your lecture slides and notes into a personalized daily study plan, adaptive practice questions, and a mastery tracker that actually tells you where you stand.</p>
            <div className="hero-ctas">
              <button className="btn btn-gold" onClick={onGetStarted}>Get started free <IconChevron /></button>
              <button className="btn btn-outline" style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }} onClick={onPreview}>Explore the dashboard</button>
            </div>
            <div className="row wrap hero-stats" style={{ gap: 32 }}>
              <div><div className="stat-num">4</div><div className="stat-label">Courses tracked</div></div>
              <div><div className="stat-num">10</div><div className="stat-label">Guided screens</div></div>
              <div><div className="stat-num">100%</div><div className="stat-label">Personalized plan</div></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="phone-preview">
              <div className="row between" style={{ padding: "18px 18px 0" }}>
                <Logo height={18} color="var(--navy)" oval="var(--navy)" face="#fff" />
                <div className="streak-pill"><IconCoin /> 120</div>
              </div>
              <div style={{ padding: 18 }}>
                <Glow size={50} />
                <h3 style={{ marginTop: 10, fontSize: 18 }}>Hey Ahmed {"\u{1F44B}"}</h3>
                <p className="section-sub" style={{ marginTop: 4 }}>Today's plan is ready.</p>
                <div className="card" style={{ marginTop: 14, padding: 12 }}>
                  <div className="row between">
                    <span style={{ fontWeight: 700, fontSize: 13 }}>Graph Traversal</span>
                    <span className="chip"><IconClock />12m</span>
                  </div>
                </div>
                <div className="card" style={{ marginTop: 10, padding: 12 }}>
                  <div className="row between">
                    <span style={{ fontWeight: 700, fontSize: 13 }}>Infinite Series</span>
                    <span className="chip"><IconClock />10m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <h2 className="section-title" style={{ fontSize: 30, textAlign: "center" }}>Everything a study platform should do</h2>
        <p className="section-sub" style={{ textAlign: "center", marginTop: 8 }}>One place for your materials, your plan, and your progress.</p>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon"><f.icon /></div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="how" id="how">
        <h2 className="section-title" style={{ fontSize: 30, textAlign: "center" }}>How Veno works</h2>
        <div className="how-steps">
          {STEPS.map((s, i) => (
            <div key={i} className="how-step">
              <div className="how-num">{i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <h2 className="section-title" style={{ fontSize: 30, textAlign: "center" }}>Simple pricing</h2>
        <p className="section-sub" style={{ textAlign: "center", marginTop: 8 }}>Most students study one semester at a time.</p>
        <div className="pricing-grid">
          {PLANS.map((p) => (
            <div key={p.id} className="card pricing-card">
              {p.recommended && <span className="chip gold">MOST POPULAR</span>}
              <div className="pricing-name">{p.name}</div>
              <div className="pricing-price">EGP {p.price}<span>{p.cadence}</span></div>
              <div className="section-sub" style={{ marginTop: 8 }}>{p.note}</div>
              <ul className="plan-features">
                {p.features.map((f) => (
                  <li key={f}><IconCheck />{f}</li>
                ))}
              </ul>
              <button className="btn btn-primary btn-block" style={{ marginTop: 18 }} onClick={onGetStarted}>Get started</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <Logo height={22} color="#fff" oval="#fff" face="var(--navy-deep)" />
        <p>© {new Date().getFullYear()} Veno. Built for students, by design.</p>
      </footer>
    </div>
  );
}

/* =========================================================================
   APP ROOT
   ========================================================================= */
const TABS = [
  { id: "home", label: "Home", icon: IconHome },
  { id: "study", label: "Study", icon: IconBook },
  { id: "progress", label: "Progress", icon: IconChart },
  { id: "schedule", label: "Schedule", icon: IconCalendar },
  { id: "profile", label: "Profile", icon: IconUser },
];

function computePlan(moodState, priorityInfo) {
  let plan = TODAY_PLAN.map((p) => ({ ...p }));
  if (priorityInfo && priorityInfo.urgentTopic) {
    plan.sort((a, b) => (b.topicId === priorityInfo.urgentTopic) - (a.topicId === priorityInfo.urgentTopic));
  }
  if (moodState === "tired") plan = plan.slice(0, 2);
  if (moodState === "stressed") {
    plan = plan.filter((p) => p.topicId !== (priorityInfo && priorityInfo.urgentTopic)).slice(0, 2);
    plan = plan.map((p) => ({ ...p, minutes: Math.max(5, Math.round(p.minutes * 0.7)) }));
  }
  if (moodState === "great") {
    plan = [...plan, { courseId: "eng", topicId: "essay", minutes: 10, reason: "Bonus round — you've got the energy" }];
  }
  return plan;
}

function StudyPicker({ streak, onOpenProfile, onStartSession }) {
  return (
    <>
      <TopBar streak={streak} onAvatar={onOpenProfile} title="Study" />
      <div className="scroll px">
        <p className="section-sub" style={{ marginTop: 2 }}>Pick a topic and Glow will pull questions straight from your uploaded materials.</p>
        <div className="stack" style={{ gap: 16, marginTop: 16, marginBottom: 10 }}>
          {COURSES.map((c) => (
            <div key={c.id}>
              <div className="row" style={{ gap: 8, marginBottom: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 3, background: c.color }} />
                <span style={{ fontFamily: "Marhey", fontWeight: 700, fontSize: 14.5 }}>{c.name}</span>
              </div>
              <div className="stack" style={{ gap: 8 }}>
                {c.topics.map((t) => (
                  <button key={t.id} className="card row between fade-item" style={{ padding: 13, width: "100%", textAlign: "left" }} onClick={() => onStartSession(c.id, t.id)}>
                    <span style={{ fontSize: 13.5, fontWeight: 600 }}>{t.name}</span>
                    <span className="chip muted">{t.mastery}%</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function DesktopShell({ tab, onNav, streak, user, children }) {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div style={{ paddingLeft: 6 }}>
          <Logo height={26} color="#fff" oval="#fff" face="var(--navy-deep)" />
        </div>
        <nav className="side-nav">
          {TABS.map((t) => (
            <button key={t.id} className={"side-link" + (tab === t.id ? " active" : "")} onClick={() => onNav(t.id)}>
              <t.icon />
              {t.label}
            </button>
          ))}
        </nav>
        <div className="side-footer">
          <div className="streak-pill" style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}>
            <IconCoin /> {streak}
          </div>
          <button className="side-link" style={{ padding: "8px 10px" }} onClick={() => onNav("profile")}>
            <div className="avatar-btn" style={{ width: 28, height: 28, fontSize: 12, flexShrink: 0 }}>{user.name[0]}</div>
            {user.name}
          </button>
        </div>
      </aside>
      <main className="app-main">
        <div className="app-main-inner">{children}</div>
      </main>
    </div>
  );
}

function App() {
  const [view, setView] = useState("landing");
  const [stage, setStage] = useState("onboarding");
  const [tab, setTab] = useState("home");
  const [user, setUser] = useState({ name: "Ahmed" });
  const [priorityInfo, setPriorityInfo] = useState(null);
  const [sessions, setSessions] = useState(INITIAL_SCHEDULE);
  const [moodState, setMoodState] = useState(null);
  const [showWellbeing, setShowWellbeing] = useState(false);
  const [activeSession, setActiveSession] = useState(null);
  const [showPricing, setShowPricing] = useState(false);
  const [plan, setPlan] = useState(computePlan(null, null));
  const [coins, setCoins] = useState(120);
  const [subscription, setSubscription] = useState(null);
  const [connected, setConnected] = useState({});
  const [notifs, setNotifs] = useState({ reminders: true, wellbeing: true, summary: false, streakAlerts: false });
  const [pacing, setPacing] = useState("Balanced");
  const [sessionLength, setSessionLength] = useState("Standard");
  const isDesktop = useIsDesktop();

  function finishOnboarding(data) {
    setUser({ name: data.name });
    setStage("uploads");
  }
  function finishUploads() { setStage("prioritize"); }
  function finishPrioritize(info) {
    setPriorityInfo(info);
    setPlan(computePlan(moodState, info));
    setStage("app");
  }
  function skipToApp() { setStage("app"); }

  function handleMood(id, overrideFull) {
    const effective = overrideFull ? "okay" : id;
    setMoodState(effective);
    setPlan(computePlan(effective, priorityInfo));
    setShowWellbeing(false);
  }

  function handleReschedule(id) {
    setSessions((list) => {
      const s = list.find((x) => x.id === id);
      if (!s) return list;
      const moved = { ...s, id: s.id + "-r" + Date.now(), day: (s.day + 1) % 7, status: "upcoming", rescheduledNote: "rescheduled — still on track" };
      return list.map((x) => (x.id === id ? { ...x, status: "moved" } : x)).concat(moved);
    });
  }

  function handleSessionComplete(topicId, newMastery) {
    const t = COURSES.flatMap((c) => c.topics).find((t) => t.id === topicId);
    if (t) { t.mastery = newMastery; t.trend = [...t.trend.slice(1), newMastery]; }
    setCoins((c) => c + 25);
    setPlan((p) => p.filter((item) => item.topicId !== topicId));
    setActiveSession(null);
  }

  function restartDemo() {
    setStage("onboarding");
    setTab("home");
    setMoodState(null);
    setPriorityInfo(null);
    setPlan(computePlan(null, null));
  }

  function enterApp() { setView("app"); }
  function previewDashboard() { setView("app"); setStage("app"); }
  function backToLanding() { setView("landing"); setStage("onboarding"); setTab("home"); }

  function navigate(tabId) {
    setActiveSession(null);
    setShowPricing(false);
    setTab(tabId);
  }

  if (view === "landing") {
    return <Landing onGetStarted={enterApp} onPreview={previewDashboard} />;
  }

  if (stage === "onboarding") return <PhoneFrame isDesktop={isDesktop}><Onboarding onDone={finishOnboarding} onSkip={skipToApp} /></PhoneFrame>;
  if (stage === "uploads") return <PhoneFrame isDesktop={isDesktop}><UploadMaterials isDesktop={isDesktop} onDone={finishUploads} onSkip={finishUploads} /></PhoneFrame>;
  if (stage === "prioritize") return <PhoneFrame isDesktop={isDesktop}><Prioritization onDone={finishPrioritize} /></PhoneFrame>;

  let content;
  if (activeSession) {
    content = (
      <StudySession
        courseId={activeSession.courseId}
        topicId={activeSession.topicId}
        isDesktop={isDesktop}
        onExit={() => setActiveSession(null)}
        onComplete={handleSessionComplete}
      />
    );
  } else if (showPricing) {
    content = <Pricing onBack={() => setShowPricing(false)} currentPlan={subscription} onSubscribe={setSubscription} />;
  } else {
    content = (
      <div className="screen">
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          {tab === "home" && (
            <Home
              user={user} streak={coins} plan={plan} moodState={moodState} isDesktop={isDesktop} sessions={sessions}
              onOpenWellbeing={() => setShowWellbeing(true)}
              onStartSession={(cid, tid) => setActiveSession({ courseId: cid, topicId: tid })}
              onOpenCourse={() => navigate("progress")}
              onOpenSchedule={() => navigate("schedule")}
              onOpenProfile={() => navigate("profile")}
            />
          )}
          {tab === "study" && (
            <StudyPicker streak={coins} onOpenProfile={() => navigate("profile")} onStartSession={(cid, tid) => setActiveSession({ courseId: cid, topicId: tid })} />
          )}
          {tab === "progress" && (
            <ProgressView streak={coins} isDesktop={isDesktop} onOpenProfile={() => navigate("profile")} onStartSession={(cid, tid) => setActiveSession({ courseId: cid, topicId: tid })} />
          )}
          {tab === "schedule" && (
            <Schedule streak={coins} isDesktop={isDesktop} onOpenProfile={() => navigate("profile")} sessions={sessions} onReschedule={handleReschedule} />
          )}
          {tab === "profile" && (
            <Profile
              user={user} onBack={() => navigate("home")} plan={subscription} onOpenPricing={() => setShowPricing(true)}
              connected={connected} onToggleConnected={(id) => setConnected((c) => ({ ...c, [id]: c[id] === false ? true : false }))}
              notifs={notifs} onToggleNotif={(k) => setNotifs((n) => ({ ...n, [k]: !n[k] }))}
              pacing={pacing} onSetPacing={setPacing} sessionLength={sessionLength} onSetSessionLength={setSessionLength}
              onRestart={restartDemo} onExitToLanding={backToLanding}
            />
          )}
        </div>
        {!isDesktop && (
          <div className="tabbar">
            {TABS.map((t) => (
              <button key={t.id} className={"tab" + (tab === t.id ? " active" : "")} onClick={() => navigate(t.id)}>
                <t.icon />
                {t.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (isDesktop) {
    return (
      <DesktopShell tab={tab} onNav={navigate} streak={coins} user={user}>
        {content}
        {showWellbeing && <WellbeingCheckin onClose={() => setShowWellbeing(false)} onSelect={handleMood} getPreviewPlan={(id) => computePlan(id, priorityInfo)} />}
      </DesktopShell>
    );
  }

  return (
    <PhoneFrame>
      {content}
      {showWellbeing && <WellbeingCheckin onClose={() => setShowWellbeing(false)} onSelect={handleMood} getPreviewPlan={(id) => computePlan(id, priorityInfo)} />}
    </PhoneFrame>
  );
}

function PhoneFrame({ children, isDesktop }) {
  return (
    <div className="veno-root">
      <div className={"phone" + (isDesktop ? " desktop-card" : "")}>{children}</div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
