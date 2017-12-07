import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Session} from "../Service/Session";
import {Value} from "@ng-app-framework/core";

@Injectable()
export class LoggedOutGuard implements CanActivate {


    constructor(public session?: Session, public router?: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authorize(route.queryParams);
    }

    authorize(params) {
        if (this.session.isLoggedIn()) {
            if (Value.isProvided(params.return)) {
                this.router.navigateByUrl(params.return).then();
                return false;
            }
            this.router.navigateByUrl('/').then();
            return false;
        }
        return true;
    }
}
