import {EventEmitter} from "@angular/core";

export class SessionEvents {

    onLogin: EventEmitter<any>                 = new EventEmitter<any>();
    onLogout: EventEmitter<any>                = new EventEmitter<any>();
    onLoginStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    onUpdate: EventEmitter<any>                = new EventEmitter<any>();
}
