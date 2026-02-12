# The Elder Code: Quest for the Golden Record - Design Document

## 1. High-Level Technical Architecture

### Core Stack
- **Frontend Framework:** Next.js 14+ (App Router)
    - Provides server-side rendering for SEO and performance.
    - API Routes for backend logic (validation, database access).
- **Styling:** Tailwind CSS + Custom CSS Variables
    - **Theme:** "Ancient Grimoire" (Parchment, Ink, Gold, Stone).
    - Custom fonts: Medieval/Fantasy style for headers, Monospace for code.
- **State Management:** React Context + Hooks (for game state: Health, Mana/Logic, Inventory).
- **Code Editor:** `monaco-editor` or `react-simple-code-editor` purely for the visual "writing on parchment" feel.
- **Validation Engine:** JavaScript/Regex-based parser initially, potentially a server-side COBOL compiler wrapper (e.g., GnuCOBOL) later for advanced validation. For now, strict string matching and regex for the tutorial.

### Database (Schema Design)
We will use a relational database to track hero progress.
**ORM:** Prisma or Drizzle (recommended for type safety).

#### Schema:
```sql
-- Users (The Technomancers)
CREATE TABLE Users (
  id UUID PRIMARY KEY,
  username STRING UNIQUE, -- The Hero's Name
  class_type STRING, -- e.g., "Novice", "Data Weaver", "Procedural Sorcerer"
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0, -- "Legacy"
  logic_stat INTEGER DEFAULT 10, -- "Intelligence"
  memory_stat INTEGER DEFAULT 10, -- "Wisdom"
  created_at TIMESTAMP
);

-- Quests (The Ancient Rites)
CREATE TABLE Quests (
  id UUID PRIMARY KEY,
  slug STRING UNIQUE, -- e.g., "level-1-identification"
  title STRING,
  description TEXT, -- The lore/story
  division_type STRING, -- "IDENTIFICATION", "ENVIRONMENT", "DATA", "PROCEDURE"
  difficulty INTEGER,
  xp_reward INTEGER,
  stat_reward_type STRING, -- "LOGIC" or "MEMORY"
  stat_reward_amount INTEGER
);

-- UserProgress (The Journey)
CREATE TABLE UserProgress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES Users(id),
  quest_id UUID REFERENCES Quests(id),
  status STRING, -- "LOCKED", "ACTIVE", "COMPLETED"
  code_submission TEXT, -- The spell cast
  completed_at TIMESTAMP
);

-- Inventory (The Satchel)
CREATE TABLE Items (
  id UUID PRIMARY KEY,
  name STRING, -- e.g., "Scroll of Syntax", "Data Potion"
  effect STRING
);

CREATE TABLE UserInventory (
  user_id UUID REFERENCES Users(id),
  item_id UUID REFERENCES Items(id),
  quantity INTEGER
);
```

## 2. Level 1: The Identification Ritual

**Objective:** The user must define their character's existence within the ancient Mainframe.

**Context/Lore:**
"You stand before the Gilded Gate of the Mainframe. The silent hum of the Elder Code vibrates through the floor. To enter, you must inscribe your true name into the fabric of reality. The Spirits of the Void (Null Pointers) will consume the nameless."

**Task:**
Complete the `IDENTIFICATION DIVISION` to declare your `PROGRAM-ID`.

**Initial Code Skeleton (The Grimoire Page):**
```cobol
       IDENTIFICATION DIVISION.
       PROGRAM-ID. ____________.
       AUTHOR. ____________.
```

**Success Criteria (The Spell Check):**
1.  Must contain `IDENTIFICATION DIVISION.` (with period).
2.  Must contain `PROGRAM-ID. [Name].` (matches user's hero name).
3.  Must contain `AUTHOR. [Name].` (optional but encouraged).
4.  No syntax errors (missing periods are fatal in COBOL magic).

**Failure Message (The Backfire):**
"The spell fizzles! The Mainframe does not recognize this incantation. Did you forget the sacred 'Period' of termination?"
