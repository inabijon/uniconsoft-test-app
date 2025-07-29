import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BrowserStorageService {
    // LocalStorage
    getLocalItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    setLocalItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    removeLocalItem(key: string): void {
        localStorage.removeItem(key);
    }

    clearLocalStorage(): void {
        localStorage.clear();
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
