import { NostrInterface } from "../interface/nostr";
import { StorageInterface } from "../interface/storage";

export interface ScheduleNoteRequest {
    note: string;
    nostr: NostrInterface;
    storage: StorageInterface;
}

export function scheduleNote(request: ScheduleNoteRequest) {
    if (request.nostr.validateNote(request.note)) {
        request.storage.save(request.note);
    }
}