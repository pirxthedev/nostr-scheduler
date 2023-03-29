import { NostrClientInterface } from "../interface/nostr";
import { StorageInterface } from "../interface/storage";


export async function sendScheduledNotes(storage: StorageInterface, nostr: NostrClientInterface): Promise<void> {
    const notesToSend = await storage.getCurrentScheduledNotes();
    for (const note of notesToSend) {
        nostr.sendNote(note.note);
        storage.markScheduledNoteAsSent(note);
    }
    return
}