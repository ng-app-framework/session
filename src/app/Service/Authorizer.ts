import {Injectable} from "@angular/core";
import {AccessController} from "@ng-app-framework/access";
import {Session} from "./Session";
import {Router} from "@angular/router";

@Injectable()
export class Authorizer {

    static homeUri  = '/';
    static loginUri = '/login';

    constructor(public accessController: AccessController, public session: Session, public router: Router) {
    }

    redirectIfUnauthorized(permissions: string[] = ['loggedIn']) {
        if (!this.isAuthorized(permissions)) {
            this.redirect();
        }
    }

    isAuthorized(permissions: string[] = ['loggedIn']) {
        return this.accessController.isRoleAuthorized(this.session.state.role, permissions);
    }

    redirect() {
        if (this.session.isLoggedIn()) {
            return this.router.navigateByUrl(Authorizer.homeUri);
        }
        return this.router.navigateByUrl(Authorizer.loginUri);
    }
}
