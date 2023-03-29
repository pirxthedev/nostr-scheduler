import {
    validateEvent,
    verifySignature,
    relayInit,
} from "nostr-tools";
import { Relay } from "nostr-tools";

import { NostrInterface } from "../core/interface/nostr";

export class NostrTools implements NostrInterface {
    validateNote(note: any): boolean {
        const isValid = validateEvent(note);
        const isSigned = verifySignature(note);

        return isValid && isSigned;
    }

    async sendNote(note: any, relay: string): Promise<void> {
        const relayConnection = await this.connectToRelay(relay);
        relayConnection.publish(note);
        relayConnection.close();
        return;
    }

    async connectToRelay(relay: string): Promise<Relay> {
        const relayConnection = relayInit(relay);
        await relayConnection.connect();
        return relayConnection;
    }
}