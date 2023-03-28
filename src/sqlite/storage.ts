import { StorageInterface } from "../core/interface/storage";
import { ScheduledNote } from "../core/entity/schedulednote";
import { getNostrTimestamp } from "../core/utils";


export class CloudflareD1Storage extends StorageInterface {
	db: D1Database;

	constructor(db: D1Database) {
		super();
		this.db = db;
	}

    saveScheduledNote(scheduledNote: ScheduledNote): Promise<D1Result> {
        const results = this.db.prepare(
            "INSERT INTO ScheduledNotes (note, created_at) VALUES (?, ?)"
        ).bind(
            JSON.stringify(scheduledNote.note), scheduledNote.note.created_at
        ).run();
        return results;
    }

    async getCurrentScheduledNotes(): Promise<Array<ScheduledNote>> {
        const { results } = await this.db.prepare(
            "SELECT * FROM ScheduledNotes WHERE created_at <= ?"
        ).bind(
            getNostrTimestamp(Date.now())
        ).all();
        if (results) {
            return results.map((result: any) => {
                return {
                    note: JSON.parse(result.note),
                    created_at: result.created_at
                }
            });
        } else {
            return [];
        }
    }
}