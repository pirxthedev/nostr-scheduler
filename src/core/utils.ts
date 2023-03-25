

export function getNostrTimestamp(javascriptDate: number): number {
    return Math.floor(javascriptDate / 1000);
}