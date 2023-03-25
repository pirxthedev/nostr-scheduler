import { NostrInterface } from "../interface/nostr";
import { StorageInterface } from "../interface/storage";
import { Note } from "../entity/note";

export interface ScheduleNoteRequest {
    note: Note;
    nostr: NostrInterface;
    storage: StorageInterface;
}

export function scheduleNote(request: ScheduleNoteRequest) {
    if (request.nostr.validateNote(request.note)) {
        const scheduledNote = {
            note: request.note
        };
        request.storage.save(scheduledNote);
    }
}