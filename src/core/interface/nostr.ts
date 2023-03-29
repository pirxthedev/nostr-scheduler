import { Note } from "../entity/note";

export abstract class NostrInterface {
    relays: Array<string>;
    constructor(relays: Array<string>) {
        this.relays = relays;
    }
    abstract validateNote(note: Note): boolean;
    abstract sendNote(note: Note): void;
}