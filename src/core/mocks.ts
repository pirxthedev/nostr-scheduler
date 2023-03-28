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
    sendNote(note: Note): void {
        console.log('Sending note: ' + JSON.stringify(note))
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
        this.notesToSend.push(scheduledNote);
        return;
    }
    markScheduledNoteAsSent(scheduledNote: ScheduledNote): void {
        this.notesToSend = this.notesToSend.filter((n) => n.note !== scheduledNote.note);
        return;
    }
    getCurrentScheduledNotes(): Promise<Array<ScheduledNote>> {
        return new Promise((resolve, reject) => {
            resolve(this.notesToSend);
        });
    }
}