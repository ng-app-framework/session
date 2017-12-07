import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Session} from "./Service/Session";
import {LoggedInGuard} from "./Guard/LoggedInGuard";
import {Authorizer} from "./Service/Authorizer";
import {SessionEvents} from "./Service/SessionEvents";
import {LoggedOutGuard} from "./Guard/LoggedOutGuard";
import {SessionState} from "./Service/SessionState";
import {StorageModule} from "@ng-app-framework/storage";
import {CoreModule} from "@ng-app-framework/core";
import {AccessModule} from "@ng-app-framework/access";

@NgModule({
    declarations: [],
    imports     : [
        CommonModule,
        CoreModule,
        RouterModule,
        AccessModule,
        StorageModule
    ],
    exports     : [
        RouterModule
    ],
    providers   : [
        SessionEvents,
        SessionState,
        Session,
        LoggedInGuard,
        LoggedOutGuard,
        Authorizer
    ]
})
export class SessionModule {

    constructor(session: Session) {
    }

}

