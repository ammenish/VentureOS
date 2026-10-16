import { Opportunity, Organization, OpportunityMatch } from "./types";

/**
 * Intelligent Opportunity Matching Engine for Indian Startup Schemes & Grants
 * Performs multi-criteria qualification scoring without claiming legal certainty.
 */
export function matchOpportunity(
  startup: Organization,
  opportunity: Opportunity
): OpportunityMatch {
  const satisfiedCriteria: string[] = [];
  const missingCriteria: string[] = [];
  const uncertainCriteria: string[] = [];

  let score = 0;
  const maxScore = 100;

  // 1. Stage Compatibility (Weight: 25)
  if (opportunity.eligibleStages && opportunity.eligibleStages.length > 0) {
    if (opportunity.eligibleStages.includes(startup.stage)) {
      satisfiedCriteria.push(`Current stage (${startup.stage}) matches target cohort stages`);
      score += 25;
    } else {
      missingCriteria.push(
        `Startup stage is ${startup.stage}, but program specifically seeks: ${opportunity.eligibleStages.join(", ")}`
      );
    }
  } else {
    satisfiedCriteria.push("Open to all startup stages");
    score += 25;
  }

  // 2. Industry / Domain Fit (Weight: 30)
  if (opportunity.eligibleIndustries && opportunity.eligibleIndustries.length > 0) {
    const startupInd = (startup.industry || "").toLowerCase();
    const matchesIndustry = opportunity.eligibleIndustries.some((ind) => {
      const lower = ind.toLowerCase();
      return (
        lower === "all tech" ||
        startupInd.includes(lower) ||
        lower.includes("health") && startupInd.includes("health") ||
        lower.includes("ai") && startupInd.includes("ai") ||
        lower.includes("saas") && startupInd.includes("saas")
      );
    });

    if (matchesIndustry) {
      satisfiedCriteria.push(`Industry focus (${startup.industry}) aligns with eligible sectors`);
      score += 30;
    } else {
      missingCriteria.push(
        `Sector mismatch: requires one of [${opportunity.eligibleIndustries.join(", ")}]`
      );
    }
  } else {
    satisfiedCriteria.push("No restrictive sector limitation specified");
    score += 30;
  }

  // 3. Geographic / Location Eligibility (Weight: 20)
  if (opportunity.eligibleLocations && opportunity.eligibleLocations.length > 0) {
    const startupMarket = (startup.geographicMarket || "").toLowerCase();
    const isPanIndia = opportunity.eligibleLocations.some((loc) =>
      loc.toLowerCase().includes("all india") || loc.toLowerCase().includes("pan-india")
    );

    if (isPanIndia || startupMarket.includes("india")) {
      satisfiedCriteria.push("Entity based within target operational geography (India)");
      score += 20;
    } else {
      uncertainCriteria.push("Requires confirmation of registered address in designated state");
      score += 10;
    }
  } else {
    satisfiedCriteria.push("Applicable nationally");
    score += 20;
  }

  // 4. Registration & Incorporation Check (Weight: 15)
  if (startup.isRegistered) {
    satisfiedCriteria.push("Entity is officially registered (Pvt Ltd / LLP)");
    score += 15;
  } else {
    missingCriteria.push("Requires formalized incorporation certificate (MCA registration)");
  }

  // 5. Verification / Diligence nuances (Weight: 10)
  if (opportunity.lastVerifiedDate) {
    satisfiedCriteria.push(`Guidelines verified current as of ${opportunity.lastVerifiedDate}`);
    score += 10;
  } else {
    uncertainCriteria.push("Latest annual budgetary revision needs confirmation with nodal incubator");
    score += 5;
  }

  // Normalize score
  const matchScore = Math.min(Math.round(score), maxScore);

  // Formulate clear, non-hallucinated explanation
  let explanation = "";
  if (matchScore >= 80) {
    explanation = `High strategic fit (${matchScore}% match). Your startup's industry (${startup.industry}) and ${startup.stage} stage meet primary qualification criteria.`;
  } else if (matchScore >= 55) {
    explanation = `Moderate relevance (${matchScore}% match). Program accepts your domain, but verify stage-specific requirements with the evaluating center.`;
  } else {
    explanation = `Low immediate fit (${matchScore}% match). Potential misalignment in lifecycle stage or sector requirements.`;
  }

  return {
    opportunity,
    matchScore,
    satisfiedCriteria,
    missingCriteria,
    uncertainCriteria,
    explanation,
  };
}

/**
 * Batch match and rank all opportunities for a given startup
 */
export function rankOpportunitiesForStartup(
  startup: Organization,
  opportunities: Opportunity[]
): OpportunityMatch[] {
  return opportunities
    .map((opp) => matchOpportunity(startup, opp))
    .sort((a, b) => b.matchScore - a.matchScore);
}
