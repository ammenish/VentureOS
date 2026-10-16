import { calculateFinancialSummary } from "./src/lib/finance-engine.js";
import { matchOpportunity } from "./src/lib/opportunity-matcher.js";
import { evaluateFundingReadiness } from "./src/lib/funding-engine.js";

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failed++;
  }
}

console.log("=== Testing VentureOS Business Engines ===\n");

// 1. Finance Engine Tests
const dummyTransactions = [
  { id: "1", orgId: "org_1", type: "INCOME", amount: 200000, category: "SaaS", date: "2026-04-01", createdAt: "" },
  { id: "2", orgId: "org_1", type: "EXPENSE", amount: 100000, category: "Infra", date: "2026-04-02", createdAt: "" },
];
const finSummary = calculateFinancialSummary(dummyTransactions, 1000000);
assert(finSummary.totalRevenue === 200000, "Financial revenue correctly summed to ₹2,00,000");
assert(finSummary.totalExpenses === 100000, "Financial expenses correctly summed to ₹1,00,000");
assert(finSummary.netIncome === 100000, "Net income is positive (₹1,00,000)");
assert(finSummary.cashRunway === null, "Profitable / positive net income correctly gives null burn runway");

const burningTransactions = [
  { id: "1", orgId: "org_1", type: "INCOME", amount: 100000, category: "SaaS", date: "2026-04-01", createdAt: "" },
  { id: "2", orgId: "org_1", type: "EXPENSE", amount: 300000, category: "Infra", date: "2026-04-02", createdAt: "" },
];
const burnSummary = calculateFinancialSummary(burningTransactions, 1000000);
assert(burnSummary.monthlyBurn === 200000, "Monthly net burn computed to ₹2,00,000");
assert(burnSummary.cashRunway === 5, "Runway computed to exactly 5.0 months (₹10L / ₹2L)");

// 2. Opportunity Matcher Tests
const dummyOrg = {
  id: "org_test",
  name: "HealthTest",
  slug: "healthtest",
  industry: "HealthTech / AI",
  stage: "TRACTION",
  isRegistered: true,
  geographicMarket: "India",
  createdAt: "",
  updatedAt: "",
};
const dummyOpp = {
  id: "opp_test",
  name: "SISFS Seed Fund",
  provider: "DPIIT",
  category: "GOVERNMENT_SCHEME",
  description: "Seed fund",
  eligibleStages: ["TRACTION", "MVP"],
  eligibleIndustries: ["HealthTech", "AI"],
  eligibleLocations: ["All India"],
  status: "ACTIVE",
  createdAt: "",
};
const match = matchOpportunity(dummyOrg, dummyOpp);
assert(match.matchScore >= 80, "Matching score gives high strategic fit (>= 80%)");
assert(match.satisfiedCriteria.length >= 3, "Satisfied criteria accurately identified");

// 3. Funding Engine Tests
const funding = evaluateFundingReadiness(dummyOrg);
assert(funding.categories.length === 8, "Funding readiness evaluates all 8 diligence categories");

console.log(`\nTest Results: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
