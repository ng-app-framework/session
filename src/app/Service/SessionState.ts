import {Value} from "@ng-app-framework/core";
import {Storage} from "@ng-app-framework/storage";

export class SessionState extends Storage {

    static DEFAULT_FIRST_NAME = 'Guest';
    static DEFAULT_LAST_NAME  = 'User';
    static DEFAULT_IS_ADMIN   = false;

    loggedIn = false;

    userId            = 0;
    firstName: string = SessionState.DEFAULT_FIRST_NAME;
    lastName: string  = SessionState.DEFAULT_LAST_NAME;
    isAdmin: boolean  = SessionState.DEFAULT_IS_ADMIN;


    constructor() {
        super('user');
    }

    public load() {
        this.loadFromStorage();
        if (!this.loggedIn) {
            this.initialize();
        }
    }

    saveFromResponse(data: any) {
        this.update({
            userId   : parseInt(data.userId + ''),
            isAdmin  : !!data.isAdmin,
            firstName: data.firstName || '',
            lastName : data.lastName || '',
            loggedIn : true
        });
    }

    public update(object: { [key: string]: any }) {
        for (let key in object) {
            if (Value.isDefined(object[key]) && Value.isDefined(this[key])) {
                this[key] = object[key];
            }
        }
        this.store();
    }

    public initialize() {
        this.loggedIn  = false;
        this.firstName = SessionState.DEFAULT_FIRST_NAME;
        this.lastName  = SessionState.DEFAULT_LAST_NAME;
        this.isAdmin   = SessionState.DEFAULT_IS_ADMIN;
    }
}
