import { validateEvent, verifySignature } from "nostr-tools";

import { NostrInterface } from "../core/interface/nostr";

export class NostrTools extends NostrInterface {
    validateNoteContent(note: any): boolean {
        const isValid = validateEvent(note);
        const isSigned = verifySignature(note);

        return isValid && isSigned;
    }
}