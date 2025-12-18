/**
 * HiveMind Agent Base Class
 * Foundation for all AI agents in the Agent Hub
 */

export interface AgentMessage {
	role: 'user' | 'assistant' | 'system';
	content: string;
	timestamp: number;
}

export interface AgentConfig {
	name: string;
	provider: string;
	model: string;
	systemPrompt: string;
	maxTokens?: number;
	temperature?: number;
}

export abstract class Agent {
	readonly id: string;
	readonly name: string;
	readonly provider: string;
	readonly model: string;
	protected systemPrompt: string;
	protected history: AgentMessage[] = [];

	constructor(config: AgentConfig) {
		this.id = crypto.randomUUID();
		this.name = config.name;
		this.provider = config.provider;
		this.model = config.model;
		this.systemPrompt = config.systemPrompt;
	}

	abstract execute(input: string): Promise<string>;

	addToHistory(message: AgentMessage): void {
		this.history.push(message);
	}

	getHistory(): AgentMessage[] {
		return [...this.history];
	}

	clearHistory(): void {
		this.history = [];
	}

	getContext(): string {
		return this.history
			.map(m => `${m.role}: ${m.content}`)
			.join('\n');
	}
}

/**
 * The Architect - Big picture code structure agent
 */
export class ArchitectAgent extends Agent {
	constructor() {
		super({
			name: 'The Architect',
			provider: 'anthropic',
			model: 'claude-3-5-sonnet',
			systemPrompt: `You are The Architect, a senior software architect.
Your role is to maintain the big picture of the codebase.
You prevent spaghetti code by suggesting proper structure.
You review code for architectural patterns and best practices.`
		});
	}

	async execute(input: string): Promise<string> {
		// Placeholder - will integrate with actual API
		this.addToHistory({ role: 'user', content: input, timestamp: Date.now() });
		const response = `[Architect Analysis]\n${input}`;
		this.addToHistory({ role: 'assistant', content: response, timestamp: Date.now() });
		return response;
	}
}

/**
 * The Devil's Advocate - Chaos engineering agent
 */
export class DevilsAdvocateAgent extends Agent {
	constructor() {
		super({
			name: "The Devil's Advocate",
			provider: 'openai',
			model: 'gpt-4o',
			systemPrompt: `You are The Devil's Advocate, a chaos engineer.
Your role is to actively try to break code logic.
You look for edge cases, race conditions, and potential failures.
You challenge assumptions and find weaknesses.`
		});
	}

	async execute(input: string): Promise<string> {
		this.addToHistory({ role: 'user', content: input, timestamp: Date.now() });
		const response = `[Chaos Analysis]\n${input}`;
		this.addToHistory({ role: 'assistant', content: response, timestamp: Date.now() });
		return response;
	}
}

/**
 * The Historian - Context and memory agent
 */
export class HistorianAgent extends Agent {
	constructor() {
		super({
			name: 'The Historian',
			provider: 'google',
			model: 'gemini-pro-1.5',
			systemPrompt: `You are The Historian, the keeper of context.
You remember every git commit and chat message.
You answer "Why did we do this?" questions.
You provide historical context for decisions.`
		});
	}

	async execute(input: string): Promise<string> {
		this.addToHistory({ role: 'user', content: input, timestamp: Date.now() });
		const response = `[Historical Context]\n${input}`;
		this.addToHistory({ role: 'assistant', content: response, timestamp: Date.now() });
		return response;
	}
}

/**
 * The Scribe - Documentation agent
 */
export class ScribeAgent extends Agent {
	constructor() {
		super({
			name: 'The Scribe',
			provider: 'mistral',
			model: 'mistral-small',
			systemPrompt: `You are The Scribe, the documentation specialist.
You update README and comments in real-time.
You ensure code is well-documented and accessible.
You write clear, concise documentation.`
		});
	}

	async execute(input: string): Promise<string> {
		this.addToHistory({ role: 'user', content: input, timestamp: Date.now() });
		const response = `[Documentation]\n${input}`;
		this.addToHistory({ role: 'assistant', content: response, timestamp: Date.now() });
		return response;
	}
}

export default Agent;
