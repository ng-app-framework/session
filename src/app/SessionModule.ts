import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Session} from "./Service/Session";
import {Authorizer} from "./Service/Authorizer";
import {SessionEvents} from "./Service/SessionEvents";
import {SessionState} from "./Service/SessionState";
import {StorageModule} from "@ng-app-framework/storage";
import {CoreModule} from "@ng-app-framework/core";

@NgModule({
    declarations: [],
    imports     : [
        CommonModule,
        CoreModule,
        RouterModule,
        StorageModule
    ],
    providers   : [
        SessionEvents,
        SessionState,
        Session,
        Authorizer
    ]
})
export class SessionModule {

    constructor(session: Session) {
    }

}

