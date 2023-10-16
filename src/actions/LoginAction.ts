import {Action} from '.';
import * as qs from 'qs';
import NooNoo from '../NooNoo';
import AuthAction from "../types/AuthAction";
import {AxiosInstance} from "axios";

export const JWT_KEY = 'portofino_jwt';

export interface UserInfo {
    displayName: string;
    administrator: boolean;
    groups: string[];
    jwt: string;

    [key: string]: any;
}

interface StateChangeObserverList {
    id: number;
    callback: (a: UserInfo | null) => any;
}

export class LoginAction extends Action {
    private is_authenticated?: boolean;

    private stateChangeObserver: StateChangeObserverList[] = [];
    private stateChangeSequence = 0;

    constructor(
        _nooNoo: NooNoo,
        public action: AuthAction | string,
        crudActionClasses: string[]
    ) {
        let loginAction
        if (action instanceof Object) {
            loginAction = (action as AuthAction).action
        } else {
            loginAction = action
        }

        super(_nooNoo, loginAction, crudActionClasses,undefined);
        this.is_authenticated = !!localStorage.getItem(JWT_KEY);
    }

    async passwordReset(email: String, siteName: String, resetPageURL: String) {
        await this.http.post(':send-reset-password-email', {
            email: email,
            siteNameOrAddress: siteName,
            loginPageUrl: resetPageURL,
        });
    }

    async doPasswordReset(resetToken: String, newPassword: String) {
        return await this.http.post(':reset-password', {
            token: resetToken,
            newPassword,
        });
    }

    //Auth state
    isAuthenticated() {
        return this.is_authenticated;
    }

    onAuthStateChanged(nextOrObserver: (a: UserInfo | null) => any): () => any {
        const observerId = this.stateChangeSequence++;
        this.stateChangeObserver.push({
            id: observerId,
            callback: nextOrObserver,
        });

        return () => {
            this.stateChangeObserver = this.stateChangeObserver.filter(
                (el) => el.id !== observerId
            );
        };
    }

    private emitAuthStateChange(user: UserInfo) {
        this.stateChangeObserver.forEach(({callback}) => callback(user));
    }

    //Autentication
    async getUserInfo() {
        try {
            const {data: user} = await this.http.get('');
            return user;
        } catch (e) {
            console.debug('[Portofino] Session expired, logging out');
            await this.logout();
            throw e;
        }
    }

    async checkAuth() {
        try {
            await this.getUserInfo();
            return true;
        } catch (e) {
            return false;
        }
    }

    async login(username: string, password: string): Promise<UserInfo> {
        const loginParams = qs.stringify({username, password});

        try {
            const {data: user} = await this.http.post('', loginParams, {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            });
            const _jwt = `Bearer ${user.jwt}`;
            localStorage.setItem(JWT_KEY, _jwt);
            this.is_authenticated = true
            this.emitAuthStateChange(user);

            return user;
        } catch (e) {
            throw e;
        }
    }

    async logout() {
        localStorage.removeItem(JWT_KEY);
        this.is_authenticated = false;
        this.emitAuthStateChange(null);
    }

    public static async refreshToken(instance: AxiosInstance, loginAction: string): Promise<void> {
        try {
            const response = await instance.post(loginAction + '/:refresh-token', {});
            const _jwt = `Bearer ${response.data}`;
            localStorage.setItem(JWT_KEY, _jwt);
        } catch (e) {
            throw e;
        }
    }
}
