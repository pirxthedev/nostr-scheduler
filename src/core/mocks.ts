import { NostrInterface } from "./interface/nostr";
import { StorageInterface } from './interface/storage';
import { Note } from "./entity/note";
import { ScheduledNote } from './entity/schedulednote';


export class MockNostr extends NostrInterface {
    validateNote(note: Note): boolean {
        if (note.content === 'invalid') {
            return false;
        }
        return true;
    }
    sendNote(): void {
        return;
    }
}


export class MockStorage extends StorageInterface {
    notesToSend: Array<ScheduledNote>;
    constructor(notesToSend: Array<ScheduledNote>) {
        super();
        this.notesToSend = notesToSend;
    }
    saveScheduledNote(scheduledNote: ScheduledNote): void {
        return;
    }
    getCurrentScheduledNotes(): Array<ScheduledNote> {
        return this.notesToSend;
    }
}