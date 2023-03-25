import { ScheduledNote } from "../entity/schedulednote";

export abstract class StorageInterface {
    abstract save(scheduledNote: ScheduledNote): void;
}