import { scheduleNote } from './schedule';
import { NostrInterface } from '../interface/nostr';
import { StorageInterface } from '../interface/storage';
import { describe, expect, it, beforeAll, afterAll, vi } from "vitest";

class NostrInterfaceMock extends NostrInterface {
    validateNote(note: string): boolean {
        if (note === 'invalid') {
            return false;
        }
        return true;
    }
}

class StorageInterfaceMock extends StorageInterface {
    save(note: string): void {
        return;
    }
}

const request = {
    nostr: new NostrInterfaceMock(),
    storage: new StorageInterfaceMock()
};

const validNoteRequest = {
    ...request,
    note: 'valid'
};

const invalidNoteRequest = {
    ...request,
    note: 'invalid'
};

describe('Use Case: Schedule Note', () => {
    it('should check if a valid note is provided', () => {
        const spy = vi.spyOn(request.nostr, 'validateNote');
        scheduleNote(validNoteRequest);
        expect(spy).toHaveBeenCalled();
    });
    it('should save a valid note', () => {
        const spy = vi.spyOn(request.storage, 'save');
        scheduleNote(validNoteRequest);
        expect(spy).toHaveBeenCalled();
    });
    it('should not save an invalid note', () => {
        const spy = vi.spyOn(request.storage, 'save');
        scheduleNote(invalidNoteRequest);
        expect(spy).not.toHaveBeenCalled();
    });
});