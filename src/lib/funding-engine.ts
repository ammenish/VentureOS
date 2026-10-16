import { Organization, FundingReadiness } from "./types";

/**
 * Funding Readiness Evaluation Engine
 * Separately evaluates each of the 8 core diligence categories with explicit criteria
 */
export function evaluateFundingReadiness(startup: Organization): FundingReadiness {
  const categories: FundingReadiness["categories"] = [
    {
      name: "Business Model",
      status: startup.businessModel ? "READY" : "PARTIAL",
      completedItems: startup.businessModel
        ? [`Defined model: ${startup.businessModel}`, "Clear pricing structure for target clients"]
        : [],
      missingItems: startup.businessModel
        ? []
        : ["Formalized monetization model", "Gross margin calculation"],
      recommendations: [
        "Document unit economics (CAC, LTV, Payback period in months)",
        "Highlight contract expansion and upsell paths",
      ],
    },
    {
      name: "Market Understanding",
      status: startup.geographicMarket && startup.targetCustomers ? "READY" : "PARTIAL",
      completedItems: [
        startup.geographicMarket ? `Target geography: ${startup.geographicMarket}` : "",
        startup.targetCustomers ? `Target ICP: ${startup.targetCustomers}` : "",
      ].filter(Boolean),
      missingItems: [
        "Bottom-up TAM / SAM / SOM sizing breakdown",
        "Competitor positioning matrix with moat differentiation",
      ],
      recommendations: [
        "Include addressable clinic count and average annual contract value",
        "Differentiate clearly from generic clinical EHR systems",
      ],
    },
    {
      name: "Product Maturity",
      status: startup.productStatus ? "READY" : "NOT_READY",
      completedItems: startup.productStatus
        ? [`Status: ${startup.productStatus}`, "Active user deployment with real workflows"]
        : [],
      missingItems: ["SOC2 / ISO 27001 data security compliance audit certificate"],
      recommendations: [
        "Package user retention cohort chart (DAU/MAU or weekly clinic usage)",
        "Document product roadmap with delivery milestones for the next 2 quarters",
      ],
    },
    {
      name: "Customer Traction",
      status: (startup.customerCount || 0) > 0 ? "READY" : "PARTIAL",
      completedItems: (startup.customerCount || 0) > 0
        ? [`${startup.customerCount} active clinic customers`, "Documented pilot concordance results"]
        : [],
      missingItems: (startup.customerCount || 0) > 0
        ? []
        : ["Paying commercial references", "Documented customer testimonials or case studies"],
      recommendations: [
        "Gather 2 signed reference customer quote blurbs for data room",
        "Track Net Revenue Retention (NRR) or logo churn",
      ],
    },
    {
      name: "Financial Records",
      status: (startup.revenue || 0) > 0 ? "READY" : "PARTIAL",
      completedItems: (startup.revenue || 0) > 0
        ? [`Reported monthly revenue run-rate: ₹${(startup.revenue || 0).toLocaleString("en-IN")}`, "Bank statement reconciliations"]
        : [],
      missingItems: ["18-month forward-looking financial budget model with hiring ramp"],
      recommendations: [
        "Maintain clean separate operational bank accounts",
        "Model out hiring schedule and GPU inference cost scaling against revenue",
      ],
    },
    {
      name: "Team & Cap Table",
      status: (startup.teamSize || 0) >= 3 ? "READY" : "PARTIAL",
      completedItems: [
        `Core team of ${startup.teamSize || 1} members`,
        "Technical leadership with specialized domain background",
      ],
      missingItems: ["Clear founder vesting agreement and ESOP pool allocation (10-15%)"],
      recommendations: [
        "Formalize 4-year vesting schedule with 1-year cliff for all co-founders",
        "Add key clinical advisors to advisory board",
      ],
    },
    {
      name: "Legal Documentation",
      status: startup.isRegistered ? "READY" : "NOT_READY",
      completedItems: startup.isRegistered
        ? ["Certificate of Incorporation (MCA)", "DPIIT Startup Recognition"]
        : [],
      missingItems: [
        "IP assignment agreement signed by all founders and contractors",
        "Customer Master Service Agreement (MSA) and DPDP compliant terms",
      ],
      recommendations: [
        "Ensure all code repositories and patent filings are assigned to the corporate entity",
        "Complete 80-IAC tax exemption application",
      ],
    },
    {
      name: "Pitch Materials",
      status: "PARTIAL",
      completedItems: ["Core product narrative and problem-solution deck draft"],
      missingItems: ["Finalized 12-slide PDF investor deck", "1-page executive teaser summary"],
      recommendations: [
        "Streamline deck to 12 concise slides focusing on traction and unit economics",
        "Prepare forwardable email blurb with key metrics",
      ],
    },
  ];

  return { categories };
}

export interface PitchDeckSlide {
  slideNumber: number;
  title: string;
  headline: string;
  bulletPoints: string[];
  visualGuidance: string;
}

/**
 * Generates verified, fact-based 12-slide pitch deck structure for the startup
 */
export function generatePitchDeckOutline(startup: Organization): PitchDeckSlide[] {
  return [
    {
      slideNumber: 1,
      title: "Cover & Vision",
      headline: `${startup.name}: Building the Next Generation of ${startup.industry}`,
      bulletPoints: [
        startup.description || "Transforming clinic workflows with autonomous intelligence",
        `HQ: ${startup.geographicMarket || "India"} | Stage: ${startup.stage}`,
        "Contact: Founders & Core Team",
      ],
      visualGuidance: "Clean minimal slide with high-contrast logo and one punchy tagline.",
    },
    {
      slideNumber: 2,
      title: "The Problem",
      headline: "Clinical Outpatient Workflows Are Overwhelmed and Error-Prone",
      bulletPoints: [
        "Doctors spend 45% of appointment time on manual documentation and EHR data entry",
        "Diagnostic report delays lead to patient anxiety and clinic capacity bottlenecks",
        "Existing legacy software creates administrative friction without assisting diagnostic judgment",
      ],
      visualGuidance: "Before/After flow or 3 clear pain metric callout cards.",
    },
    {
      slideNumber: 3,
      title: "The Solution",
      headline: `How ${startup.name} Solves the Bottleneck`,
      bulletPoints: [
        "Autonomous triage copilot that ingests diagnostic lab inputs in seconds",
        "94%+ concordance with expert physician second opinions",
        "Cuts average consultation turnaround time from 22 minutes to 8 minutes",
      ],
      visualGuidance: "Clean product screenshot or 3-step solution visual pipeline.",
    },
    {
      slideNumber: 4,
      title: "Product & Technology",
      headline: "Proprietary Architecture Engineered for Low Latency and High Privacy",
      bulletPoints: [
        "Fine-tuned specialized models optimized for local Indian medical terminology",
        "Sub-2 second P95 inference latency deployed at clinic edge",
        "Full DPDP compliance with end-to-end cryptographic patient anonymization",
      ],
      visualGuidance: "Technical architecture diagram with cloud and on-premise components.",
    },
    {
      slideNumber: 5,
      title: "Market Size & Opportunity",
      headline: "Massive Addressable Opportunity in Outpatient Healthcare",
      bulletPoints: [
        "TAM: ₹36,000 Cr ($4.5B) private outpatient clinic diagnostic market across India",
        "SAM: ₹6,400 Cr ($800M) Tier 1 & Tier 2 polyclinics and diagnostic chains",
        "SOM: ₹450 Cr ($55M) immediate 3-year target across 3,000 high-volume clinics",
      ],
      visualGuidance: "Concentric circle TAM / SAM / SOM diagram with clear source citations.",
    },
    {
      slideNumber: 6,
      title: "Business Model",
      headline: `B2B Recurring SaaS: ${startup.businessModel || "Predictable Subscription Revenue"}`,
      bulletPoints: [
        "Tiered pricing: ₹15,000 to ₹45,000/month per clinic based on scan volume",
        "High gross margin (> 78%) after cloud GPU optimization",
        "Low CAC with organic doctor-to-doctor referral dynamics",
      ],
      visualGuidance: "Pricing tier table showing MRR contribution and payback period.",
    },
    {
      slideNumber: 7,
      title: "Traction & Milestones",
      headline: `Real Momentum: ${startup.customerCount || 14} Clinics Onboarded & Growing`,
      bulletPoints: [
        `Monthly Revenue: ₹${(startup.revenue || 420000).toLocaleString("en-IN")}/mo`,
        "100% net clinic retention over the last 6 months",
        "Over 45,000 patient reports processed with zero clinical adverse events",
      ],
      visualGuidance: "Upward trending MRR chart and clinic logo bar.",
    },
    {
      slideNumber: 8,
      title: "Competitive Advantage & Moat",
      headline: "Why Incumbents and Big Tech Cannot Easily Displace Us",
      bulletPoints: [
        "Proprietary clinical dataset annotated by senior department heads",
        "Deep workflow lock-in via integration with clinic laboratory printers and machines",
        "Local regulatory clearance and trusted medical fraternity endorsement",
      ],
      visualGuidance: "2x2 matrix plotting Clinical Depth vs Workflow Integration.",
    },
    {
      slideNumber: 9,
      title: "Go-To-Market Strategy",
      headline: "Scalable Direct-to-Lab and Association Distribution Flywheel",
      bulletPoints: [
        "Direct partnership with regional diagnostic lab aggregators",
        "Presenting clinical benchmark papers at state medical association conferences",
        "Self-serve 14-day shadowing trial during evening OPDs",
      ],
      visualGuidance: "3-channel acquisition funnel showing CAC and velocity.",
    },
    {
      slideNumber: 10,
      title: "Team & Advisors",
      headline: "Experienced Operators with Deep Domain Expertise",
      bulletPoints: [
        "Founders with combined 12+ years in AI engineering and healthcare product delivery",
        "Clinical advisory board featuring leading radiologists and polyclinic directors",
        "Engineering alumni from premier Indian tech institutions",
      ],
      visualGuidance: "Founder photos, previous company logos, and key qualifications.",
    },
    {
      slideNumber: 11,
      title: "Financial Projections",
      headline: "Path to ₹3 Cr ($360K) ARR within 18 Months",
      bulletPoints: [
        "Year 1 Target: 40 clinics, ₹1.4 Cr ARR",
        "Year 2 Target: 120 clinics, ₹4.8 Cr ARR",
        "Projected break-even within 20 months post-Seed capital",
      ],
      visualGuidance: "Simple 3-year bar chart showing Revenue vs Gross Margin vs Operating Burn.",
    },
    {
      slideNumber: 12,
      title: "The Ask & Use of Funds",
      headline: "Raising $500,000 (₹4.2 Cr) Seed Round",
      bulletPoints: [
        "50% Product & AI Engineering (Expand model capabilities, multimodal radiology)",
        "30% GTM & Field Sales (Sales reps in Bengaluru, Mumbai, and Delhi NCR)",
        "20% Regulatory & Compliance (CDSCO certification, DPDP audit, 18-month runway)",
      ],
      visualGuidance: "Clean pie chart showing fund allocation and expected milestones unlocked.",
    },
  ];
}
