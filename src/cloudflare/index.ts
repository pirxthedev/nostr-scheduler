/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { scheduleNote } from "../core/usecase/schedule";
import { Note } from "../core/entity/note";
import { CloudflareD1Storage } from "./storage";
import { NostrTools } from "../nostr";
import { getNostrTimestamp } from "../core/utils";


export interface Env {
	DB: D1Database;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const storage = new CloudflareD1Storage(env.DB);
		const nostr = new NostrTools();
		const note = getNoteFromRequest(request);
		const response = scheduleNote({
			note,
			storage,
			nostr
		});
		return new Response(response.status);
	},
};

function getNoteFromRequest(request: Request): Note {
	return {
		created_at: getNostrTimestamp(Date.now()) + 60*60*24,
		content: "Hello World!",
	};
}