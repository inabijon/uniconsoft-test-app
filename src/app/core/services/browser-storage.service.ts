import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BrowserStorageService {
    private storage: Storage;

    constructor() {
        this.storage = localStorage; // default to localStorage
    }

    // LocalStorage
    getLocalItem(key: string): string | null {
        return this.storage.getItem(key);
    }

    setLocalItem(key: string, value: string): void {
        this.storage.setItem(key, value);
    }

    removeLocalItem(key: string): void {
        this.storage.removeItem(key);
    }

    clearLocalStorage(): void {
        this.storage.clear();
    }

    // SessionStorage
    getSessionItem(key: string): string | null {
        return sessionStorage.getItem(key);
    }

    setSessionItem(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }

    removeSessionItem(key: string): void {
        sessionStorage.removeItem(key);
    }

    clearSessionStorage(): void {
        sessionStorage.clear();
    }
}