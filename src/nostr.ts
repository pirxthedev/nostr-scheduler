import { NostrInterface } from "./core/interface/nostr";
import { Note } from "./core/entity/note";

export class NostrTools extends NostrInterface {
    validateNote(note: Note): boolean {
        return true;
    }
}