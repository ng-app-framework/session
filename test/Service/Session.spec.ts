import {Session} from "../../src/app/Service/Session";
import {SessionEvents} from "../../src/app/Service/SessionEvents";
import {SessionState} from "../../src/app/Service/SessionState";
import {EventEmitter} from "@angular/core";

export class SessionStateShunt extends SessionState {
    called = [];

    saveFromResponse() {
        this.called.push('saveFromResponse');
    }

    load() {
        this.called.push('load');
    }

    update() {
        this.called.push('update');
        this.loggedIn = true;
    }

    clear() {
        this.called.push('clear');
    }
}

describe('Module: Session', () => {
    describe('Class: Session', () => {

        describe('After Instantiation', () => {
            let subject: Session;
            let state: SessionStateShunt;
            let stopListening = new EventEmitter<any>();

            beforeEach(() => {
                state = new SessionStateShunt();
                state.clear();
                subject = new Session(new SessionEvents(), state);
            });

            afterEach(() => {
                stopListening.emit();
            });

            describe('Method: Login', () => {
                it('should save data to the state', () => {
                    subject.login({});
                    expect(state.called.indexOf('saveFromResponse') !== -1).toBeTruthy();
                });
                it('should fire a login event', (done) => {
                    subject.events.onLogin.takeUntil(stopListening).first().subscribe(() => {
                        done();
                    });
                    subject.login({});
                });
            });
            describe('Method: Update', () => {
                it('should update the state', () => {
                    subject.update({});
                    expect(state.called.indexOf('update') !== -1).toBeTruthy();
                });
                it('should fire an update event', (done) => {
                    subject.events.onUpdate.takeUntil(stopListening).first().subscribe(() => {
                        done();
                    });
                    subject.update({});
                });
                it('should fire a login event', (done) => {
                    subject.events.onLogin.takeUntil(stopListening).first().subscribe(() => {
                        done();
                    });
                    subject.update({loggedIn: true});
                });
                it('should not fire a login event if already logged in', () => {
                    let calledOnLogin = false;
                    subject.triggerLoginEvent = () => calledOnLogin = true;
                    state.loggedIn = true;
                    subject.update({});
                    expect(calledOnLogin).toBeFalsy();
                })
            });
        });

    });
});
