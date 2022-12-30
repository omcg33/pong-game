import { Point, Radians, RelativePoint } from "../interfaces/common";

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function convertRelativePointToPoint(point: RelativePoint, width: number, height: number): Point {
    const { x, y } = point;

    return {
        x: Math.round(width * x),
        y: Math.round(height * y),
    }
}

export function convertAngleToCoordinatesChanges(angle: Radians) {
    return {
        dx: Math.sin(angle),
        dy: Math.cos(angle),
    }
}