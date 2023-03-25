import { scheduleNote } from './schedule';
import { NostrInterface } from '../interface/nostr';
import { StorageInterface } from '../interface/storage';
import { Note } from '../entity/note';
import { ScheduledNote } from '../entity/schedulednote';
import { describe, expect, it, beforeAll, afterAll, vi } from "vitest";

class NostrInterfaceMock extends NostrInterface {
    validateNote(note: Note): boolean {
        if (note.content === 'invalid') {
            return false;
        }
        return true;
    }
}

class StorageInterfaceMock extends StorageInterface {
    saveScheduledNote(scheduledNote: ScheduledNote): void {
        return;
    }
}

const request = {
    nostr: new NostrInterfaceMock(),
    storage: new StorageInterfaceMock()
};

const validNoteRequest = {
    ...request,
    note: {content: 'valid'}
};

const invalidNoteRequest = {
    ...request,
    note: {content: 'invalid'}
};

describe('Use Case: Schedule Note', () => {
    it('should check if a valid note is provided', () => {
        const spy = vi.spyOn(request.nostr, 'validateNote');
        scheduleNote(validNoteRequest);
        expect(spy).toHaveBeenCalled();
    });
    it('should save a valid note', () => {
        const spy = vi.spyOn(request.storage, 'saveScheduledNote');
        scheduleNote(validNoteRequest);
        expect(spy).toHaveBeenCalled();
    });
    it('should not save an invalid note', () => {
        const spy = vi.spyOn(request.storage, 'saveScheduledNote');
        scheduleNote(invalidNoteRequest);
        expect(spy).not.toHaveBeenCalled();
    });
});