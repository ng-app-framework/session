import {SessionState} from "../../src/app/Service/SessionState";

describe('Module: Session', () => {
    describe('Class: SessionState', () => {

        describe('After Instantiation', () => {
            let subject: SessionState;

            beforeEach(() => {
                subject          = new SessionState();
                subject.loggedIn = false;
            });

            describe('Method: Load', () => {
                let calledInitialize = false;
                beforeEach(() => {
                    calledInitialize   = false;
                    subject.initialize = () => {
                        calledInitialize = true;
                    };
                });
                it('should call initialize if no cache exists', () => {
                    subject.loadFromStorage = () => {
                        subject.loggedIn = false;
                    };
                    subject.load();
                    expect(calledInitialize).toBeTruthy();
                });
                it('should NOT call initialize if cache exists', () => {
                    subject.loadFromStorage = () => {
                        subject.loggedIn = true;
                    };
                    subject.load();
                    expect(calledInitialize).toBeFalsy();
                });
            });
            describe('Method: Update', () => {
                it('should override values on the state when keys exist', () => {
                    subject.update({
                        loggedIn : true,
                        userId   : 1,
                        firstName: 'should',
                        lastName : 'work',
                        role     : 'bob',
                        isAdmin  : true
                    });
                    expect(subject.loggedIn).toBeTruthy('loggedIn');
                    expect(subject.userId).toEqual(1, 'userId');
                    expect(subject.firstName).toEqual('should', 'firstName');
                    expect(subject.lastName).toEqual('work', 'lastName');
                    expect(subject.role).toEqual('bob', 'role');
                    expect(subject.isAdmin).toBeTruthy('isAdmin');
                });
            });
            describe('Method: Save From Response', () => {
                it('should call update', () => {
                    subject.update = (structure: any) => {
                        expect(structure).toEqual({
                            userId   : 1,
                            role     : 'Member',
                            isAdmin  : false,
                            firstName: '',
                            lastName : '',
                            loggedIn : true
                        });
                    };
                    subject.saveFromResponse({
                        userId : 1,
                        isAdmin: false
                    });
                });
            });
            describe('Method: Initialize', () => {
                it('should reset to the default values', () => {
                    subject.loggedIn  = true;
                    subject.role      = '';
                    subject.firstName = '';
                    subject.lastName  = '';
                    subject.isAdmin   = true;
                    subject.initialize();
                    expect(subject.loggedIn).toBeFalsy('loggedIn');
                    expect(subject.role).toEqual(SessionState.DEFAULT_ROLE);
                    expect(subject.firstName).toEqual(SessionState.DEFAULT_FIRST_NAME);
                    expect(subject.lastName).toEqual(SessionState.DEFAULT_LAST_NAME);
                    expect(subject.isAdmin).toEqual(SessionState.DEFAULT_IS_ADMIN);
                });
            });
        });

    });
});
