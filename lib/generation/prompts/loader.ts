/**
 * Prompt Loader - Loads prompts from markdown files
 *
 * Supports:
 * - Loading prompts from templates/{promptId}/ directory
 * - Snippet inclusion via {{snippet:name}} syntax
 * - Variable interpolation via {{variable}} syntax
 * - Caching for performance
 */

import fs from 'fs';
import path from 'path';
import type { PromptId, SnippetId } from './types';
import { createLogger } from '@/lib/logger';
const log = createLogger('PromptLoader');

interface LoadedPrompt {
  id: PromptId;
  systemPrompt: string;
  userPromptTemplate: string;
}

// Cache for loaded prompts and snippets
const promptCache = new Map<string, LoadedPrompt>();
const snippetCache = new Map<string, string>();

// Store prompts in memory at build time for SSR compatibility
let promptsInitialized = false;
const embeddedPrompts: Record<string, { system: string; user: string }> = {};

/**
 * Get the prompts directory path - try multiple locations
 */
function getPromptsDir(): string {
  // In production/SSR, prompts are embedded at build time
  // Check multiple possible locations
  const candidates = [
    // Standard development
    path.join(process.cwd(), 'lib', 'generation', 'prompts'),
    // Next.js standalone output (server)
    path.join(process.cwd(), '..', 'lib', 'generation', 'prompts'),
    // Appwrite/Vercel SSR
    path.join(process.cwd(), '.next', 'server', 'lib', 'generation', 'prompts'),
  ];

  for (const dir of candidates) {
    try {
      if (fs.existsSync(dir)) {
        return dir;
      }
    } catch {
      // continue
    }
  }

  // Default fallback
  return path.join(process.cwd(), 'lib', 'generation', 'prompts');
}

/**
 * Initialize prompts from filesystem (for development)
 */
function initPromptsFromFS(): void {
  if (promptsInitialized) return;

  try {
    const promptsDir = getPromptsDir();
    const templatesDir = path.join(promptsDir, 'templates');
    const snippetsDir = path.join(promptsDir, 'snippets');

    // Load snippets
    if (fs.existsSync(snippetsDir)) {
      for (const file of fs.readdirSync(snippetsDir)) {
        if (file.endsWith('.md')) {
          const id = file.replace('.md', '');
          snippetCache.set(id, fs.readFileSync(path.join(snippetsDir, file), 'utf-8').trim());
        }
      }
    }

    // Load prompts
    if (fs.existsSync(templatesDir)) {
      for (const dir of fs.readdirSync(templatesDir)) {
        const templateDir = path.join(templatesDir, dir);
        if (fs.statSync(templateDir).isDirectory()) {
          const systemPath = path.join(templateDir, 'system.md');
          const userPath = path.join(templateDir, 'user.md');

          let systemPrompt = '';
          let userPrompt = '';

          try {
            systemPrompt = fs.readFileSync(systemPath, 'utf-8').trim();
          } catch {}

          try {
            userPrompt = fs.readFileSync(userPath, 'utf-8').trim();
          } catch {}

          if (systemPrompt) {
            embeddedPrompts[dir] = { system: systemPrompt, user: userPrompt };
          }
        }
      }
    }

    promptsInitialized = true;
    log.info('Prompts initialized from filesystem', { promptsDir, promptCount: Object.keys(embeddedPrompts).length });
  } catch (error) {
    log.error('Failed to initialize prompts from filesystem:', error);
  }
}

/**
 * Process snippet includes in a template
 * Replaces {{snippet:name}} with actual snippet content
 */
function processSnippets(template: string): string {
  return template.replace(/\{\{snippet:(\w[\w-]*)\}\}/g, (_, snippetId) => {
    const cached = snippetCache.get(snippetId);
    if (cached) return cached;

    // Try to load from filesystem
    const snippetPath = path.join(getPromptsDir(), 'snippets', `${snippetId}.md`);
    try {
      const content = fs.readFileSync(snippetPath, 'utf-8').trim();
      snippetCache.set(snippetId, content);
      return content;
    } catch {
      log.warn(`Snippet not found: ${snippetId}`);
      return `{{snippet:${snippetId}}}`;
    }
  });
}

/**
 * Load a prompt by ID
 */
export function loadPrompt(promptId: PromptId): LoadedPrompt | null {
  const cached = promptCache.get(promptId);
  if (cached) return cached;

  // Try embedded prompts first
  if (embeddedPrompts[promptId]) {
    const prompt = embeddedPrompts[promptId];
    const loaded: LoadedPrompt = {
      id: promptId,
      systemPrompt: processSnippets(prompt.system),
      userPromptTemplate: processSnippets(prompt.user),
    };
    promptCache.set(promptId, loaded);
    return loaded;
  }

  // Fallback: load from filesystem
  initPromptsFromFS();

  const promptDir = path.join(getPromptsDir(), 'templates', promptId);

  try {
    // Load system.md
    const systemPath = path.join(promptDir, 'system.md');
    let systemPrompt = fs.readFileSync(systemPath, 'utf-8').trim();
    systemPrompt = processSnippets(systemPrompt);

    // Load user.md (optional, may not exist)
    const userPath = path.join(promptDir, 'user.md');
    let userPromptTemplate = '';
    try {
      userPromptTemplate = fs.readFileSync(userPath, 'utf-8').trim();
      userPromptTemplate = processSnippets(userPromptTemplate);
    } catch {
      // user.md is optional
    }

    const loaded: LoadedPrompt = {
      id: promptId,
      systemPrompt,
      userPromptTemplate,
    };

    promptCache.set(promptId, loaded);
    return loaded;
  } catch (error) {
    log.error(`Failed to load prompt ${promptId}:`, error);
    return null;
  }
}

/**
 * Interpolate variables in a template
 * Replaces {{variable}} with values from the variables object
 */
export function interpolateVariables(template: string, variables: Record<string, unknown>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = variables[key];
    if (value === undefined) return match;
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  });
}

/**
 * Build a complete prompt with variables
 */
export function buildPrompt(
  promptId: PromptId,
  variables: Record<string, unknown>,
): { system: string; user: string } | null {
  const prompt = loadPrompt(promptId);
  if (!prompt) return null;

  return {
    system: interpolateVariables(prompt.systemPrompt, variables),
    user: interpolateVariables(prompt.userPromptTemplate, variables),
  };
}

/**
 * Load a snippet by ID
 */
export function loadSnippet(snippetId: SnippetId): string {
  const cached = snippetCache.get(snippetId);
  if (cached) return cached;

  const snippetPath = path.join(getPromptsDir(), 'snippets', `${snippetId}.md`);

  try {
    const content = fs.readFileSync(snippetPath, 'utf-8').trim();
    snippetCache.set(snippetId, content);
    return content;
  } catch {
    log.warn(`Snippet not found: ${snippetId}`);
    return `{{snippet:${snippetId}}}`;
  }
}

/**
 * Clear all caches (useful for development/testing)
 */
export function clearPromptCache(): void {
  promptCache.clear();
  snippetCache.clear();
  promptsInitialized = false;
}
