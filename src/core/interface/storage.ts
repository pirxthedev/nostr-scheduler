import { ScheduledNote } from "../entity/schedulednote";


export abstract class StorageInterface {
    abstract saveScheduledNote(scheduledNote: ScheduledNote): void;
    abstract markScheduledNoteAsSent(scheduledNote: ScheduledNote): void;
    abstract getCurrentScheduledNotes(): Promise<Array<ScheduledNote>>;
}