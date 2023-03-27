import { Note } from "../entity/note";

export abstract class NostrInterface {
    abstract validateNote(note: Note): boolean;
    abstract sendNote(note: Note): void;
}