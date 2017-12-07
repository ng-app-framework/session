import {Injectable} from "@angular/core";
import {SessionState} from "./SessionState";
import {SessionEvents} from "./SessionEvents";

@Injectable()
export class Session {

    constructor(public events: SessionEvents, public state: SessionState) {
        this.state.load();
    }

    public login(data: any) {
        this.state.saveFromResponse(data);
        this.triggerLoginEvent(data);
    }


    public update(data: any) {
        let previouslyLoggedIn = this.state.loggedIn;
        this.state.update(data);
        this.events.onUpdate.emit(data);
        if (!previouslyLoggedIn && this.state.loggedIn) {
            this.triggerLoginEvent(data);
        }
    }

    public logout(data?: any) {
        if (this.state.loggedIn) {
            this.state.clear();
            this.triggerLogoutEvent(data);
        }
    }

    public triggerLogoutEvent(data: any) {
        this.events.onLogout.emit(data || null);
        this.events.onLoginStatusChange.emit(false);
    }

    public triggerLoginEvent(data: any) {
        this.events.onLogin.emit(data);
        this.events.onLoginStatusChange.emit(true);
    }

    isLoggedIn() {
        return this.state.loggedIn;
    }
}
