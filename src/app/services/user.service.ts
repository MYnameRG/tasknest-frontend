import APIService from '../apis/index';
import localStorageService from './local-storage.service';
import type { APIProvider } from '../apis/types/types';
import type { User } from '../models/User.model';
import type { localStorage } from '../interfaces/LocalStorage.model';

class UserService {
    private api = APIService() as APIProvider;
    private localStorageService = localStorageService as localStorage;
    private baseURL = "/auth";

    constructor() {}

    /**
     * Register a new user
     */
    register(payload: User) {
        return this.api?.post(`${this.baseURL}/register`, payload);
    }

    /**
     * Login user
     */
    login(payload: User) {
        return this.api?.post(`${this.baseURL}/login`, payload);
    }

    /**
     * Logout user
     */
    logout() {
        this.localStorageService?.clearItems();
    }
}

export default new UserService();