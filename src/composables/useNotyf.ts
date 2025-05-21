import {Notyf} from "notyf";

export function useNotyf() {
    const notyf = new Notyf({
        position: {x: 'right', y: 'bottom'},
        duration: 3500
    });
    return notyf
}