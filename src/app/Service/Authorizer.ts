import {Injectable} from "@angular/core";
import {Session} from "./Session";
import {Router} from "@angular/router";

@Injectable()
export class Authorizer {

    static homeUri  = '/';
    static loginUri = '/login';

    constructor(public session: Session, public router: Router) {
    }

    redirectIfUnauthorized(permissions: string[] = ['loggedIn']) {
        if (!this.isAuthorized(permissions)) {
            return this.redirect();
        }
    }

    isAuthorized(permissions: string[] = ['loggedIn']) {
        return permissions.indexOf('loggedIn') !== -1 && this.session.isLoggedIn();
    }

    redirect() {
        if (this.session.isLoggedIn()) {
            return this.router.navigateByUrl(Authorizer.homeUri);
        }
        return this.router.navigateByUrl(Authorizer.loginUri);
    }
}
