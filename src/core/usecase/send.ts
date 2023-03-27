import { NostrInterface } from "../interface/nostr";
import { StorageInterface } from "../interface/storage";


export function sendScheduledNotes(storage: StorageInterface, nostr: NostrInterface): void {
    const notesToSend = storage.getCurrentScheduledNotes();
    for (const note of notesToSend) {
        nostr.sendNote(note.note);
    }
    return
}