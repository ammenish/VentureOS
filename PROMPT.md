<USER_REQUEST>
# VENTUREOS: BUILD A COMPLETE AI-POWERED STARTUP OPERATING SYSTEM

## 1. YOUR ROLE

Act as a senior full-stack engineer, AI engineer, product designer, UI/UX architect, database architect, and DevOps engineer.

Your task is to design and build VentureOS, a production-minded, AI-powered startup operating system that helps founders manage their businesses from Day 1 through validation, launch, growth, fundraising, and scaling.

Do not stop at generating a landing page or static dashboard. Build a complete, functional web application with a connected frontend, backend, database, authentication, AI capabilities, and working business workflows.

Make sensible technical and product decisions independently. Do not repeatedly ask me to choose libraries, colors, layouts, or implementation details.

If a required external API credential is unavailable, implement the integration interface, environment variable configuration, and a graceful demo mode. Never fabricate successful API responses or pretend an integration is live when it is not.

Before making changes, inspect the existing project, its files, dependencies, and current implementation. Preserve useful existing code and build upon it instead of unnecessarily replacing everything.

---

# 2. PRODUCT VISION

Product name: VentureOS

Product category: AI-powered Startup Operating System.

Tagline: Build Smarter. Grow Faster.

Core vision:

VentureOS is an intelligent workspace that helps founders build, operate, manage, and scale their startups from the idea stage to fundraising and beyond.

The platform combines:

1. Startup lifecycle management.
2. AI-powered business management.
3. Task and project management.
4. Financial tracking and business analytics.
5. Government schemes and grant discovery.
6. Incubator, accelerator, and funding opportunity discovery.
7. Funding readiness and investor management.
8. Founder community and mentorship.
9. AI-generated plans, insights, and recommendations.
10. A unified startup knowledge base.

The main differentiator is the integration of these capabilities into one intelligent system.

VentureOS must understand a startup's profile, current stage, goals, team, operations, available financial data, and challenges. It should use that context to deliver relevant recommendations and help founders execute approved actions.

The product should not feel like a collection of disconnected SaaS tools.

It should feel like one intelligent command center for running a startup.

---

# 3. NON-NEGOTIABLE DESIGN REQUIREMENT: LIGHT MODE ONLY

The entire application must use a premium LIGHT MODE color palette.

Do not create a dark-mode interface.

Do not use dark dashboard backgrounds, black glassmorphism, or dark-mode design templates.

Use the following design system consistently throughout the website, dashboard, forms, charts, modals, navigation, and AI interfaces.

## Color palette

* Main application background: #F8FAFC
* Primary card background: #FFFFFF
* Primary brand color: #4F46E5
* Primary hover color: #4338CA
* Secondary accent: #0EA5E9
* Main text: #0F172A
* Secondary text: #64748B
* Borders: #E2E8F0
* Success: #059669
* Warning: #D97706
* Error: #DC2626
* Subtle violet background: #EEF2FF
* Subtle blue background: #F0F9FF

Use gradients sparingly, primarily for the landing-page hero, important CTAs, and selected AI visual elements.

## Visual style

The interface should feel:

* Premium.
* Modern.
* Intelligent.
* Clean.
* Immersive.
* Professional.
* Trustworthy.
* Spacious.
* Product-led.

Use white cards, subtle shadows, thin borders, rounded corners, generous whitespace, clear typography, and purposeful animations.

Avoid excessive gradients, excessive rounded elements, visual clutter, generic templates, and unnecessary decoration.

Use a consistent spacing system and typography scale.

Use Geist or Inter for typography.

Use lucide-react for icons.

Build a cohesive design system with reusable components.

## UI quality requirements

Every page must have:

* Clear information hierarchy.
* Consistent spacing.
* Responsive layouts.
* Accessible color contrast.
* Proper loading states.
* Useful empty states.
* Error states.
* Toast notifications where appropriate.
* Keyboard-accessible interactions.
* Consistent button and form styles.

The application must work well on desktop, tablet, and mobile.

Desktop should receive the primary design attention, but mobile layouts must remain fully usable.

---

# 4. TECHNOLOGY STACK

Use the following architecture unless the existing project has a strong reason to retain an equivalent technology.

## Frontend

* Next.js with App Router.
* React.
* TypeScript.
* Tailwind CSS.
* shadcn/ui.
* Motion for React animations.
* lucide-react.
* Recharts for analytics.
* React Flow for workflow visualization where useful.
* React Hook Form.
* Zod.
* TanStack Query when appropriate for server-state management.

Use stable, compatible package versions.

## Backend

* NestJS.
* TypeScript.
* REST APIs.
* OpenAPI/Swagger documentation.
* Prisma ORM.

## Database

* PostgreSQL.
* Proper relational schema.
* Database migrations.
* Foreign keys.
* Appropriate indexes.
* Transactions where necessary.

## AI

* Integrate an LLM through a dedicated application service.
* Prefer the OpenAI API when credentials are provided.
* Keep the model provider configurable.
* Use structured outputs and tool calling.
* Use Python and FastAPI for specialized AI processing if needed.
* Use pgvector for semantic search when justified.
* Use retrieval-augmented generation for relevant business documents and knowledge.

## Background processing

Introduce Redis and BullMQ for scheduled jobs, document processing, and asynchronous tasks when required.

## File storage

Use private S3-compatible object storage for documents.

During local development, support a clearly identified development storage adapter if cloud credentials are unavailable.

## Authentication

Use a secure authentication solution compatible with the architecture.

Support:

* Registration.
* Login.
* Logout.
* Session management.
* Password recovery where supported.
* User profiles.
* Organization membership.
* Role-based authorization.

## Testing

* Unit tests.
* API integration tests.
* End-to-end tests.
* AI evaluation tests.
* Authorization tests.

## Deployment

Use environment-based configuration and Docker where appropriate.

The project should be straightforward to run locally and deploy to managed hosting.

---

# 5. PROJECT STRUCTURE

Prefer a maintainable monorepo.

Suggested structure:

ventureos/
apps/
web/
api/
ai-service/
packages/
ui/
types/
validation/
api-client/
infrastructure/
docker/
docs/
architecture/
api/
README.md
.env.example

The AI service can be added when needed rather than being an unnecessary initial dependency.

The web application must not directly access the database using privileged credentials.

The backend must own authorization and business rules.

Keep modules separated by domain and responsibility.

Avoid giant components, monolithic controllers, duplicated validation, and unnecessary abstractions.

---

# 6. PUBLIC WEBSITE

Build a beautiful, immersive marketing website for VentureOS.

## Landing page

Create a polished light-mode landing page with:

### Navigation

* VentureOS logo.
* Product.
* Features.
* Solutions.
* How It Works.
* Sign In.
* Get Started.

Use a clean, sticky navigation bar with subtle scroll behavior.

### Hero section

Headline:

"Your startup deserves more than a collection of tools."

Supporting text:

"Meet VentureOS, the intelligent workspace that helps you build your startup, manage your business, discover opportunities, and prepare for growth."

Primary CTA:

"Build Your Startup"

Secondary CTA:

"Explore VentureOS"

The hero should contain an attractive, interactive representation of the VentureOS ecosystem.

Represent startup lifecycle stages and interconnected capabilities through elegant visual elements, cards, nodes, or an animated product preview.

Use subtle motion and gradients.

Do not make the hero visually overwhelming.

### Problem section

Explain the fragmentation founders face when using separate tools for business management, financial tracking, government schemes, funding, documents, and collaboration.

### Solution section

Show how VentureOS unifies these workflows.

### Product preview

Create attractive, realistic previews of:

* AI Startup Manager.
* Startup dashboard.
* Opportunity discovery.
* Business analytics.
* Funding readiness.
* Founder network.

Use consistent UI elements.

### Lifecycle section

Visually show:

IDEA â†’ VALIDATION â†’ BUILD â†’ LAUNCH â†’ TRACTION â†’ GROWTH â†’ FUNDING â†’ SCALE

Each stage should reveal relevant capabilities.

### Feature section

Create polished feature cards with meaningful descriptions and icons.

### How it works

1. Create your startup workspace.
2. Tell VentureOS about your business and goals.
3. Receive a personalized roadmap.
4. Execute tasks and manage operations.
5. Discover opportunities and prepare for growth.

### Final CTA

Headline:

"Your next chapter starts here."

CTA:

"Create Your Workspace"

### Footer

Include product links, documentation, privacy, terms, contact, and social links.

Do not create fake company addresses, certifications, testimonials, partnerships, or customer logos.

---

# 7. AUTHENTICATION AND ONBOARDING

Implement working registration, login, session handling, and protected application routes.

After registration, guide users through a polished onboarding wizard.

## Step 1: Founder profile

Collect:

* Name.
* Role.
* Experience.
* Location.
* Areas of interest.

## Step 2: Startup profile

Collect:

* Startup name.
* Industry.
* Business description.
* Business model.
* Target customers.
* Geographic market.

## Step 3: Startup stage

Options:

* Exploring an idea.
* Validating an idea.
* Building an MVP.
* Preparing to launch.
* Generating revenue.
* Growing an established business.
* Preparing for funding.
* Scaling.

## Step 4: Business status

Ask relevant questions about:

* Team size.
* Product status.
* Revenue.
* Funding history.
* Company registration.
* Customer base.
* Current challenges.

Allow users to skip questions they cannot yet answer.

## Step 5: Goals

Examples:

* Validate my idea.
* Launch an MVP.
* Acquire my first customers.
* Discover government schemes.
* Prepare for fundraising.
* Improve profitability.
* Expand into new markets.

## Step 6: Workspace generation

Create:

* Startup profile.
* Initial lifecycle roadmap.
* Suggested milestones.
* Initial tasks.
* Goal tracking.
* Personalized dashboard.
* Opportunity discovery profile.

The AI-generated roadmap must be editable.

Do not invent business data.

Clearly distinguish user-provided information from AI-generated suggestions.

---

# 8. MAIN APPLICATION LAYOUT

Build an elegant, persistent dashboard layout.

Use:

* Light background.
* White sidebar or subtly tinted navigation.
* Compact top navigation.
* Main content area.
* Responsive mobile navigation.
* Workspace switcher.
* Search.
* Notifications.
* User profile menu.

Suggested sidebar:

VENTUREOS

WORKSPACE

* Overview
* AI Manager
* My Startup
* Roadmap
* Tasks & Projects
* Business Analytics
* Finance
* Customers / CRM

OPPORTUNITIES

* Government Schemes
* Grants & Funding
* Incubators & Accelerators
* Tenders & Programs

GROWTH

* Funding Readiness
* Investor Pipeline
* Growth Intelligence

COMMUNITY

* Founder Network
* Mentors
* Discussions

SETTINGS

* Team
* Documents
* Integrations
* Settings

Only display a feature as fully functional when its core workflow works.

For incomplete modules, use clearly labeled coming-soon states rather than fake functionality.

---

# 9. STARTUP DASHBOARD

Build a polished, data-driven dashboard.

## Header

Display:

* Greeting.
* Startup name.
* Current lifecycle stage.
* Date-aware overview.
* Quick actions.

## Startup health

Show a useful summary of:

* Progress toward goals.
* Upcoming milestones.
* Overdue tasks.
* Financial health, when data exists.
* Outstanding priorities.

Do not invent an overall startup-health score without defining its calculation.

## Business metrics

Support relevant metrics such as:

* Revenue.
* Expenses.
* Cash balance.
* Cash runway.
* Customer count.
* Customer growth.
* Task completion.
* Project progress.

Display unavailable metrics as empty states or prompts to add data.

## AI insights

Display actionable insight cards.

Each insight should include:

* Observation.
* Supporting data.
* Why it matters.
* Suggested next action.
* Relevant module link.

## Opportunity recommendations

Display relevant opportunities with:

* Name.
* Category.
* Provider.
* Deadline.
* Matching explanation.
* Verification status.

## Upcoming tasks

Display:

* Task title.
* Priority.
* Owner.
* Due date.
* Status.

## Startup roadmap

Display completed milestones, current priorities, and upcoming milestones.

Use Recharts for appropriate visualizations.

Every chart must use real application data or clearly identified demo data.

---

# 10. STARTUP LIFECYCLE ENGINE

Implement a lifecycle model covering:

1. Idea.
2. Validation.
3. MVP.
4. Launch.
5. Traction.
6. Growth.
7. Funding.
8. Scale.

Allow founders to update their current stage and goals.

Provide stage-specific templates and recommendations.

### Idea stage

* Problem definition.
* Customer interviews.
* Market research.
* Competitor analysis.

### Validation stage

* Demand testing.
* Business model development.
* Customer feedback.
* Initial pricing hypotheses.

### MVP stage

* Product roadmap.
* Development milestones.
* User testing.
* Feedback collection.

### Launch stage

* Launch planning.
* Marketing activities.
* Customer onboarding.
* Sales preparation.

### Traction stage

* Conversion tracking.
* Retention.
* Revenue analysis.
* Customer acquisition.

### Growth stage

* Hiring.
* Process improvement.
* Marketing optimization.
* Operational planning.

### Funding stage

* Financial preparation.
* Pitch deck.
* Investor pipeline.
* Due-diligence checklist.

### Scale stage

* Market expansion.
* Team development.
* Process standardization.
* Growth planning.

Do not assume every startup follows a strictly linear journey.

Support overlapping goals and stage-specific recommendations.

---

# 11. TASK AND PROJECT MANAGEMENT

Build a functional task management system.

Features:

* Create, edit, and delete tasks.
* Projects.
* Task descriptions.
* Priority.
* Status.
* Due dates.
* Assignments.
* Milestones.
* Dependencies where practical.
* Comments or activity history.
* Search and filters.

Views:

* List.
* Kanban.
* Calendar.
* Project timeline.

Use clear statuses:

* Backlog.
* To Do.
* In Progress.
* Blocked.
* Completed.

Provide responsive layouts.

Allow the AI to propose task plans and create tasks only after the required validation and approval.

---

# 12. FINANCE AND BUSINESS ANALYTICS

Implement a lightweight financial management module.

Features:

* Income records.
* Expense records.
* Categories.
* Monthly summaries.
* Revenue and expense charts.
* Budget tracking.
* Cash balance.
* Cash runway estimate.
* Exportable reports.

Financial calculations must be performed by deterministic backend code.

For example:

Cash runway = Available cash / Average monthly net cash burn.

Handle zero burn, negative burn, missing history, and highly variable cash flow appropriately.

Clearly label estimates and their assumptions.

Do not describe this module as a complete accounting or tax-compliance system.

Do not execute payments.

Build a business analytics layer that can provide structured metrics to the AI assistant.

---

# 13. VENTUREOS AI MANAGER

Build the AI Manager as a central, context-aware assistant.

The interface should be integrated into the dashboard rather than feeling like a disconnected chatbot.

## UI

Create:

* Conversation history.
* New conversation.
* Chat input.
* Streaming responses when supported.
* Suggested prompts.
* Markdown rendering.
* Source references where relevant.
* Action proposal cards.
* Approval buttons.
* Execution results.
* Loading and error states.

Suggested prompts:

* What should I prioritize this week?
* Analyze my business performance.
* Find relevant government schemes.
* Create a launch plan.
* Help me prepare for funding.
* Identify overdue milestones.
* Suggest growth opportunities.

## AI capabilities

The assistant should:

1. Understand the user's question.
2. Retrieve relevant startup context.
3. Fetch relevant business metrics.
4. Search approved knowledge sources when necessary.
5. Generate a structured response.
6. Explain the evidence behind important recommendations.
7. Propose useful actions.
8. Execute approved actions through backend services.

## AI tools

Initially support tools such as:

* get_startup_profile
* get_startup_goals
* get_task_summary
* get_financial_summary
* search_opportunities
* create_task
* create_project
* propose_roadmap
* generate_funding_checklist
* summarize_business_metrics

Validate every tool call.

Check organization membership and permissions server-side.

Use schemas for structured outputs.

Do not expose database credentials or unrestricted database queries to the model.

Do not allow the AI to bypass authorization.

Do not fabricate financial figures, business metrics, official schemes, deadlines, or eligibility claims.

Require confirmation for consequential external actions.

Track AI usage, latency, errors, and estimated cost.

Provide useful error messages when the model provider is unavailable.

---

# 14. GOVERNMENT SCHEMES AND OPPORTUNITY ENGINE

Build a structured opportunity discovery module, initially focused on India.

Categories:

* Government schemes.
* Grants.
* Subsidies.
* Startup programs.
* Incubators.
* Accelerators.
* Competitions.
* Tenders.
* Funding opportunities.

## Opportunity listing

Create:

* Search.
* Category filters.
* Industry filters.
* Stage filters.
* Geographic filters.
* Deadline filters.
* Saved opportunities.
* Detail pages.

## Opportunity details

Each record should support:

* Opportunity name.
* Provider.
* Category.
* Description.
* Eligible industries.
* Eligible locations.
* Startup stage.
* Eligibility requirements.
* Benefits.
* Application deadline.
* Required documents.
* Official source.
* Last verified date.
* Status.

## Matching engine

Match opportunities against:

* Startup industry.
* Location.
* Stage.
* Incorporation status.
* Other documented eligibility criteria.

Display:

* Why the opportunity matches.
* Which criteria appear satisfied.
* Which criteria are missing.
* Which criteria remain uncertain.
* Required documents.
* Official application link.
* Deadline.
* Last verification date.

Do not automatically claim legal eligibility.

The system must distinguish potential relevance from verified eligibility.

## Data ingestion

Create a maintainable ingestion pipeline with:

* Scheduled collection where permitted.
* Data normalization.
* Source tracking.
* Duplicate detection.
* Deadline validation.
* Manual verification.
* Stale-data detection.

Prefer official sources and authorized APIs.

For the initial version, support a curated dataset with manually verified records.

Do not populate the database with fabricated schemes.

If live data ingestion is unavailable, provide clearly labeled sample records only in demo mode.

---

# 15. FUNDING READINESS

Create a dedicated funding readiness module.

## Readiness categories

* Business model.
* Market understanding.
* Product maturity.
* Customer traction.
* Financial records.
* Team.
* Legal documentation.
* Pitch materials.

Show each category separately.

Display missing evidence and recommended next actions.

Do not create an unexplained funding-readiness percentage.

## Pitch deck assistance

Generate structured draft content for:

1. Problem.
2. Solution.
3. Product.
4. Market.
5. Business model.
6. Traction.
7. Competition.
8. Go-to-market strategy.
9. Team.
10. Financial outlook.
11. Funding requirement.
12. Use of funds.

Use verified startup information.

If information is missing, ask the founder rather than inventing metrics.

## Investor pipeline

Support:

* Investor profiles.
* Investment stage.
* Sector preferences.
* Ticket size where known.
* Contact information supplied by authorized sources or users.
* Outreach history.
* Meeting notes.
* Follow-up dates.
* Deal stage.

Do not fabricate investor profiles or claim that investors are interested in a startup without evidence.

---

# 16. FOUNDER COMMUNITY

Build the initial community with:

* Founder profiles.
* Posts.
* Comments.
* Reactions.
* Topic-based discussions.
* Questions and answers.
* Collaboration requests.
* Reporting.
* Moderation controls.

Design the community to feel integrated with VentureOS.

Provide privacy controls for founder profiles.

Do not publicly expose financial data or confidential startup documents.

Build basic moderation and abuse-reporting workflows.

Mentorship scheduling, hiring, and advanced founder matching can be introduced later.

---

# 17. DOCUMENT MANAGEMENT

Create a secure document workspace.

Features:

* Upload documents.
* Categorize documents.
* Search document metadata.
* View document details.
* Track document status.
* Store version metadata.
* Download authorized documents.
* Delete documents where permitted.

Use private object storage.

Validate file types and sizes.

Do not make uploaded documents publicly accessible.

Future AI document processing should support:

* Document summaries.
* Information extraction.
* Search.
* Funding checklist support.
* Document classification.

Do not claim that a document has been verified merely because an AI model summarized it.

---

# 18. DATABASE AND MULTI-TENANCY

Use PostgreSQL with Prisma.

Create a well-structured schema for:

* Users.
* Organizations.
* Organization memberships.
* Startup profiles.
* Startup goals.
* Milestones.
* Projects.
* Tasks.
* Financial transactions.
* Budgets.
* Customers.
* Leads.
* Opportunities.
* Eligibility rules.
* Opportunity matches.
* Funding profiles.
* Investors.
* Investor interactions.
* Documents.
* AI conversations.
* AI messages.
* AI action proposals.
* AI action logs.
* Community posts.
* Comments.
* Notifications.
* Audit logs.

Use appropriate relations, indexes, constraints, timestamps, and migrations.

Support multiple users and multiple startup workspaces.

Enforce organization-level data isolation.

Every request involving private startup data must verify the current user's authorization.

Do not trust a workspace ID supplied by the frontend.

Use transactions for operations that require atomicity.

Never expose private records through unprotected endpoints.

---

# 19. API ARCHITECTURE

Build documented REST endpoints under /v1.

Example routes:

POST /v1/startups
GET /v1/startups/:id
PATCH /v1/startups/:id
GET /v1/startups/:id/dashboard

GET /v1/startups/:id/roadmap
POST /v1/projects
GET /v1/projects
POST /v1/tasks
PATCH /v1/tasks/:id

GET /v1/finance/summary
POST /v1/finance/transactions

GET /v1/opportunities
GET /v1/opportunities/:id
POST /v1/opportunities/match

GET /v1/funding/readiness
POST /v1/funding/pitch-draft

POST /v1/ai/chat
GET /v1/ai/conversations
POST /v1/ai/actions/propose
POST /v1/ai/actions/:id/approve
POST /v1/ai/actions/:id/execute

GET /v1/community/posts
POST /v1/community/posts

These are initial API design examples. Adapt them to the actual implementation.

Implement validation, authorization, consistent errors, pagination, and rate limiting.

Generate OpenAPI documentation.

---

# 20. SECURITY REQUIREMENTS

Implement security from the beginning.

Required measures:

* Secure authentication and sessions.
* Server-side authorization.
* Organization membership checks.
* Input validation.
* Rate limiting.
* Secure secrets management.
* HTTPS in deployed environments.
* Safe file uploads.
* Private object storage.
* Audit logs.
* Dependency vulnerability checks.
* Protection against injection attacks.
* CSRF protection where applicable.
* Secure error handling.
* Database backup procedures.

For AI:

* Treat retrieved documents and external webpages as untrusted.
* Defend against prompt injection.
* Never expose secrets to the model.
* Validate AI-generated tool arguments.
* Check permissions independently of model output.
* Require approval for consequential actions.
* Record important action proposals and execution outcomes.

Use least-privilege access.

Do not hardcode API keys or passwords.

Create an .env.example file containing variable names and placeholders, never real credentials.

---

# 21. RESPONSIVENESS AND INTERACTIONS

The application must have high-quality interaction design.

Implement:

* Smooth route transitions where appropriate.
* Hover and focus states.
* Animated loading indicators.
* Skeleton loaders.
* Toast notifications.
* Confirmation dialogs.
* Search and filter interactions.
* Responsive charts.
* Accessible modals.
* Empty states with clear CTAs.
* Error boundaries.
* Keyboard navigation.

Use Motion for subtle, purposeful animations.

Use Three.js or React Three Fiber only for selective visual elements where it provides genuine value.

Do not make routine business workflows dependent on 3D rendering.

Keep performance and accessibility as priorities.

Respect reduced-motion preferences.

---

# 22. IMPLEMENTATION PHASES

Build the application incrementally.

## Phase 1: Foundation

* Inspect existing repository.
* Establish project structure.
* Configure frontend and backend.
* Configure environment variables.
* Set up database.
* Implement authentication.
* Establish design tokens.
* Create reusable UI components.

## Phase 2: Frontend

* Landing page.
* Navigation.
* Sign-in and registration.
* Onboarding.
* Dashboard shell.
* Responsive sidebar.
* Core page layouts.
* Loading and empty states.

## Phase 3: Core backend

* Users.
* Organizations.
* Memberships.
* Startup profiles.
* Lifecycle stages.
* Goals.
* Tasks.
* Projects.
* Dashboard APIs.

## Phase 4: Operations

* Financial records.
* Business analytics.
* CRM basics.
* Document metadata.
* Activity tracking.

## Phase 5: AI Manager

* Chat interface.
* LLM integration.
* Startup context.
* Structured outputs.
* Tool calling.
* Action proposals.
* Approval workflows.
* Audit logs.
* Evaluation tests.

## Phase 6: Opportunities

* Opportunity database.
* Search and filtering.
* Curated source data.
* Matching engine.
* Eligibility explanations.
* Deadline tracking.
* Verification workflow.

## Phase 7: Funding

* Readiness checklist.
* Pitch draft generation.
* Investor pipeline.
* Document tracking.

## Phase 8: Community

* Founder profiles.
* Discussions.
* Comments.
* Reporting.
* Moderation.

## Phase 9: Production readiness

* Automated tests.
* Authorization checks.
* Performance improvements.
* Monitoring.
* Backup procedures.
* Deployment documentation.
* End-to-end testing.

Prioritize completing coherent workflows over creating many incomplete screens.

---

# 23. DEVELOPMENT WORKFLOW

Follow these rules throughout development.

1. Inspect the repository before making changes.
2. Identify the current implementation and dependencies.
3. Create a concise implementation plan.
4. Establish the architecture and design system.
5. Implement features in logical phases.
6. Connect every major UI workflow to real backend functionality.
7. Add database migrations.
8. Validate inputs on the server.
9. Test authorization.
10. Run the application.
11. Run linting, type checking, and tests.
12. Fix build and runtime errors.
13. Verify responsive behavior.
14. Document setup and configuration.
15. Maintain a progress checklist.

Do not overwrite working functionality unnecessarily.

Do not stop after creating a plan or a set of mockups.

Continue implementing the highest-priority working slice.

If the project is too large for one pass, complete one coherent phase, document what remains, and continue with the next phase.

Do not silently skip unfinished work.

Do not claim tests passed unless they were actually run.

Do not claim the application is production-ready without performing the relevant checks.

---

# 24. ENVIRONMENT CONFIGURATION

Create a documented .env.example with appropriate placeholders.

Include variables only for integrations that are actually implemented, such as:

DATABASE_URL=
AUTH_SECRET=
OPENAI_API_KEY=
REDIS_URL=
OBJECT_STORAGE_ENDPOINT=
OBJECT_STORAGE_BUCKET=
OBJECT_STORAGE_ACCESS_KEY=
OBJECT_STORAGE_SECRET_KEY=

Use the authentication provider's actual required configuration.

Never commit a populated .env file.

Provide a local development setup that works without paid external AI credentials when practical.

If the AI provider is not configured, show a clear configuration message or enter an explicitly labeled demo mode.

Never simulate a live AI response without making its demo status clear.

---

# 25. ACCEPTANCE CRITERIA

The initial implementation is successful when the following workflows work end to end.

## Workflow A: Startup creation

1. A user registers.
2. The user signs in.
3. The user creates a startup workspace.
4. The user completes onboarding.
5. Startup data persists in PostgreSQL.
6. The dashboard displays the saved information.
7. The user can edit the startup profile.

## Workflow B: Task management

1. The user creates a project.
2. The user creates a task.
3. The task appears on the project board.
4. The user updates its status.
5. The dashboard reflects the change.
6. Unauthorized users cannot access the task.

## Workflow C: AI planning

1. The user describes a goal.
2. The AI retrieves authorized startup context.
3. The AI generates a structured plan.
4. The user reviews the plan.
5. The user approves the proposed actions.
6. The backend validates and executes them.
7. Tasks appear in the workspace.
8. The system records the action outcome.

## Workflow D: Opportunity discovery

1. Opportunity records exist in the database.
2. The user filters opportunities.
3. The user opens an opportunity.
4. The system explains its matching criteria.
5. The user can access the official source.
6. Verification and deadline information are visible.
7. Missing or uncertain eligibility information is clearly identified.

## Workflow E: Security

1. A user cannot access another organization's private data without authorization.
2. Private documents are not publicly accessible.
3. AI tools cannot bypass backend authorization.
4. Unauthorized actions are rejected.
5. Important actions are recorded in audit logs.

## Workflow F: Application quality

* The frontend builds successfully.
* Type checking succeeds.
* Critical tests pass.
* Core pages work on desktop and mobile.
* No primary navigation item leads to a broken page.
* Forms have validation and useful error states.
* Demo data is clearly distinguished from real data.
* Setup instructions are documented.

---

# 26. FINAL INSTRUCTIONS

Build VentureOS as a serious, cohesive product.

Prioritize the following in order:

1. A beautiful, polished LIGHT-MODE user experience.
2. Reliable authentication and startup workspace management.
3. A working dashboard connected to real backend data.
4. Functional project and task management.
5. An AI manager that understands startup context and can execute approved actions.
6. An accurate, source-backed opportunity discovery system.
7. Funding readiness.
8. Community and advanced integrations.

Make the product feel premium through excellent spacing, typography, information hierarchy, meaningful motion, and consistency.

Use the specified light palette everywhere.

Keep the architecture modular, maintainable, secure, and easy to extend.

Make independent implementation decisions when the specification leaves room for judgment.

Do not waste time repeatedly asking me to approve ordinary technical decisions.

Do not sacrifice working functionality for visual effects.

Do not fabricate data, credentials, external integrations, official opportunities, or test results.

Start by inspecting the existing repository, then implement the application step by step.

The ultimate goal is a working VentureOS platform where founders can create a startup workspace, manage business operations, receive context-aware AI assistance, discover relevant opportunities, and execute their next steps from one unified interface.

</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-10-13T06:45:28+05:30.
</ADDITIONAL_METADATA>
<USER_SETTINGS_CHANGE>
The user changed setting `Model Selection` from None to Claude Opus 4.6 (Thinking). No need to comment on this change if the user doesn't ask about it. If reporting what model you are, please use a human readable name instead of the exact string.
</USER_SETTINGS_CHANGE>
