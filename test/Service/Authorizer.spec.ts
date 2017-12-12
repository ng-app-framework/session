import {Authorizer} from "../../src/app/Service/Authorizer";

describe('Module: Session', () => {
    describe('Class: Authorizer', () => {

        describe('After Instantiation', () => {
            let subject: Authorizer;
            let router           = <any>{
                navigateByUrl: (url: string) => {
                }
            };
            let session          = <any>{
                loggedIn  : false,
                state: {
                    role: ''
                },
                isLoggedIn: () => {
                    return session.loggedIn
                }
            };

            beforeEach(() => {
                router           = <any>{
                    navigateByUrl: (url: string) => {
                    }
                };
                session          = <any>{
                    loggedIn  : false,
                    state: {
                        role: ''
                    },
                    isLoggedIn: () => {
                        return session.loggedIn
                    }
                };
                subject          = new Authorizer(session, router);
            });

            describe('Method: Redirect if Unauthorized', () => {
                it('should only redirect if unauthorized', () => {
                    let redirected                    = false;

                    subject.redirectIfUnauthorized([]);
                    expect(redirected).toBeFalsy('should not have redirected');
                    router.navigateByUrl              = () => {
                        redirected = true;
                    };
                    subject.redirectIfUnauthorized(['loggedIn']);
                    expect(redirected).toBeTruthy('should have redirected');
                });
            });
            describe('Method Redirect', () => {
                it('should redirect to base path if logged in', () => {
                    router.navigateByUrl = (uri) => expect(uri).toEqual(Authorizer.homeUri);
                    session.loggedIn = true;
                    subject.redirect();
                });
                it('should redirect to the login url if not logged in', () => {
                    router.navigateByUrl = (uri) => expect(uri).toEqual(Authorizer.loginUri);
                    session.loggedIn = false;
                    subject.redirect();
                });
            });
        });

    });
});
