import { describe, expect, it, beforeAll, afterAll, vi } from "vitest";
import {
    validateEvent,
    verifySignature,
} from "nostr-tools";
import { NostrTools } from './nostr';

const nostr = new NostrTools();

vi.mock('nostr-tools', () => {
    const validateEvent = vi.fn()
    const verifySignature = vi.fn()

    return { validateEvent, verifySignature }
})

describe('Nostr note validation', () => {

    it('Should run nostr-tools validation on provided note', () => {
        const note = { content: "hello nostr" };
        nostr.validateNoteContent(note);
        expect(validateEvent).toHaveBeenCalled();
        expect(validateEvent).toHaveBeenCalledWith(note);
    });
    it('Should run nostr-tools signature validation on provided note', () => {
        const note = { content: "hello nostr", sig: "signature" };
        nostr.validateNoteContent(note);
        expect(verifySignature).toHaveBeenCalled();
        expect(verifySignature).toHaveBeenCalledWith(note);
    });

});