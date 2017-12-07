import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Session} from "../Service/Session";

@Injectable()
export class LoggedInGuard implements CanActivate {


    constructor(public session?: Session, public router?: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authorize(state.url);
    }

    authorize(path: string) {
        if (!this.session.isLoggedIn()) {
            this.router.navigateByUrl('/login?return=' + path).then();
            return false;
        }
        return true;
    }
}
