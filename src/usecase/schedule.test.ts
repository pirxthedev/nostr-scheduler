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

const interfaces = {
    nostr: new NostrInterfaceMock(),
    storage: new StorageInterfaceMock()
};

describe('Note scheduler', () => {
    it('should exist', () => {
        expect(scheduleNote).toBeDefined();
    });
    it('should check if a valid note is provided', () => {

        const spy = vi.spyOn(interfaces.nostr, 'validateNote');
        scheduleNote('valid', interfaces);
        expect(spy).toHaveBeenCalled();
    });
    it('should save a valid note', () => {
        const spy = vi.spyOn(interfaces.storage, 'save');
        scheduleNote('valid', interfaces);
        expect(spy).toHaveBeenCalled();
    });
    it('should not save an invalid note', () => {
        const spy = vi.spyOn(interfaces.storage, 'save');
        scheduleNote('invalid', interfaces);
        expect(spy).not.toHaveBeenCalled();
    });
});