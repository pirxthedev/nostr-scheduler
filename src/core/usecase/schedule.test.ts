import { describe, expect, it, beforeAll, afterAll, vi } from "vitest";
import { scheduleNote } from './schedule';
import { getNostrTimestamp } from '../utils';
import { MockStorage } from '../mocks';
import { MockNostr } from '../mocks';


const request = {
    nostr: new MockNostr(),
    storage: new MockStorage([])
};

const futureDate = getNostrTimestamp(Date.now()) + 60*60*24;
const pastDate = getNostrTimestamp(Date.now()) - 60*60*24;

const validNoteRequest = {
    ...request,
    note: {
        content: 'valid',
        created_at: futureDate
    },
};

const invalidNoteRequest = {
    ...request,
    note: {
        content: 'invalid',
        created_at: futureDate
    },
};

const pastNoteRequest = {
    ...request,
    note: {
        content: 'valid',
        created_at: pastDate
    },
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
    it('should not save a note with a past date', () => {
        const spy = vi.spyOn(request.storage, 'saveScheduledNote');
        scheduleNote(pastNoteRequest);
        expect(spy).not.toHaveBeenCalled();
    });
    it('should return a success status if a note is saved', () => {
        const response = scheduleNote(validNoteRequest);
        expect(response.status).toBe('OK');
    });
    it('should return an error status if a note is not saved', () => {
        const response = scheduleNote(invalidNoteRequest);
        expect(response.status).toBe('ERROR');
    });
    it('should return an error message if a note is not saved', () => {
        const response = scheduleNote(invalidNoteRequest);
        expect(response.message).toBe('Note is invalid or in the past');
    });
});