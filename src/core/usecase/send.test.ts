import { describe, it, vi, expect } from 'vitest';
import { sendScheduledNotes } from './send';
import { MockNostr } from '../mocks';
import { MockStorage } from '../mocks';


const nostr = new MockNostr();


describe('Use Case: Send Scheduled Notes', () => {
    it('should retrieve scheduled notes from storage', () => {
        const storage = new MockStorage([]);
        const spy = vi.spyOn(storage, 'getCurrentScheduledNotes')
        sendScheduledNotes(storage, nostr);
        expect(spy).toHaveBeenCalled();
    });
    it('should send no notes if there are none scheduled', () => {
        const storage = new MockStorage([]);
        const spy = vi.spyOn(nostr, 'sendNote');
        sendScheduledNotes(storage, nostr);
        expect(spy).not.toHaveBeenCalled();
    });
    it('should send one note if it is scheduled', () => {
        const storage = new MockStorage([{
            note: {
                content: 'valid',
                created_at: 0
            }
        }]);
        const spy = vi.spyOn(nostr, 'sendNote');
        sendScheduledNotes(storage, nostr);
        expect(spy).toHaveBeenCalledOnce();
    });
});