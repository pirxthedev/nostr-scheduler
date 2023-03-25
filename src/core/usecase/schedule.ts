import { NostrInterface } from "../interface/nostr";
import { StorageInterface } from "../interface/storage";
import { Note } from "../entity/note";
import { getNostrTimestamp } from "../utils";

export interface ScheduleNoteRequest {
    note: Note;
    nostr: NostrInterface;
    storage: StorageInterface;
}

export function scheduleNote(request: ScheduleNoteRequest) {
    const noteIsValid = request.nostr.validateNote(request.note);
    const shouldScheduleNote = noteIsValid ? noteIsInFuture(request.note) : false;
    if (shouldScheduleNote) {
        const scheduledNote = {
            note: request.note
        };
        request.storage.saveScheduledNote(scheduledNote);
    }
}

function noteIsInFuture(note: Note) {
    return note.created_at > getNostrTimestamp(Date.now());
}