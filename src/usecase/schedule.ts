import { NostrInterface } from "../interface/nostr";
import { StorageInterface } from "../interface/storage";

export interface Interfaces {
    nostr: NostrInterface;
    storage: StorageInterface;
}

export function scheduleNote(note: string, interfaces: Interfaces) {
    if (interfaces.nostr.validateNote(note)) {
        interfaces.storage.save(note);
    }
}