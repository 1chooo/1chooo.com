import { join } from "path";

// Article directories
const THOUGHT_DIRECTORY = join(process.cwd(), 'app', '(home)', '(article)', 'thoughts', '_articles')
const NOTE_DIRECTORY = join(process.cwd(), 'app', '(home)', '(article)', 'notes', '_articles')
const DRAFT_DIRECTORY = join(process.cwd(), 'app', '(home)', '(article)', 'drafts', '_articles')
const EPISODE_DIRECTORY = join(process.cwd(), 'app', '(home)', '(article)', 'episodes', '_articles')

// Skill article directories
const SKILL_DIRECTORY = join(process.cwd(), 'app', '(home)', 'skills', '_articles')

// Component directories
const COMPONENTS_ARTICLES_DIRECTORY = join(process.cwd(), 'components', 'articles')

const thoughtPath = (slug: string) => `/thoughts/${slug}`
const notePath = (slug: string) => `/notes/${slug}`
const episodePath = (slug: string) => `/episodes/${slug}`
const draftPath = (slug: string) => `/drafts/${slug}`

export {
  THOUGHT_DIRECTORY,
  NOTE_DIRECTORY,
  EPISODE_DIRECTORY,
  DRAFT_DIRECTORY,
  SKILL_DIRECTORY,
  COMPONENTS_ARTICLES_DIRECTORY,
  thoughtPath,
  notePath,
  episodePath,
  draftPath,
}
