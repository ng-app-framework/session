import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Session} from "./Service/Session";
import {Authorizer} from "./Service/Authorizer";
import {SessionEvents} from "./Service/SessionEvents";
import {SessionState} from "./Service/SessionState";
import {NgStorageModule} from "@ng-app-framework/storage";
import {NgCoreModule} from "@ng-app-framework/core";

@NgModule({
    declarations: [],
    imports     : [
        CommonModule,
        NgCoreModule,
        RouterModule,
        NgStorageModule
    ],
    providers   : [
        SessionEvents,
        SessionState,
        Session,
        Authorizer
    ]
})
export class NgSessionModule {

    constructor(session: Session) {
    }

}

