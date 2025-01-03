
export type TransformFunc = (l: ElgatoLight) => ElgatoLightUpdate

export interface ArgInfo {
    isTransform: boolean;
    action: ActionTypes;
}

export interface ElgatoResponse {
    numberOfLights: number;
    lights: Array<ElgatoLight>;
}
export interface ElgatoLight {
    on: number;
    brightness: number;
    temperature: number;
}
export interface ElgatoUpdate {
    lights: Array<ElgatoLightUpdate>;
}
export interface ElgatoLightUpdate {
    on?: number;
    brightness?: number;
    temperature?: number;
}

export enum ActionTypes {
    off = "off",
    on = "on",
    dim = "dim",
    brighten = "brighten",
    warmer = "warmer",
    colder = "colder",
    status = "status",
    help = "help",
    discover = "discover"
}
