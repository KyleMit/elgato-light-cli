import { ActionTypes } from "./types";

export function getArgAction(): ActionTypes {
    const myArgs = process.argv.slice(2);
    const action = <ActionTypes>myArgs[0] || ActionTypes.help;
    return action;
}

