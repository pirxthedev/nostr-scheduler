import { describe, expect, it, beforeAll, afterAll, vi } from "vitest";
import {
    validateEvent,
    verifySignature,
    relayInit,
    Relay
} from "nostr-tools";
require('websocket-polyfill')
import { NostrTools } from './nostr';

const nostr = new NostrTools(["relay1", "relay2"]);

const publishSpy = vi.fn();
const closeSpy = vi.fn();

vi.mock('nostr-tools', async () => {
    const mod = await vi.importActual<typeof import('nostr-tools')>('nostr-tools')

    return {
        ...mod,
        validateEvent: vi.fn(),
        verifySignature: vi.fn(),
        relayInit: vi.fn(() => ({
            connect: vi.fn(),
            publish: publishSpy,
            close: closeSpy
        })),
    }
})

describe('Nostr note validation', () => {

    it('Should run nostr-tools validation on provided note', () => {
        const note = { content: "hello nostr" };
        nostr.validateNote(note);
        expect(validateEvent).toHaveBeenCalled();
        expect(validateEvent).toHaveBeenCalledWith(note);
    });
    it('Should run nostr-tools signature validation on provided note', () => {
        const note = { content: "hello nostr", sig: "signature" };
        nostr.validateNote(note);
        expect(verifySignature).toHaveBeenCalled();
        expect(verifySignature).toHaveBeenCalledWith(note);
    });

});

describe('Nostr note sending', () => {
    it('Should connect to the provided relays', async () => {
        const spy = vi.spyOn(nostr, 'connectToRelay')
        const note = { content: "hello nostr" };
        await nostr.sendNote(note);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenNthCalledWith(1, "relay1");
        expect(spy).toHaveBeenNthCalledWith(2, "relay2");
    });
    it('should call nostr-tools relayInit', async () => {
        const relayConnection = await nostr.connectToRelay("relay");
        expect(relayInit).toBeCalled();
    });
    it('should open a websocket connection to the relay', async () => {
        const relayConnection = await nostr.connectToRelay("relay");
        expect(relayConnection.connect).toBeCalled();
    });
    it('should publish the note to the relay', async () => {
        const note = { content: "hello nostr" };
        nostr.sendNote(note);
        expect(publishSpy).toBeCalled();
        expect(publishSpy).toHaveBeenCalledWith(note);
    });
    it('should close the websocket connection to the relay', async () => {
        const note = { content: "hello nostr" };
        nostr.sendNote(note);
        expect(closeSpy).toBeCalled();
    });
});
