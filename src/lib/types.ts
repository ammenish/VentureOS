// VentureOS Type Definitions

// ─── Enums ───
export type StartupStage =
  | "IDEA"
  | "VALIDATION"
  | "MVP"
  | "LAUNCH"
  | "TRACTION"
  | "GROWTH"
  | "FUNDING"
  | "SCALE";

export type TaskStatus =
  | "BACKLOG"
  | "TODO"
  | "IN_PROGRESS"
  | "BLOCKED"
  | "COMPLETED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TransactionType = "INCOME" | "EXPENSE";

export type OpportunityCategory =
  | "GOVERNMENT_SCHEME"
  | "GRANT"
  | "SUBSIDY"
  | "STARTUP_PROGRAM"
  | "INCUBATOR"
  | "ACCELERATOR"
  | "COMPETITION"
  | "TENDER"
  | "FUNDING";

export type OpportunityStatus = "ACTIVE" | "EXPIRED" | "UPCOMING" | "UNKNOWN";

export type InvestorStage =
  | "IDENTIFIED"
  | "CONTACTED"
  | "MEETING_SCHEDULED"
  | "IN_DISCUSSION"
  | "TERM_SHEET"
  | "CLOSED"
  | "PASSED";

export type MemberRole = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

// ─── User ───
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
  experience?: string;
  location?: string;
  interests?: string[];
  createdAt: string;
  updatedAt: string;
}

// ─── Organization / Workspace ───
export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  industry?: string;
  businessModel?: string;
  targetCustomers?: string;
  geographicMarket?: string;
  stage: StartupStage;
  teamSize?: number;
  productStatus?: string;
  revenue?: number;
  fundingHistory?: string;
  isRegistered?: boolean;
  customerCount?: number;
  challenges?: string[];
  goals?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface OrgMembership {
  id: string;
  userId: string;
  orgId: string;
  role: MemberRole;
  createdAt: string;
}

// ─── Project & Task ───
export interface Project {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  status: "ACTIVE" | "COMPLETED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
  taskCount?: number;
  completedTaskCount?: number;
}

export interface Task {
  id: string;
  orgId: string;
  projectId?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  assignee?: User;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
  project?: Project;
}

// ─── Milestone ───
export interface Milestone {
  id: string;
  orgId: string;
  title: string;
  description?: string;
  stage: StartupStage;
  targetDate?: string;
  completedAt?: string;
  isCompleted: boolean;
  order: number;
  createdAt: string;
}

// ─── Goal ───
export interface Goal {
  id: string;
  orgId: string;
  title: string;
  description?: string;
  targetDate?: string;
  progress: number; // 0-100
  isCompleted: boolean;
  createdAt: string;
}

// ─── Financial ───
export interface Transaction {
  id: string;
  orgId: string;
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  date: string;
  createdAt: string;
}

export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netIncome: number;
  cashBalance: number;
  monthlyBurn: number;
  cashRunway: number | null; // months, null if not calculable
  revenueGrowth: number | null; // percentage
  monthlyData: {
    month: string;
    revenue: number;
    expenses: number;
  }[];
}

// ─── Opportunity ───
export interface Opportunity {
  id: string;
  name: string;
  provider: string;
  category: OpportunityCategory;
  description: string;
  eligibleIndustries?: string[];
  eligibleLocations?: string[];
  eligibleStages?: StartupStage[];
  eligibilityRequirements?: string[];
  benefits?: string[];
  applicationDeadline?: string;
  requiredDocuments?: string[];
  officialSourceUrl?: string;
  lastVerifiedDate?: string;
  status: OpportunityStatus;
  isDemo?: boolean;
  createdAt: string;
}

export interface OpportunityMatch {
  opportunity: Opportunity;
  matchScore: number;
  satisfiedCriteria: string[];
  missingCriteria: string[];
  uncertainCriteria: string[];
  explanation: string;
}

// ─── Funding ───
export interface FundingReadiness {
  categories: {
    name: string;
    status: "READY" | "PARTIAL" | "NOT_READY";
    completedItems: string[];
    missingItems: string[];
    recommendations: string[];
  }[];
}

export interface Investor {
  id: string;
  orgId: string;
  name: string;
  firm?: string;
  stage?: string;
  sectors?: string[];
  ticketSize?: string;
  contactEmail?: string;
  linkedInUrl?: string;
  dealStage: InvestorStage;
  notes?: string;
  lastContactDate?: string;
  nextFollowUpDate?: string;
  createdAt: string;
}

// ─── AI ───
export interface AIConversation {
  id: string;
  orgId: string;
  userId: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
  messages: AIMessage[];
}

export interface AIMessage {
  id: string;
  conversationId: string;
  role: "user" | "assistant" | "system";
  content: string;
  toolCalls?: AIToolCall[];
  createdAt: string;
}

export interface AIToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
  result?: unknown;
  status: "PENDING" | "APPROVED" | "EXECUTED" | "REJECTED" | "FAILED";
}

export interface AIActionProposal {
  id: string;
  conversationId: string;
  messageId: string;
  toolName: string;
  arguments: Record<string, unknown>;
  description: string;
  status: "PENDING" | "APPROVED" | "EXECUTED" | "REJECTED" | "FAILED";
  result?: unknown;
  createdAt: string;
  executedAt?: string;
}

// ─── Community ───
export interface Post {
  id: string;
  authorId: string;
  author?: User;
  title: string;
  content: string;
  topic?: string;
  commentCount: number;
  reactionCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author?: User;
  content: string;
  createdAt: string;
}

// ─── Dashboard ───
export interface DashboardData {
  startup: Organization;
  metrics: {
    revenue?: number;
    expenses?: number;
    cashBalance?: number;
    cashRunway?: number | null;
    customerCount?: number;
    taskCount: number;
    completedTasks: number;
    overdueTasks: number;
    projectCount: number;
  };
  recentTasks: Task[];
  upcomingMilestones: Milestone[];
  completedMilestones: Milestone[];
  goals: Goal[];
  aiInsights: AIInsight[];
  recommendedOpportunities: OpportunityMatch[];
}

export interface AIInsight {
  id: string;
  observation: string;
  supportingData?: string;
  whyItMatters: string;
  suggestedAction: string;
  moduleLink?: string;
  category: "growth" | "risk" | "opportunity" | "operations" | "finance";
}

// ─── Onboarding ───
export interface OnboardingData {
  founder: {
    name: string;
    role: string;
    experience: string;
    location: string;
    interests: string[];
  };
  startup: {
    name: string;
    industry: string;
    description: string;
    businessModel: string;
    targetCustomers: string;
    geographicMarket: string;
  };
  stage: StartupStage;
  businessStatus: {
    teamSize?: number;
    productStatus?: string;
    revenue?: number;
    fundingHistory?: string;
    isRegistered?: boolean;
    customerCount?: number;
    challenges?: string[];
  };
  goals: string[];
}

// ─── API Response ───
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
