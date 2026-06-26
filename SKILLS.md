# PKDO ML-AI Elite Engineer Checklist
> John Kean · Peachy Kean DevOps LLC · Asheville, NC  
> Last updated: March 19, 2026  
> Two sections: Personal Skills Resume + Teaching & Knowledge Transfer Catalog  
> Evidence-based — every ✅ is provable by shipped work at github.com/juanitok94  
> Purpose: reskilling into AI-native development and teaching others to do the same

---

## SECTION 1: JOHN KEAN — PERSONAL SKILLS RESUME

*What I can personally do. Ranked by demonstrated mastery.*  
*The standard for Tier 1: could I teach it? Could I defend the architectural decisions? Is there shipped code proving it?*

---

### TIER 1 — MASTERED
*Proven by shipped production code. Would stake reputation on these.*

#### AI Integration & Claude API
- ✅ Claude API integration (Python) — messages, system prompts, context management
- ✅ RAG architecture design — SQL truth layer + LLM voice layer
- ✅ Prompt engineering for grounded generation (no hallucination on facts)
- ✅ Multi-model orchestration — Claude leads, Haiku/GPT/Gemini as directed tools
- ✅ Context engineering — HANDOFF.md system, session portability across models
- ✅ Claude Code as primary build executor — direct filesystem, no copy/paste
- ✅ Co-Intelligence workflow (Mollick principles) applied to real products

#### Python & Data Engineering
- ✅ Python scripting for corpus building at scale (1,200+ concert setlists)
- ✅ SQL schema design — normalized relational data (concerts/venues/songs/tours)
- ✅ Data cleaning and normalization pipelines
- ✅ Structured JSON generation at scale (49-entry corpus, Haiku-assisted)
- ✅ Web scraping and data fetching for corpus construction

#### Frontend Development
- ✅ Next.js 16 App Router — server + client components, routing, layouts
- ✅ TypeScript — strict mode, component typing, data modeling
- ✅ Tailwind CSS 4 — utility-first, design tokens, responsive mobile-first
- ✅ localStorage state management — user state, no auth required
- ✅ Custom coordinate mapping — no external libraries, pure math + CSS
- ✅ React hooks — useState, usePathname, useEffect patterns

#### DevOps & Deployment
- ✅ GitHub — public repos, branching, commit discipline, building in public
- ✅ Vercel — auto-deploy from GitHub, environment variables, production
- ✅ Render — Python backend hosting, web services, environment config
- ✅ VS Code + integrated terminal — Windows Surface daily driver
- ✅ Unix/Linux command line — 30+ years (SCO UNIX through modern Linux)

#### Product & Design
- ✅ Mobile-first UX design — Krug principles applied
- ✅ Design token systems — color, typography, spacing
- ✅ Information architecture — layered data models, navigation systems
- ✅ Editorial voice — writing product copy that feels human, not AI-generated
- ✅ Data modeling for real-world complexity (49 stops × 9 layers × 5 types)

---

### TIER 2 — COMPETENT
*Used in production but not yet pushed to the edge. Solid foundation, room to deepen.*

#### AI & ML
- 🔷 Vector search / semantic retrieval — understand chunking strategies, used in planning
- 🔷 Embedding models — know the landscape, haven't tuned or benchmarked
- 🔷 RAG evaluation — can assess output quality, haven't built formal eval pipelines
- 🔷 Claude Code at scale — used significantly, still discovering edge capabilities
- 🔷 NotebookLM as production asset — used for research, not yet embedded in live products
- 🔷 Agentic workflows — understand the architecture, haven't shipped a multi-step agent

#### Frontend
- 🔷 React Server Components — using them, still learning performance boundaries
- 🔷 Next.js API routes — built basic ones, haven't gone deep on edge functions
- 🔷 Animation — CSS transitions shipped, Framer Motion not yet used
- 🔷 Accessibility — building with care, no formal audit process yet

#### Backend & Data
- 🔷 FastAPI / Flask — know the patterns, Render deploys working
- 🔷 PostgreSQL — used in projects, prefer SQLite for simplicity when possible
- 🔷 pgvector — understand the concept, not yet implemented
- 🔷 Async Python — used, not mastered

---

### TIER 3 — NEXT FRONTIERS
*Logical next steps given Tier 1 mastery. High-ROI to develop in 2026.*

#### Immediate reach (90 days)
- ⬜ llms.txt publishing — `peachykeandev.com/llms.txt` (draft already in MASTER.md)
- ⬜ HeyGen Streaming Avatar API — voice UI layer for neighborhood + music apps
- ⬜ MCP (Model Context Protocol) servers — custom tools for Claude agents
- ⬜ Formal RAG evaluation pipeline — RAGAS or similar for quality scoring
- ⬜ LanceDB — vector store for semantic "ask me anything" features

#### Medium reach (6 months)
- ⬜ Multi-agent orchestration — Claude agents handing off to specialized sub-agents
- ⬜ Anthropic Batch API — cost-efficient bulk processing for corpus updates
- ⬜ Streaming responses — real-time Claude output in UI (not request/response)
- ⬜ React Native — mobile app development (HeyGen LiveKit integration)
- ⬜ Fine-tuning fundamentals — when it makes sense vs. RAG vs. prompting

#### Longer horizon (12 months)
- ⬜ Custom model evaluation harnesses
- ⬜ Production observability — LLM call logging, latency, cost tracking
- ⬜ AI safety fundamentals for product — guardrails, evals, red-teaming basics

---

### TIER 4 — AWARE, NOT PRIORITIZED
*Know these exist. Not building toward them yet. Track but don't chase.*

- 📌 PyTorch / model training from scratch
- 📌 Kubernetes / container orchestration
- 📌 LangChain / LlamaIndex — prefer direct Claude API, less abstraction
- 📌 OpenAI fine-tuning — aware, Claude-first by choice
- 📌 Stable Diffusion / image generation pipelines
- 📌 Browser automation at scale (Playwright, Selenium)

---

### DISTINCTIVE STRENGTHS
*What makes this AI engineering path different from a typical developer's.*

```
1. Domain depth before AI
   30 years of enterprise work means the AI is applied to real business 
   problems — not toy demos. Pattern recognition across industries.

2. Human in the loop by default
   Co-Intelligence isn't a philosophy read in a book — it's the daily 
   operating mode. Know when to override the model. Know when to trust it.

3. Corpus quality obsession
   1,200+ setlists isn't just a number. It means understanding data 
   provenance, cleaning, normalization, and what "ground truth" means 
   in a RAG context. The SQL is the truth. The LLM is the voice.

4. Product + engineering combined
   Can design the UX, write the copy, model the data, and ship the code.
   No handoff tax. No lost-in-translation between roles.

5. Hygge as a design constraint
   Warmth and intentionality as product requirements produces better 
   software than performance metrics alone. Users feel the difference.

6. Teaching orientation
   Mostly retired from billable consulting. Building in public and 
   documenting the methodology so others can follow the path.
```

---

---

## SECTION 2: PKDO TEACHING & KNOWLEDGE TRANSFER

*What Peachy Kean DevOps LLC teaches. Each module is a capability PKDO has demonstrably built.*  
*Not a consulting pitch — a curriculum built from real shipped work.*

---

### MODULE 1: RAG ARCHITECTURE FROM SCRATCH
**The skill:** Build a production RAG application that answers questions grounded in your own data — no hallucinations, no generic chatbot.

**Proof of mastery:** Music knowledge base with 1,200+ concert setlists — SQL retrieval layer + Claude API generation layer, live on Render.

**What you learn:**
- When to use RAG vs. fine-tuning vs. pure prompting
- SQL schema design for fact-based retrieval
- Chunking strategies — by document, by entity, by time
- Claude API integration — system prompts, context assembly, grounded generation
- Python pipeline for corpus building at scale
- The principle: SQL is the truth. LLM is the voice.

**Teachable to:** Developers with Python basics. Non-developers who understand their data.

---

### MODULE 2: NEXT.JS AI-NATIVE WEB APPS
**The skill:** Ship a production-quality Next.js application with real data, real UX, and real deployment — start to finish.

**Proof of mastery:** Neighborhood discovery app — 49-entry data model, 4 pages, custom map, Hygge Five interaction, live on Vercel.

**What you learn:**
- Next.js 16 App Router — when to use server vs. client components
- TypeScript data modeling — typing real-world complexity
- Tailwind CSS 4 — design tokens, mobile-first, component patterns
- localStorage for user state — no auth, no friction
- GitHub → Vercel auto-deploy pipeline
- Claude Code as executor — write prompts, get working files

**Teachable to:** Anyone with basic HTML/CSS. Enterprise professionals reskilling.

---

### MODULE 3: CONTEXT ENGINEERING & AI COLLABORATION
**The skill:** Make AI collaboration compound over time instead of resetting every session. Build the prompts, documents, and workflows that constitute an AI operating system.

**Proof of mastery:** PKDO's MASTER.md / HANDOFF.md / CONTEXT.md system — a year of AI collaboration across multiple projects, fully portable to any model.

**What you learn:**
- Ethan Mollick's Co-Intelligence principles applied practically
- HANDOFF.md pattern — portable context for any model
- Multi-model stack design — Claude leads, others assist
- The llms.txt convention — making your work machine-readable
- Session startup discipline — how to never re-explain your project
- When to use Claude vs. ChatGPT vs. Gemini vs. NotebookLM

**Teachable to:** Anyone using AI tools ad-hoc and getting inconsistent results. Teams where AI knowledge lives in one person's head.

---

### MODULE 4: PYTHON CORPUS BUILDING WITH CLAUDE
**The skill:** Turn raw data sources into clean, queryable corpora for RAG pipelines — using Claude to generate the scripts that do the heavy lifting.

**Proof of mastery:** 1,200+ concert setlists built via Claude-generated Python — months of manual work done in days.

**What you learn:**
- Identifying trustworthy data sources
- Prompting Claude to generate fetch/clean/normalize scripts
- SQL schema design for your specific domain
- Data quality assessment — what does "ground truth" mean here?
- Pipeline design for ongoing corpus updates
- The Co-Intelligence approach to data engineering

**Teachable to:** Anyone with basic Python familiarity. Data people without engineering background.

---

### MODULE 5: FESTIVAL & EVENT TECHNOLOGY
**The skill:** Build custom scheduling, performer management, and public-facing event applications without enterprise pricing or vendor lock-in.

**Proof of mastery:** Multiple festival scheduling applications shipped for independent events.

**What you learn:**
- Event data modeling — shows, venues, performers, schedules
- Public-facing schedule display (mobile-optimized)
- Admin tools for event organizers
- Static vs. dynamic data for event apps
- GitHub → Vercel deployment for live event updates

**Teachable to:** Event organizers with technical curiosity. Developers new to event domain.

---

### MODULE 6: MULTI-MODEL STACK DESIGN
**The skill:** Stop using one AI tool for everything. Build a deliberate stack where each model does what it's actually good at.

**Proof of mastery:** PKDO runs Claude, ChatGPT, Gemini, NotebookLM, and Claude Code as a coordinated system — not interchangeably.

**What you learn:**
```
Claude Sonnet   → reasoning, code, architecture, long-context
Claude Haiku    → bulk generation with tight schema, cheap + fast
Claude Code     → filesystem execution, no copy/paste workflow
ChatGPT GPT-4o  → copy variations, outsider perspective, bulk JSON
NotebookLM      → knowledge base, Audio Overviews, Mind Maps
Gemini          → video, multimodal
HeyGen          → streaming avatars, voice UI (frontier)
```
- When to use which model for which task
- Handoff blocks — compressed context between models
- Cost optimization — right model for right task
- Claude as lead, others as directed tools

**Teachable to:** Anyone currently using just one AI tool. Teams standardizing their AI workflow.

---

### PKDO TEACHING ORIENTATION

```
Context:
  Mostly retired from billable consulting.
  Reskilling into AI-native development.
  Building in public — github.com/juanitok94.
  Documenting the methodology so others can follow.

What this means:
  Every project is also a lesson.
  Every HANDOFF.md is a curriculum module.
  Every shipped repo is proof the path is walkable.

Available for:
  Workshops and informal teaching sessions
  Collaborative learning (Switchyard, community groups)
  Speaking about Co-Intelligence and context engineering
  Pairing with developers learning these patterns

Not currently available for:
  Billable client engagements
  Enterprise consulting
  Ongoing maintenance contracts
```

---

### PROOF OF WORK — TEACHING CREDIBILITY MATRIX

| Module | Personal Project (proof) | Shipped Work (proof) |
|--------|--------------------------|----------------------|
| RAG Architecture | Music knowledge base — 1,200+ setlists | Multiple applications |
| Next.js Web Apps | Neighborhood discovery app | Festival + other apps |
| Context Engineering | PKDO MASTER/HANDOFF system | Applied across all projects |
| Python Corpus Building | 1,200+ concert data pipeline | — |
| Festival Technology | — | Multiple festival apps |
| Multi-Model Stack | PKDO daily operating model | All projects |

---

## CHECKLIST MAINTENANCE

**Update Tier 1 when:** A new skill has shipped code behind it and you could teach it cold.  
**Update Tier 2→1 when:** You've pushed it to the edge and defended the decisions.  
**Update Teaching Modules when:** A new capability is demonstrably teachable from lived experience.  
**Quarterly review:** 20 minutes. Move tiers. Update proof. Add new frontiers.

**The teaching standard:** Not "do I know this?" but "could someone follow my path and get here too?"

---

*SKILLS.md = personal resume + teaching curriculum*  
*MASTER.md = full project portfolio*  
*HANDOFF.md per project = the curriculum in action*  
*Together: a year of AI collaboration documented for others to follow.*
