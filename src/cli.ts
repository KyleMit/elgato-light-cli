import { ArgInfo, ActionTypes } from "./types";

export function getArgAction(): ArgInfo {
    const myArgs = process.argv.slice(2);
    const action = <ActionTypes>myArgs[0]

    var isTransform = action != ActionTypes.status
    return {isTransform, action: action}
}

