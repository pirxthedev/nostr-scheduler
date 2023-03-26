import { StorageInterface } from "../core/interface/storage";
import { ScheduledNote } from "../core/entity/schedulednote";


export class CloudflareD1Storage extends StorageInterface {
	db: D1Database;

	constructor(db: D1Database) {
		super();
		this.db = db;
	}

    saveScheduledNote(scheduledNote: ScheduledNote): Promise<D1Result> {
        const results = this.db.prepare(
            "INSERT INTO ScheduledNotes (note) VALUES (?)"
        ).bind(
            JSON.stringify(scheduledNote.note)
        ).run();
        return results;
    }
}