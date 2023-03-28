import { describe, it, vi, expect } from 'vitest';
import { sendScheduledNotes } from './send';
import { MockNostr } from '../mocks';
import { MockStorage } from '../mocks';


const nostr = new MockNostr();

const validScheduledNote = {
    note: {
        content: 'valid',
        created_at: 0
    }
};


describe('Use Case: Send Scheduled Notes', () => {
    it('should retrieve scheduled notes from storage', async () => {
        const storage = new MockStorage([]);
        const spy = vi.spyOn(storage, 'getCurrentScheduledNotes')
        await sendScheduledNotes(storage, nostr);
        expect(spy).toHaveBeenCalled();
    });
    it('should send no notes if there are none scheduled', async () => {
        const storage = new MockStorage([]);
        const spy = vi.spyOn(nostr, 'sendNote');
        await sendScheduledNotes(storage, nostr);
        expect(spy).not.toHaveBeenCalled();
    });
    it('should send one note if it is scheduled', async () => {
        const storage = new MockStorage([validScheduledNote]);
        const spy = vi.spyOn(nostr, 'sendNote');
        await sendScheduledNotes(storage, nostr);
        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith(validScheduledNote.note);
    });
    it('should send multiple notes if they are scheduled', async () => {
        const storage = new MockStorage([
            validScheduledNote,
            validScheduledNote
        ]);
        const spy = vi.spyOn(nostr, 'sendNote');
        await sendScheduledNotes(storage, nostr);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy).toHaveBeenCalledWith(validScheduledNote.note);
    });
    it('should mark notes as sent if they are sent', async () => {
        const storage = new MockStorage([validScheduledNote]);
        const spy = vi.spyOn(storage, 'markScheduledNoteAsSent');
        await sendScheduledNotes(storage, nostr);
        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith(validScheduledNote);
    });
});