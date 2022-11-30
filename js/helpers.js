export function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function convertAngleToCoordinatesChanges(angle) {
    return {
        dx: Math.sin(angle),
        dy: Math.cos(angle),
    }
}