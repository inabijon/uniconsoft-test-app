import { Injectable, effect, signal, computed } from '@angular/core';
import { Subject } from 'rxjs';

export interface layoutConfig {
  preset?: string;
  primary?: string;
  surface?: string | undefined | null;
  darkTheme?: boolean;
  menuMode?: string;
  backgroundImageWithClass?: string;
}

interface LayoutState {
  staticMenuDesktopInactive?: boolean;
  overlayMenuActive?: boolean;
  configSidebarVisible?: boolean;
  staticMenuMobileActive?: boolean;
  menuHoverActive?: boolean;
  overlayCompactMode?: boolean; // Overlay rejimi uchun compact mode
}

interface MenuChangeEvent {
  key: string;
  routeEvent?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  _config: layoutConfig = {
    preset: 'Aura',
    primary: 'emerald',
    surface: null,
    darkTheme: false,
    menuMode: 'static',
    backgroundImageWithClass: 'bg-[url("../public/blue_bg.jpg")] bg-top-left bg-no-repeat bg-cover bg-fixed'
  };

  _state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
    overlayCompactMode: false,
  };

  layoutConfig = signal<layoutConfig>(this._config);

  layoutState = signal<LayoutState>(this._state);

  private configUpdate = new Subject<layoutConfig>();

  private overlayOpen = new Subject<any>();

  private menuSource = new Subject<MenuChangeEvent>();

  private resetSource = new Subject();

  menuSource$ = this.menuSource.asObservable();

  resetSource$ = this.resetSource.asObservable();

  configUpdate$ = this.configUpdate.asObservable();

  overlayOpen$ = this.overlayOpen.asObservable();

  theme = computed(() => (this.layoutConfig()?.darkTheme ? 'light' : 'dark'));

  isSidebarActive = computed(
    () =>
      this.layoutState().overlayMenuActive ||
      this.layoutState().staticMenuMobileActive
  );

  isDarkTheme = computed(() => this.layoutConfig().darkTheme);

  getPrimary = computed(() => this.layoutConfig().primary);

  getSurface = computed(() => this.layoutConfig().surface);

  isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');

  backgroundImageWithClass = computed(() => this.layoutConfig().backgroundImageWithClass);

  // Desktop sidebar rejimini aniqlash uchun computed
  isDesktopSidebarCompact = computed(() =>
    this.isOverlay() && this.isDesktop() && this.layoutState().overlayCompactMode && !this.layoutState().staticMenuDesktopInactive
  );

  // Desktop sidebar to'liq yashirilganligini aniqlash
  isDesktopSidebarHidden = computed(() =>
    this.isOverlay() && this.isDesktop() && this.layoutState().staticMenuDesktopInactive
  );

  // Overlay rejimida full sidebar ko'rsatish
  isDesktopSidebarFull = computed(() =>
    this.isOverlay() && this.isDesktop() && !this.layoutState().overlayCompactMode && !this.layoutState().staticMenuDesktopInactive
  );

  // Static rejimda sidebar ko'rsatish yoki yashirish
  isStaticSidebarVisible = computed(() =>
    !this.isOverlay() && this.isDesktop() && !this.layoutState().staticMenuDesktopInactive
  );

  isStaticSidebarHidden = computed(() =>
    !this.isOverlay() && this.isDesktop() && this.layoutState().staticMenuDesktopInactive
  );  transitionComplete = signal<boolean>(false);

  private initialized = false;

  constructor() {
    effect(() => {
      const config = this.layoutConfig();
      if (config) {
        this.onConfigUpdate();
      }
    });

    effect(() => {
      const config = this.layoutConfig();

      if (!this.initialized || !config) {
        this.initialized = true;
        return;
      }

      this.handleDarkModeTransition(config);
    });
  }

  private handleDarkModeTransition(config: layoutConfig): void {
    if ((document as any).startViewTransition) {
      this.startViewTransition(config);
    } else {
      this.toggleDarkMode(config);
      this.onTransitionEnd();
    }
  }

  private startViewTransition(config: layoutConfig): void {
    const transition = (document as any).startViewTransition(() => {
      this.toggleDarkMode(config);
    });

    transition.ready
      .then(() => {
        this.onTransitionEnd();
      })
      .catch(() => {});
  }

  toggleDarkMode(config?: layoutConfig): void {
    const _config = config || this.layoutConfig();
    if (_config.darkTheme) {
      document.documentElement.classList.add('app-dark');
    } else {
      document.documentElement.classList.remove('app-dark');
    }
  }

  private onTransitionEnd() {
    this.transitionComplete.set(true);
    setTimeout(() => {
      this.transitionComplete.set(false);
    });
  }

  onMenuToggle() {
    if (this.isDesktop()) {
      if (this.isOverlay()) {
        // Overlay rejimida: full -> compact -> hidden -> full cycle
        const currentState = this.layoutState();

        if (!currentState.overlayCompactMode && !currentState.staticMenuDesktopInactive) {
          // Full -> Compact
          this.layoutState.update((prev) => ({
            ...prev,
            overlayCompactMode: true,
          }));
        } else if (currentState.overlayCompactMode && !currentState.staticMenuDesktopInactive) {
          // Compact -> Full (hidden holatini olib tashlaymiz)
          this.layoutState.update((prev) => ({
            ...prev,
            overlayCompactMode: false,
          }));
        } else {
          // Agar biror sababdan hidden holatda bo'lsa -> Full ga qaytarish
          this.layoutState.update((prev) => ({
            ...prev,
            overlayCompactMode: false,
            staticMenuDesktopInactive: false,
          }));
        }
      } else {
        // Static rejimida: oddiy toggle (show/hide)
        this.layoutState.update((prev) => ({
          ...prev,
          staticMenuDesktopInactive: !prev.staticMenuDesktopInactive,
        }));
      }
    } else {
      // Mobil/tablet versiyada overlay (drawer) ko'rinishida ochish
      this.layoutState.update((prev) => ({
        ...prev,
        staticMenuMobileActive: !this.layoutState().staticMenuMobileActive,
      }));

      if (this.layoutState().staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  isMobile() {
    return !this.isDesktop();
  }

  onConfigUpdate() {
    this._config = { ...this.layoutConfig() };
    this.configUpdate.next(this.layoutConfig());
  }

  onMenuStateChange(event: MenuChangeEvent) {
    this.menuSource.next(event);
  }

  reset() {
    this.resetSource.next(true);
  }

  // Test uchun overlay rejimini o'rnatish
  setOverlayMode() {
    this.layoutConfig.update(prev => ({
      ...prev,
      menuMode: 'overlay'
    }));
  }

  // Test uchun static rejimini o'rnatish
  setStaticMode() {
    this.layoutConfig.update(prev => ({
      ...prev,
      menuMode: 'static'
    }));
  }

  // Debug uchun current state ni log qilish
  logCurrentState() {
    console.log('Layout State:', {
      isOverlay: this.isOverlay(),
      isDesktop: this.isDesktop(),
      staticMenuDesktopInactive: this.layoutState().staticMenuDesktopInactive,
      overlayCompactMode: this.layoutState().overlayCompactMode,
      isDesktopSidebarFull: this.isDesktopSidebarFull(),
      isDesktopSidebarCompact: this.isDesktopSidebarCompact(),
      isDesktopSidebarHidden: this.isDesktopSidebarHidden(),
      isStaticSidebarVisible: this.isStaticSidebarVisible(),
      isStaticSidebarHidden: this.isStaticSidebarHidden()
    });
  }
}
