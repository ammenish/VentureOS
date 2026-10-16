import fs from "fs";
import path from "path";
import {
  User,
  Organization,
  OrgMembership,
  Project,
  Task,
  Milestone,
  Goal,
  Transaction,
  Opportunity,
  Investor,
  AIConversation,
  AIMessage,
  AIActionProposal,
  Post,
  Comment,
  StartupStage,
} from "./types";

interface DocumentItem {
  id: string;
  orgId: string;
  name: string;
  category: "pitch_deck" | "financials" | "legal" | "product" | "research";
  size: string;
  url: string;
  uploadedAt: string;
}

interface AuditLogItem {
  id: string;
  orgId: string;
  userId: string;
  action: string;
  entity: string;
  details: string;
  createdAt: string;
}

interface DatabaseSchema {
  users: User[];
  organizations: Organization[];
  memberships: OrgMembership[];
  projects: Project[];
  tasks: Task[];
  milestones: Milestone[];
  goals: Goal[];
  transactions: Transaction[];
  opportunities: Opportunity[];
  investors: Investor[];
  conversations: AIConversation[];
  actionProposals: AIActionProposal[];
  posts: Post[];
  comments: Comment[];
  documents: DocumentItem[];
  auditLogs: AuditLogItem[];
}

const DB_PATH = path.join(process.cwd(), ".data", "ventureos_db.json");

// Initial Seed Data
const initialUsers: User[] = [
  {
    id: "usr_founder_1",
    name: "Aarav Sharma",
    email: "aarav@pulseai.health",
    avatarUrl: "",
    role: "Founder & CEO",
    experience: "7+ years in HealthTech engineering & product",
    location: "Bengaluru, India",
    interests: ["Digital Health", "AI Diagnostics", "B2B SaaS"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialOrganizations: Organization[] = [
  {
    id: "org_pulseai",
    name: "PulseAI Health",
    slug: "pulseai-health",
    description:
      "AI-assisted clinical triage and diagnostic workflow automation platform for outpatient clinics.",
    industry: "HealthTech / AI",
    businessModel: "B2B SaaS (Monthly recurring subscriptions for clinics)",
    targetCustomers: "Tier 1 & Tier 2 polyclinics and diagnostic chains",
    geographicMarket: "India & Southeast Asia",
    stage: "TRACTION" as StartupStage,
    teamSize: 5,
    productStatus: "Live MVP with 8 pilot clinics onboarded",
    revenue: 420000, // INR monthly (~$5,000 USD)
    fundingHistory: "Bootstrapped with ₹15L founder savings + ₹10L angel angel check",
    isRegistered: true,
    customerCount: 14,
    challenges: [
      "Shortening clinical trial sales cycles",
      "Securing Indian government CDSCO and MeitY certifications",
      "Expanding runway before Series Seed",
    ],
    goals: [
      "Reach 30 paying polyclinics by Q3",
      "Apply for Startup India Seed Fund Scheme (SISFS)",
      "Raise $500K Seed round in 4 months",
    ],
    createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialMemberships: OrgMembership[] = [
  {
    id: "mem_1",
    userId: "usr_founder_1",
    orgId: "org_pulseai",
    role: "OWNER",
    createdAt: new Date().toISOString(),
  },
];

const initialProjects: Project[] = [
  {
    id: "proj_product",
    orgId: "org_pulseai",
    name: "AI Diagnostic Engine v2.0",
    description: "Multi-modal chest X-ray and lab report analysis model pipeline",
    status: "ACTIVE",
    taskCount: 6,
    completedTaskCount: 4,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj_fundraising",
    orgId: "org_pulseai",
    name: "Seed Round Preparation",
    description: "Data room, pitch deck iteration, and investor outreach tracking",
    status: "ACTIVE",
    taskCount: 5,
    completedTaskCount: 2,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj_compliance",
    orgId: "org_pulseai",
    name: "Regulatory & Grants",
    description: "Startup India Seed Fund Scheme application & ISO 27001 data audit",
    status: "ACTIVE",
    taskCount: 4,
    completedTaskCount: 1,
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialTasks: Task[] = [
  {
    id: "tsk_1",
    orgId: "org_pulseai",
    projectId: "proj_product",
    title: "Deploy DICOM image parser microservice",
    description: "Integrate high-speed cloud DICOM viewer with secure pre-signed S3 URLs",
    status: "COMPLETED",
    priority: "HIGH",
    assigneeId: "usr_founder_1",
    dueDate: new Date(Date.now() - 5 * 86400000).toISOString(),
    completedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: "tsk_2",
    orgId: "org_pulseai",
    projectId: "proj_compliance",
    title: "Finalize SISFS Incubator selection",
    description: "Compare CIE IIIT Hyderabad vs SINE IIT Bombay for Seed Fund incubator quota",
    status: "IN_PROGRESS",
    priority: "URGENT",
    assigneeId: "usr_founder_1",
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tsk_3",
    orgId: "org_pulseai",
    projectId: "proj_fundraising",
    title: "Update unit economics slide in Pitch Deck",
    description: "Incorporate ₹4.2L MRR, ₹35K CAC, and 14-month LTV based on Q1 clinic retention",
    status: "TODO",
    priority: "HIGH",
    assigneeId: "usr_founder_1",
    dueDate: new Date(Date.now() + 5 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tsk_4",
    orgId: "org_pulseai",
    projectId: "proj_product",
    title: "Optimize inference latency to < 1.8 seconds",
    description: "Benchmark TensorRT vs ONNX runtime on AWS g5.xlarge instances",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    assigneeId: "usr_founder_1",
    dueDate: new Date(Date.now() + 8 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tsk_5",
    orgId: "org_pulseai",
    projectId: "proj_fundraising",
    title: "Schedule intro call with Kalaari Capital HealthTech lead",
    description: "Send forwardable blurb through warm intro via IIT Madras alumni network",
    status: "TODO",
    priority: "MEDIUM",
    assigneeId: "usr_founder_1",
    dueDate: new Date(Date.now() + 10 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "tsk_6",
    orgId: "org_pulseai",
    projectId: "proj_compliance",
    title: "Complete DPDP (Digital Personal Data Protection) readiness check",
    description: "Audit patient data anonymization protocols and consent log flows",
    status: "BACKLOG",
    priority: "LOW",
    assigneeId: "usr_founder_1",
    dueDate: new Date(Date.now() + 18 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const initialMilestones: Milestone[] = [
  {
    id: "mls_1",
    orgId: "org_pulseai",
    title: "Problem Validation & 20 Doctor Interviews",
    description: "Confirmed urgent pain in manual report summarization and triage overload",
    stage: "VALIDATION" as StartupStage,
    isCompleted: true,
    order: 1,
    completedAt: new Date(Date.now() - 75 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
  },
  {
    id: "mls_2",
    orgId: "org_pulseai",
    title: "Alpha MVP Prototype in 3 Pilot Clinics",
    description: "Deployed on-premise gateway with 94.2% diagnostic concordance rate",
    stage: "MVP" as StartupStage,
    isCompleted: true,
    order: 2,
    completedAt: new Date(Date.now() - 45 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 70 * 86400000).toISOString(),
  },
  {
    id: "mls_3",
    orgId: "org_pulseai",
    title: "Commercial Launch & First 10 Paid Clinics",
    description: "Generated initial recurring B2B software revenue",
    stage: "LAUNCH" as StartupStage,
    isCompleted: true,
    order: 3,
    completedAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 40 * 86400000).toISOString(),
  },
  {
    id: "mls_4",
    orgId: "org_pulseai",
    title: "Scale to ₹10L MRR ($12K/mo) & 35 Clinics",
    description: "Establish repeatable organic referral playbook among diagnostic labs",
    stage: "TRACTION" as StartupStage,
    isCompleted: false,
    order: 4,
    targetDate: new Date(Date.now() + 45 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
  {
    id: "mls_5",
    orgId: "org_pulseai",
    title: "Close $500K Institutional Seed Round",
    description: "Secure lead VC term sheet and syndicate angels for scale",
    stage: "FUNDING" as StartupStage,
    isCompleted: false,
    order: 5,
    targetDate: new Date(Date.now() + 90 * 86400000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
];

const initialGoals: Goal[] = [
  {
    id: "gol_1",
    orgId: "org_pulseai",
    title: "Reach ₹10,00,000 Monthly Recurring Revenue",
    description: "Expand polyclinic onboarding from current 14 to 35 clinics",
    targetDate: new Date(Date.now() + 60 * 86400000).toISOString(),
    progress: 42,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "gol_2",
    orgId: "org_pulseai",
    title: "Submit Startup India Seed Fund (SISFS) Grant Application",
    description: "Target ₹20 Lakhs non-dilutive prototype/validation grant",
    targetDate: new Date(Date.now() + 14 * 86400000).toISOString(),
    progress: 70,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "gol_3",
    orgId: "org_pulseai",
    title: "Extend Cash Runway to > 12 Months",
    description: "Maintain net burn under ₹1.8L while scaling client contracts",
    targetDate: new Date(Date.now() + 90 * 86400000).toISOString(),
    progress: 85,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  },
];

const initialTransactions: Transaction[] = [
  {
    id: "tx_1",
    orgId: "org_pulseai",
    type: "INCOME",
    amount: 140000,
    category: "Subscriptions",
    description: "Metro Diagnostic Labs - Enterprise Annual Tier (Quarterly installment)",
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "tx_2",
    orgId: "org_pulseai",
    type: "INCOME",
    amount: 95000,
    category: "Subscriptions",
    description: "CareFirst Polyclinic Chain - 3 Branch SaaS License",
    date: new Date(Date.now() - 8 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "tx_3",
    orgId: "org_pulseai",
    type: "INCOME",
    amount: 185000,
    category: "Subscriptions",
    description: "Apex Radiology & Diagnostics - Monthly triage license",
    date: new Date(Date.now() - 18 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "tx_4",
    orgId: "org_pulseai",
    type: "EXPENSE",
    amount: 88000,
    category: "Cloud Infrastructure",
    description: "AWS GPU Instances (EC2 g5.xlarge + Bedrock Inference APIs)",
    date: new Date(Date.now() - 5 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "tx_5",
    orgId: "org_pulseai",
    type: "EXPENSE",
    amount: 120000,
    category: "Salaries & Payroll",
    description: "Full-stack ML engineer & data annotation stipend",
    date: new Date(Date.now() - 10 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "tx_6",
    orgId: "org_pulseai",
    type: "EXPENSE",
    amount: 18500,
    category: "Software & Tools",
    description: "GitHub Enterprise, Notion, Slack, Google Workspace",
    date: new Date(Date.now() - 12 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "tx_7",
    orgId: "org_pulseai",
    type: "EXPENSE",
    amount: 15000,
    category: "Legal & Compliance",
    description: "DPIIT startup recognition renewal & CA retainership",
    date: new Date(Date.now() - 25 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

// Curated Authentic Indian Startup Schemes & Opportunities
const initialOpportunities: Opportunity[] = [
  {
    id: "opp_sisfs",
    name: "Startup India Seed Fund Scheme (SISFS)",
    provider: "Department for Promotion of Industry and Internal Trade (DPIIT), Govt. of India",
    category: "GOVERNMENT_SCHEME",
    description:
      "Financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization through approved incubators across India.",
    eligibleIndustries: ["HealthTech", "AI", "SaaS", "DeepTech", "Agritech", "CleanTech", "All Tech"],
    eligibleLocations: ["All India"],
    eligibleStages: ["VALIDATION", "MVP", "LAUNCH", "TRACTION"],
    eligibilityRequirements: [
      "DPIIT recognized startup",
      "Incorporated not more than 2 years ago at the time of application",
      "Must have a business idea to develop a product or service with a market fit, viable commercialization scope, and scope of scaling",
      "Startup should not have received more than ₹10 Lakhs of monetary support under any other Central or State Government scheme",
    ],
    benefits: [
      "Up to ₹20 Lakhs grant for validation of Proof of Concept, prototype development, or product trials",
      "Up to ₹50 Lakhs of investment through convertible debentures or debt for market entry and scaling",
      "Mentorship and incubation support through top national incubators",
    ],
    applicationDeadline: "Open Round (Quarterly incubator review cycle)",
    requiredDocuments: [
      "DPIIT Recognition Certificate (Certificate of Recognition)",
      "Certificate of Incorporation (MCA)",
      "Pitch Deck / Business Proposal PDF",
      "Audited Balance Sheet or Bank Statements",
      "Founder Aadhaar and PAN documents",
    ],
    officialSourceUrl: "https://seedfund.startupindia.gov.in/",
    lastVerifiedDate: "2026-04-10",
    status: "ACTIVE",
    isDemo: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "opp_birac_big",
    name: "Biotechnology Ignition Grant (BIG Scheme)",
    provider: "Biotechnology Industry Research Assistance Council (BIRAC), Dept of Biotechnology",
    category: "GRANT",
    description:
      "Flagship grant program fostering early-stage biotech, medtech, diagnostics, and digital healthcare innovations with high commercialization potential.",
    eligibleIndustries: ["HealthTech / AI", "Biotechnology", "MedTech", "Diagnostic Devices"],
    eligibleLocations: ["All India"],
    eligibleStages: ["IDEA", "VALIDATION", "MVP"],
    eligibilityRequirements: [
      "Registered Indian company with minimum 51% shareholding by Indian citizens",
      "Company age less than 5 years",
      "Project proposal must possess clear medical or biotechnological novelty and proof-of-concept focus",
      "Applicant must have registered with a BIRAC BIG Partner incubator",
    ],
    benefits: [
      "Up to ₹50 Lakhs (100% non-dilutive grant-in-aid)",
      "Mentorship by clinicians, biotech leaders, and regulatory experts",
      "Access to specialized instrumentation labs and testbeds",
    ],
    applicationDeadline: "Calls announce bi-annually (Next: June 30, 2026)",
    requiredDocuments: [
      "Detailed R&D Project Proposal with Gantt Chart",
      "Preliminary Concordance or Lab Validation Data",
      "Company Registration & Shareholding Pattern",
      "Clinical Advisory Board endorsement letter",
    ],
    officialSourceUrl: "https://birac.nic.in/big.php",
    lastVerifiedDate: "2026-04-05",
    status: "ACTIVE",
    isDemo: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "opp_meity_tide",
    name: "MeitY TIDE 2.0 (Technology Incubation & Development)",
    provider: "Ministry of Electronics and Information Technology (MeitY), Startup Hub",
    category: "STARTUP_PROGRAM",
    description:
      "Scheme promoting tech entrepreneurship through financial and technical support to incubators engaged in supporting ICT startups using emerging technologies like IoT, AI, BlockChain, and Robotics.",
    eligibleIndustries: ["AI", "HealthTech", "Cybersecurity", "Fintech", "Enterprise SaaS"],
    eligibleLocations: ["All India"],
    eligibleStages: ["IDEA", "VALIDATION", "MVP", "LAUNCH"],
    eligibilityRequirements: [
      "Working on emerging technology (AI, Machine Learning, IoT, Data Science)",
      "Early stage with scalable technology architecture",
      "Must incubate physically or virtually with an empaneled G1/G2 TIDE center",
    ],
    benefits: [
      "Entrepreneur-in-Residence (EiR) fellowship up to ₹4 Lakhs",
      "Grant-in-Aid for prototype development up to ₹7 Lakhs",
      "Scale-up funding support up to ₹40 Lakhs through TIDE 2.0 centers",
    ],
    applicationDeadline: "Rolling admissions via MeitY Startup Hub",
    requiredDocuments: [
      "Tech Architecture Whitepaper",
      "Founder CV and Academic credentials",
      "Demo Video or Prototype URL",
      "Budget breakdown with fund utilization plan",
    ],
    officialSourceUrl: "https://meitystartuphub.in/schemes/tide-2-0",
    lastVerifiedDate: "2026-04-01",
    status: "ACTIVE",
    isDemo: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "opp_nidhi_prayas",
    name: "NIDHI-PRAYAS (Promoting and Accelerating Young and Aspiring Innovators)",
    provider: "Department of Science & Technology (DST), Govt. of India",
    category: "GRANT",
    description:
      "Support from Idea-to-Prototype for young innovators. Provides prototype grant funding to address the gap between idea validation and prototype development.",
    eligibleIndustries: ["DeepTech", "Hardware", "IoT", "HealthTech", "CleanTech"],
    eligibleLocations: ["All India"],
    eligibleStages: ["IDEA", "VALIDATION"],
    eligibilityRequirements: [
      "Individual innovators or startups registered within 3 years",
      "Focus on physical prototype or tangible hardware/software integration",
      "Ownership of intellectual property by Indian promoters",
    ],
    benefits: [
      "Up to ₹10 Lakhs prototype development grant",
      "Access to PRAYAS Shala (maker-labs & rapid fabrication facilities)",
      "Technical mentorship from university research professors",
    ],
    applicationDeadline: "Next cycle closes August 15, 2026",
    requiredDocuments: [
      "Prototype Design Schematics and Bill of Materials (BOM)",
      "Patent search or prior art clearance report",
      "Identity and Indian domicile proofs",
    ],
    officialSourceUrl: "https://www.nidhi-prayas.org/",
    lastVerifiedDate: "2026-03-28",
    status: "ACTIVE",
    isDemo: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "opp_india_ai_mission",
    name: "IndiaAI Mission - GPU Compute & Innovation Vouchers",
    provider: "IndiaAI / Digital India Corporation (DIC), Govt. of India",
    category: "SUBSIDY",
    description:
      "National AI initiative granting subsidized access to 10,000+ AI compute GPUs, foundational model testbeds, and direct innovation grants for Indian sovereign AI builders.",
    eligibleIndustries: ["AI", "HealthTech / AI", "Language Tech", "DeepTech"],
    eligibleLocations: ["All India"],
    eligibleStages: ["MVP", "LAUNCH", "TRACTION", "GROWTH"],
    eligibilityRequirements: [
      "Indian registered entity or academic spin-off",
      "Utilizing deep neural network training or high-throughput inference",
      "Compliance with Responsible AI guidelines and data residency inside India",
    ],
    benefits: [
      "Up to ₹25 Lakhs equivalent in subsidized cloud GPU compute credits",
      "Access to curated national public health and Indic multimodal datasets",
      "Fast-track integration with National Digital Health Mission (ABDM) sandbox",
    ],
    applicationDeadline: "Open Portal - Continuous intake",
    requiredDocuments: [
      "Compute workload sizing estimation (TFLOPS / GPU Hours)",
      "Data privacy architecture document",
      "DPIIT Certificate",
    ],
    officialSourceUrl: "https://indiaai.gov.in/",
    lastVerifiedDate: "2026-04-12",
    status: "ACTIVE",
    isDemo: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "opp_cie_iiith",
    name: "CIE IIIT Hyderabad MedTech & AI Accelerator",
    provider: "Center for Innovation & Entrepreneurship, IIIT Hyderabad",
    category: "ACCELERATOR",
    description:
      "6-month intensive accelerator for early-stage DeepTech and HealthTech ventures providing tech research lab access, corporate pilot connects, and ₹25L-₹40L seed capital.",
    eligibleIndustries: ["AI", "HealthTech", "Computer Vision", "Robotics"],
    eligibleLocations: ["Hyderabad / Pan-India with hybrid attendance"],
    eligibleStages: ["MVP", "LAUNCH", "TRACTION"],
    eligibilityRequirements: [
      "Strong technical founder or research team",
      "Functional working prototype with measurable benchmark data",
      "Commitment to 6-month structured program milestones",
    ],
    benefits: [
      "₹25 Lakhs initial seed capital with follow-on syndicate access",
      "Direct research mentorship from IIIT-H CVIT / Kohli AI research labs",
      "Pilots with 15+ network hospital chains across Telangana & Karnataka",
    ],
    applicationDeadline: "Cohort 18 applications close May 30, 2026",
    requiredDocuments: [
      "Product Pitch Deck (12 slides)",
      "Technical Architecture Overview",
      "Customer Testimonials or LOIs",
    ],
    officialSourceUrl: "https://cie.iiit.ac.in/",
    lastVerifiedDate: "2026-04-08",
    status: "ACTIVE",
    isDemo: false,
    createdAt: new Date().toISOString(),
  },
];

const initialInvestors: Investor[] = [
  {
    id: "inv_1",
    orgId: "org_pulseai",
    name: "Dr. Rohini Varma",
    firm: "HealthX Capital",
    stage: "Seed to Series A",
    sectors: ["HealthTech", "Digital Diagnostics", "B2B SaaS"],
    ticketSize: "$250K - $1M",
    contactEmail: "rohini@healthx.vc",
    linkedInUrl: "https://linkedin.com/in/rohinivarma-healthx",
    dealStage: "MEETING_SCHEDULED",
    notes: "Deeply interested in our polyclinic triage speed metrics. Pitch scheduled for next Tuesday 3 PM.",
    lastContactDate: new Date(Date.now() - 3 * 86400000).toISOString(),
    nextFollowUpDate: new Date(Date.now() + 2 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "inv_2",
    orgId: "org_pulseai",
    name: "Vikram Sengupta",
    firm: "Blume Ventures",
    stage: "Pre-Seed / Seed",
    sectors: ["AI / ML", "Enterprise B2B", "FinTech"],
    ticketSize: "$300K - $750K",
    contactEmail: "vikram@blume.vc",
    linkedInUrl: "https://linkedin.com/in/vikramsengupta-blume",
    dealStage: "IN_DISCUSSION",
    notes: "Reviewing clinic cohort retention metrics and pricing model. Requested customer references.",
    lastContactDate: new Date(Date.now() - 7 * 86400000).toISOString(),
    nextFollowUpDate: new Date(Date.now() + 4 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "inv_3",
    orgId: "org_pulseai",
    name: "Siddharth Mehta",
    firm: "Surge / Peak XV",
    stage: "Early Stage",
    sectors: ["DeepTech", "AI", "SaaS"],
    ticketSize: "$500K - $2M",
    contactEmail: "smehta@peakxv.com",
    dealStage: "IDENTIFIED",
    notes: "Targeting next Surge cohort. Warm intro requested through IIT alumni partner.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "inv_4",
    orgId: "org_pulseai",
    name: "Ananya Deshmukh",
    firm: "Kalaari Capital",
    stage: "Seed",
    sectors: ["HealthTech", "Consumer & Enterprise Tech"],
    ticketSize: "$500K - $1.5M",
    contactEmail: "ananya@kalaari.com",
    dealStage: "CONTACTED",
    notes: "Intro email sent with 1-page teaser. Awaiting reply.",
    lastContactDate: new Date(Date.now() - 5 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

const initialPosts: Post[] = [
  {
    id: "post_1",
    authorId: "usr_founder_1",
    title: "How we signed our first 10 polyclinics without spending on paid ads",
    content:
      "When we launched PulseAI, we thought cold LinkedIn outreach would work. It didn't. Doctors are busy and rarely check DMs. What actually worked was offering a zero-friction 14-day shadowing trial during evening OPD hours. Here are the 3 key takeaways that changed our sales conversion from 4% to 32%...",
    topic: "Growth & Sales",
    commentCount: 6,
    reactionCount: 24,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: "post_2",
    authorId: "usr_founder_2",
    title: "Navigating DPIIT recognition and Startup India Tax Exemption (80-IAC) in 2026",
    content:
      "A complete checklist for founders preparing their Inter-Ministerial Board (IMB) application. Make sure your pitch deck clearly highlights technological innovation over mere operational service aggregation.",
    topic: "Legal & Grants",
    commentCount: 9,
    reactionCount: 41,
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
  {
    id: "post_3",
    authorId: "usr_founder_3",
    title: "AI Inference Latency vs Cost: Why we shifted from proprietary models to fine-tuned SLMs",
    content:
      "Sharing our benchmark data comparing proprietary cloud APIs against open weights running on local instances. Saved 68% monthly infra cost while cutting P95 latency to 1.4s.",
    topic: "Tech & Architecture",
    commentCount: 14,
    reactionCount: 52,
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 86400000).toISOString(),
  },
];

const initialComments: Comment[] = [
  {
    id: "cmt_1",
    postId: "post_1",
    authorId: "usr_founder_2",
    content: "Spot on about evening OPDs. Doctors are much more receptive when patient rush winds down around 8 PM.",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "cmt_2",
    postId: "post_1",
    authorId: "usr_founder_3",
    content: "Did you encounter pushback on data privacy during that trial period? How did you address consent?",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

const initialDocuments: DocumentItem[] = [
  {
    id: "doc_1",
    orgId: "org_pulseai",
    name: "PulseAI_Seed_PitchDeck_v2.4.pdf",
    category: "pitch_deck",
    size: "4.8 MB",
    url: "/docs/PulseAI_Seed_PitchDeck_v2.4.pdf",
    uploadedAt: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: "doc_2",
    orgId: "org_pulseai",
    name: "Financial_Model_Runway_Projection_2026.xlsx",
    category: "financials",
    size: "1.2 MB",
    url: "/docs/Financial_Model_Runway_Projection_2026.xlsx",
    uploadedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: "doc_3",
    orgId: "org_pulseai",
    name: "DPIIT_Recognition_Certificate.pdf",
    category: "legal",
    size: "420 KB",
    url: "/docs/DPIIT_Recognition_Certificate.pdf",
    uploadedAt: new Date(Date.now() - 40 * 86400000).toISOString(),
  },
  {
    id: "doc_4",
    orgId: "org_pulseai",
    name: "Clinical_Triage_Concordance_Study_Report.pdf",
    category: "research",
    size: "3.1 MB",
    url: "/docs/Clinical_Triage_Concordance_Study_Report.pdf",
    uploadedAt: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
];

// Helper to get or initialize persistent database
class DataStore {
  private db: DatabaseSchema;

  constructor() {
    this.db = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_PATH)) {
        const raw = fs.readFileSync(DB_PATH, "utf-8");
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn("Failed to read from persistent DB file, using defaults:", e);
    }

    const defaultDb: DatabaseSchema = {
      users: initialUsers,
      organizations: initialOrganizations,
      memberships: initialMemberships,
      projects: initialProjects,
      tasks: initialTasks,
      milestones: initialMilestones,
      goals: initialGoals,
      transactions: initialTransactions,
      opportunities: initialOpportunities,
      investors: initialInvestors,
      conversations: [],
      actionProposals: [],
      posts: initialPosts,
      comments: initialComments,
      documents: initialDocuments,
      auditLogs: [],
    };

    this.save(defaultDb);
    return defaultDb;
  }

  private save(data: DatabaseSchema) {
    try {
      const dir = path.dirname(DB_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch (e) {
      console.error("Failed to persist database file:", e);
    }
  }

  // --- Users & Orgs ---
  getUsers() {
    return this.db.users;
  }

  getUser(id: string) {
    return this.db.users.find((u) => u.id === id);
  }

  getUserByEmail(email: string) {
    return this.db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(user: User) {
    this.db.users.push(user);
    this.save(this.db);
    return user;
  }

  getOrganizations() {
    return this.db.organizations;
  }

  getOrganization(id: string) {
    return this.db.organizations.find((o) => o.id === id);
  }

  createOrganization(org: Organization, ownerId: string) {
    this.db.organizations.push(org);
    this.db.memberships.push({
      id: `mem_${Date.now()}`,
      userId: ownerId,
      orgId: org.id,
      role: "OWNER",
      createdAt: new Date().toISOString(),
    });
    this.save(this.db);
    return org;
  }

  updateOrganization(id: string, updates: Partial<Organization>) {
    const idx = this.db.organizations.findIndex((o) => o.id === id);
    if (idx === -1) return null;
    this.db.organizations[idx] = {
      ...this.db.organizations[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.save(this.db);
    return this.db.organizations[idx];
  }

  // --- Projects & Tasks ---
  getProjects(orgId: string) {
    return this.db.projects.filter((p) => p.orgId === orgId);
  }

  createProject(project: Project) {
    this.db.projects.push(project);
    this.save(this.db);
    return project;
  }

  getTasks(orgId: string) {
    const tasks = this.db.tasks.filter((t) => t.orgId === orgId);
    return tasks.map((t) => ({
      ...t,
      project: this.db.projects.find((p) => p.id === t.projectId),
      assignee: this.db.users.find((u) => u.id === t.assigneeId),
    }));
  }

  createTask(task: Task) {
    this.db.tasks.push(task);
    // update project task count
    if (task.projectId) {
      const proj = this.db.projects.find((p) => p.id === task.projectId);
      if (proj) {
        proj.taskCount = (proj.taskCount || 0) + 1;
        if (task.status === "COMPLETED") {
          proj.completedTaskCount = (proj.completedTaskCount || 0) + 1;
        }
      }
    }
    this.save(this.db);
    return task;
  }

  updateTask(id: string, updates: Partial<Task>) {
    const idx = this.db.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    const oldTask = this.db.tasks[idx];
    const updated = {
      ...oldTask,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    if (updates.status === "COMPLETED" && oldTask.status !== "COMPLETED") {
      updated.completedAt = new Date().toISOString();
    }
    this.db.tasks[idx] = updated;

    // recalculate project counts
    if (updated.projectId) {
      const proj = this.db.projects.find((p) => p.id === updated.projectId);
      if (proj) {
        const projTasks = this.db.tasks.filter((t) => t.projectId === proj.id);
        proj.taskCount = projTasks.length;
        proj.completedTaskCount = projTasks.filter((t) => t.status === "COMPLETED").length;
      }
    }

    this.save(this.db);
    return updated;
  }

  deleteTask(id: string) {
    const idx = this.db.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    const task = this.db.tasks[idx];
    this.db.tasks.splice(idx, 1);
    if (task.projectId) {
      const proj = this.db.projects.find((p) => p.id === task.projectId);
      if (proj) {
        const projTasks = this.db.tasks.filter((t) => t.projectId === proj.id);
        proj.taskCount = projTasks.length;
        proj.completedTaskCount = projTasks.filter((t) => t.status === "COMPLETED").length;
      }
    }
    this.save(this.db);
    return true;
  }

  // --- Milestones & Goals ---
  getMilestones(orgId: string) {
    return this.db.milestones
      .filter((m) => m.orgId === orgId)
      .sort((a, b) => a.order - b.order);
  }

  createMilestone(milestone: Milestone) {
    this.db.milestones.push(milestone);
    this.save(this.db);
    return milestone;
  }

  updateMilestone(id: string, updates: Partial<Milestone>) {
    const idx = this.db.milestones.findIndex((m) => m.id === id);
    if (idx === -1) return null;
    this.db.milestones[idx] = { ...this.db.milestones[idx], ...updates };
    this.save(this.db);
    return this.db.milestones[idx];
  }

  getGoals(orgId: string) {
    return this.db.goals.filter((g) => g.orgId === orgId);
  }

  createGoal(goal: Goal) {
    this.db.goals.push(goal);
    this.save(this.db);
    return goal;
  }

  updateGoal(id: string, updates: Partial<Goal>) {
    const idx = this.db.goals.findIndex((g) => g.id === id);
    if (idx === -1) return null;
    this.db.goals[idx] = { ...this.db.goals[idx], ...updates };
    this.save(this.db);
    return this.db.goals[idx];
  }

  // --- Financial Transactions ---
  getTransactions(orgId: string) {
    return this.db.transactions
      .filter((t) => t.orgId === orgId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  createTransaction(tx: Transaction) {
    this.db.transactions.push(tx);
    this.save(this.db);
    return tx;
  }

  // --- Opportunities ---
  getOpportunities() {
    return this.db.opportunities;
  }

  getOpportunity(id: string) {
    return this.db.opportunities.find((o) => o.id === id);
  }

  // --- Investors ---
  getInvestors(orgId: string) {
    return this.db.investors.filter((i) => i.orgId === orgId);
  }

  createInvestor(investor: Investor) {
    this.db.investors.push(investor);
    this.save(this.db);
    return investor;
  }

  updateInvestor(id: string, updates: Partial<Investor>) {
    const idx = this.db.investors.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    this.db.investors[idx] = { ...this.db.investors[idx], ...updates };
    this.save(this.db);
    return this.db.investors[idx];
  }

  // --- AI Conversations & Actions ---
  getConversations(orgId: string) {
    return this.db.conversations.filter((c) => c.orgId === orgId);
  }

  getConversation(id: string) {
    return this.db.conversations.find((c) => c.id === id);
  }

  saveConversation(convo: AIConversation) {
    const idx = this.db.conversations.findIndex((c) => c.id === convo.id);
    if (idx === -1) {
      this.db.conversations.unshift(convo);
    } else {
      this.db.conversations[idx] = convo;
    }
    this.save(this.db);
    return convo;
  }

  getActionProposals(conversationId?: string) {
    if (!conversationId) return this.db.actionProposals;
    return this.db.actionProposals.filter((p) => p.conversationId === conversationId);
  }

  createActionProposal(proposal: AIActionProposal) {
    this.db.actionProposals.push(proposal);
    this.save(this.db);
    return proposal;
  }

  updateActionProposal(id: string, updates: Partial<AIActionProposal>) {
    const idx = this.db.actionProposals.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.db.actionProposals[idx] = { ...this.db.actionProposals[idx], ...updates };
    this.save(this.db);
    return this.db.actionProposals[idx];
  }

  // --- Community Posts & Comments ---
  getPosts() {
    return this.db.posts.map((p) => ({
      ...p,
      author: this.db.users.find((u) => u.id === p.authorId),
    }));
  }

  createPost(post: Post) {
    this.db.posts.unshift(post);
    this.save(this.db);
    return post;
  }

  getComments(postId: string) {
    return this.db.comments
      .filter((c) => c.postId === postId)
      .map((c) => ({
        ...c,
        author: this.db.users.find((u) => u.id === c.authorId),
      }));
  }

  createComment(comment: Comment) {
    this.db.comments.push(comment);
    const post = this.db.posts.find((p) => p.id === comment.postId);
    if (post) {
      post.commentCount = (post.commentCount || 0) + 1;
    }
    this.save(this.db);
    return comment;
  }

  // --- Documents ---
  getDocuments(orgId: string) {
    return this.db.documents.filter((d) => d.orgId === orgId);
  }

  createDocument(doc: DocumentItem) {
    this.db.documents.push(doc);
    this.save(this.db);
    return doc;
  }

  // --- Audit Logs ---
  logAction(log: AuditLogItem) {
    this.db.auditLogs.unshift(log);
    this.save(this.db);
    return log;
  }
}

// Export singleton instance
export const dataStore = new DataStore();
