import { Component, signal, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { TooltipModule } from 'primeng/tooltip';
import { Popover } from 'primeng/popover';
import { MenuItem } from 'primeng/api';
import { NgClass } from '@angular/common';
import { LayoutService } from '../../../services/layout.service';

// Interface for menu items with submenu support
interface MenuItemWithSubmenu {
  id: string;
  label: string;
  icon?: string;
  imageSrc?: string;
  hasSubmenu?: boolean;
  submenuItems?: ExtendedMenuItem[];
  action?: () => void;
  routerLink?: string;
}

// Extended MenuItem with routerLink support
interface ExtendedMenuItem extends MenuItem {
  routerLink?: string;
}

// Interface for menu groups with labels
interface MenuGroup {
  label?: string;
  menus: MenuItemWithSubmenu[];
}
@Component({
  selector: 'app-sidebar',
  imports: [
    SidebarModule,
    ButtonModule,
    NgClass,
    PopoverModule,
    TooltipModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @ViewChild('createDocumentPopover') createDocumentPopover!: Popover;
  @ViewChild('mobileCreateDocumentPopover') mobileCreateDocumentPopover!: Popover;
  @ViewChild('compactSubmenuPanel') compactSubmenuPanel!: Popover;
  @Input() isDesktop: boolean = true;
  @Input() isCompact: boolean = false;

  sidebarVisible = signal(false);
  submenuStates = signal<Record<string, boolean>>({});
  isAnimating = signal<Record<string, boolean>>({});

  constructor(public layoutService: LayoutService, private router: Router) {}

  get isMobileSidebarVisible(): boolean {
    return this.layoutService.layoutState().staticMenuMobileActive || false;
  }

  onMobileSidebarVisibleChange(visible: boolean) {
    this.layoutService.layoutState.update((prev) => ({
      ...prev,
      staticMenuMobileActive: visible,
    }));
  }

  // Compact rejim uchun submenu ko'rsatish
  showCompactSubmenu(event: Event, item: MenuItemWithSubmenu) {
    if (this.isCompact && item.hasSubmenu && this.compactSubmenuPanel) {
      // Submenu items ni ExtendedMenuItem formatiga aylantirish
      const submenuItems: ExtendedMenuItem[] = item.submenuItems || [];

      // Popover ni ochish
      this.compactSubmenuPanel.toggle(event);

      // Panel content ni yangilash uchun small delay
      setTimeout(() => {
        this.currentCompactSubmenu = submenuItems;
      }, 10);
    } else if (item.routerLink) {
      this.router.navigate([item.routerLink]);
    } else if (item.action) {
      item.action();
    }
  }

  currentCompactSubmenu: ExtendedMenuItem[] = [];

  createDocumentItems = [
    {
      label: 'Yangi Hujjat',
      icon: 'pi pi-file',
      command: () => this.createDocument('hujjat'),
    },
    {
      label: 'Yangi Jurnal',
      icon: 'pi pi-book',
      command: () => this.createDocument('jurnal'),
    },
    {
      label: 'Yangi Reja',
      icon: 'pi pi-calendar',
      command: () => this.createDocument('reja'),
    },
  ];

  // Menu groups with labels
  menuGroups: MenuGroup[] = [
    {
      label: 'ICHKI HUJJATLAR',
      menus: [
        {
          id: 'home',
          label: 'Bosh sahifa',
          imageSrc: './images/icons/home.svg',
          hasSubmenu: false,
          routerLink: '/home',
          action: () => this.navigateToHome(),
        },
        {
          id: 'calendar',
          label: 'Taqvim',
          imageSrc: './images/icons/calendar.svg',
          hasSubmenu: false,
          routerLink: '/calendar',
        },
        {
          id: 'documents',
          label: 'Mening hujjatlarim',
          imageSrc: './images/icons/messages.svg',
          hasSubmenu: false,
          routerLink: '/documents',
        },
        {
          id: 'sent',
          label: 'Yuborilgan',
          imageSrc: './images/icons/plane_message.svg',
          hasSubmenu: true,
          submenuItems: [
            {
              label: 'Barcha yuborilgan',
              icon: 'pi pi-send',
              routerLink: '/sent/all',
              command: () => this.navigateToSent(),
            },
            {
              label: 'Yuborilgan xabarlar',
              icon: 'pi pi-envelope',
              routerLink: '/sent/messages',
              command: () => this.navigateToNewMessages(),
            },
          ],
        },
        {
          id: 'inbox',
          label: 'Kelib tushgan',
          imageSrc: './images/icons/inbox.svg',
          hasSubmenu: true,
          submenuItems: [
            {
              label: 'Yangi xabarlar',
              icon: 'pi pi-envelope',
              routerLink: '/inbox/new',
              command: () => this.navigateToNewMessages(),
            },
            {
              label: "O'qilgan",
              icon: 'pi pi-eye',
              routerLink: '/inbox/read',
              command: () => this.navigateToReadMessages(),
            },
            {
              label: 'Muhim',
              icon: 'pi pi-star',
              routerLink: '/inbox/important',
              command: () => this.navigateToImportantMessages(),
            },
          ],
        },
        {
          id: 'agreement',
          label: 'Kelishish uchun',
          imageSrc: './images/icons/to_agree.svg',
          hasSubmenu: false,
          routerLink: '/agreement',
          action: () => this.navigateToAgreement(),
        },
        {
          id: 'resolution',
          label: 'Rezolyutsiya',
          imageSrc: './images/icons/sign_resolution.svg',
          hasSubmenu: false,
          routerLink: '/resolution',
        },
        {
          id: 'signing',
          label: 'Imzolash uchun',
          imageSrc: './images/icons/sign.svg',
          hasSubmenu: false,
          routerLink: '/signing',
          action: () => this.navigateToSigning(),
        },
        {
          id: 'sector',
          label: 'Sektor fishka',
          icon: 'pi pi-building',
          hasSubmenu: true,
          submenuItems: [
            {
              label: 'Sektor hujjatlari',
              icon: 'pi pi-file',
              routerLink: '/sector/documents',
              command: () => this.navigateToSektorDocs(),
            },
            {
              label: 'Sektor xodimlari',
              icon: 'pi pi-users',
              routerLink: '/sector/staff',
              command: () => this.navigateToSektorStaff(),
            },
            {
              label: 'Sektor statistikasi',
              icon: 'pi pi-chart-bar',
              routerLink: '/sector/statistics',
              command: () => this.navigateToSektorStats(),
            },
          ],
        },
        {
          id: 'department',
          label: "Bo'limim hujjatlari",
          icon: 'pi pi-briefcase',
          hasSubmenu: false,
          routerLink: '/department',
        },
        {
          id: 'editor',
          label: 'Tahririchi',
          icon: 'pi pi-chart-bar',
          hasSubmenu: false,
          routerLink: '/editor',
          action: () => this.navigateToEditor(),
        },
      ]
    },
    {
      label: 'STATISTIKA',
      menus: [
        {
          id: 'statistics',
          label: 'Statistika',
          icon: 'pi pi-chart-line',
          hasSubmenu: true,
          submenuItems: [
            {
              label: 'Umumiy statistika',
              icon: 'pi pi-chart-pie',
              routerLink: '/statistics/general',
              command: () => this.navigateToGeneralStats(),
            },
            {
              label: 'Oylik hisobot',
              icon: 'pi pi-calendar',
              routerLink: '/statistics/monthly',
              command: () => this.navigateToMonthlyReport(),
            },
            {
              label: 'Yillik hisobot',
              icon: 'pi pi-calendar-times',
              routerLink: '/statistics/yearly',
              command: () => this.navigateToYearlyReport(),
            },
          ],
        },
        {
          id: 'reports',
          label: 'Hisobotlar',
          icon: 'pi pi-file-export',
          hasSubmenu: true,
          submenuItems: [
            {
              label: 'Hujjatlar hisoboti',
              icon: 'pi pi-file',
              routerLink: '/reports/documents',
              command: () => this.navigateToDocumentReports(),
            },
            {
              label: 'Xodimlar hisoboti',
              icon: 'pi pi-users',
              routerLink: '/reports/staff',
              command: () => this.navigateToStaffReports(),
            },
            {
              label: 'Faoliyat hisoboti',
              icon: 'pi pi-chart-bar',
              routerLink: '/reports/activity',
              command: () => this.navigateToActivityReports(),
            },
          ],
        },
      ]
    },
    {
      // Label bo'sh bo'lgan guruh - label ko'rinmaydi
      menus: [
        {
          id: 'settings',
          label: 'Sozlamalar',
          icon: 'pi pi-cog',
          hasSubmenu: false,
          routerLink: '/settings',
        },
        {
          id: 'profile',
          label: 'Profil',
          icon: 'pi pi-user',
          hasSubmenu: false,
          routerLink: '/profile',
        },
      ]
    }
  ];

  // Mobile navigation items (simplified)
  mobileNavigationItems: MenuItemWithSubmenu[] = [
    {
      id: 'home-mobile',
      label: 'Bosh sahifa',
      icon: 'pi pi-home',
      hasSubmenu: false,
      action: () => this.navigateToHome(),
    },
    {
      id: 'calendar-mobile',
      label: 'Taqvim',
      icon: 'pi pi-calendar',
      hasSubmenu: true,
      submenuItems: [
        {
          label: 'Bugungi kunlar',
          icon: 'pi pi-calendar-today',
          command: () => this.navigateToTodayEvents(),
        },
        {
          label: "Haftalik ko'rinish",
          icon: 'pi pi-calendar-week',
          command: () => this.navigateToWeekView(),
        },
      ],
    },
    {
      id: 'documents-mobile',
      label: 'Mening hujjatlarim',
      icon: 'pi pi-file',
      hasSubmenu: true,
      submenuItems: [
        {
          label: 'Barcha hujjatlar',
          icon: 'pi pi-file',
          command: () => this.navigateToAllDocs(),
        },
        {
          label: 'Tayyorlanayotgan',
          icon: 'pi pi-clock',
          command: () => this.navigateToDrafts(),
        },
      ],
    },
    {
      id: 'sent-mobile',
      label: 'Yuborilgan',
      icon: 'pi pi-send',
      hasSubmenu: false,
      action: () => this.navigateToSent(),
    },
    {
      id: 'inbox-mobile',
      label: 'Kelib tushgan',
      icon: 'pi pi-inbox',
      hasSubmenu: true,
      submenuItems: [
        {
          label: 'Yangi xabarlar',
          icon: 'pi pi-envelope',
          command: () => this.navigateToNewMessages(),
        },
        {
          label: "O'qilgan",
          icon: 'pi pi-eye',
          command: () => this.navigateToReadMessages(),
        },
      ],
    },
    {
      id: 'sector-mobile',
      label: 'Sektor fishka',
      icon: 'pi pi-building',
      hasSubmenu: true,
      submenuItems: [
        {
          label: 'Sektor hujjatlari',
          icon: 'pi pi-file',
          command: () => this.navigateToSektorDocs(),
        },
        {
          label: 'Sektor xodimlari',
          icon: 'pi pi-users',
          command: () => this.navigateToSektorStaff(),
        },
        {
          label: 'Sektor statistikasi',
          icon: 'pi pi-chart-bar',
          command: () => this.navigateToSektorStats(),
        },
      ],
    },
  ];

  createDocument(type: string) {
    if (type === 'default') {
      // Default action when main button is clicked
      console.log('Creating default document (Yangi Hujjat)');
      // You can implement the default create action here
    } else {
      console.log('Creating document of type:', type);
      // Implement your create logic here based on type
    }
  }

  showMenu(event: Event) {
    this.createDocumentPopover.toggle(event);
  }

  showMobileMenu(event: Event) {
    this.mobileCreateDocumentPopover.toggle(event);
  }

  // Universal submenu toggle method
  toggleSubmenu(menuId: string) {
    const animatingStates = this.isAnimating();
    if (animatingStates[menuId]) return; // Prevent multiple clicks during animation

    // Update animation state
    this.isAnimating.set({
      ...animatingStates,
      [menuId]: true,
    });

    // Toggle submenu visibility
    const submenuStates = this.submenuStates();
    this.submenuStates.set({
      ...submenuStates,
      [menuId]: !submenuStates[menuId],
    });

    // Reset animation flag after animation completes
    setTimeout(() => {
      const currentAnimatingStates = this.isAnimating();
      this.isAnimating.set({
        ...currentAnimatingStates,
        [menuId]: false,
      });
    }, 300);
  }

  // Menu item click handler
  onMenuItemClick(item: MenuItemWithSubmenu) {
    if (item.routerLink) {
      this.router.navigate([item.routerLink]);
    } else if (item.action) {
      item.action();
    }
  }

  // Submenu item click handler
  onSubmenuItemClick(subItem: ExtendedMenuItem) {
    if (subItem.routerLink) {
      this.router.navigate([subItem.routerLink]);
    } else if (subItem.command) {
      subItem.command({});
    }
  }

  // Check if submenu is visible
  isSubmenuVisible(menuId: string): boolean {
    return this.submenuStates()[menuId] || false;
  }

  // Getter methods for backward compatibility
  get ichkiHujjatlarItems(): MenuItemWithSubmenu[] {
    return this.menuGroups.find(group => group.label === 'ICHKI HUJJATLAR')?.menus || [];
  }

  get statistikaItems(): MenuItemWithSubmenu[] {
    return this.menuGroups.find(group => group.label === 'STATISTIKA')?.menus || [];
  }

  // Navigation methods
  navigateToHome() {
    console.log('Navigating to Home');
  }

  navigateToTodayEvents() {
    console.log('Navigating to Today Events');
  }

  navigateToWeekView() {
    console.log('Navigating to Week View');
  }

  navigateToMonthView() {
    console.log('Navigating to Month View');
  }

  navigateToAllDocs() {
    console.log('Navigating to All Documents');
  }

  navigateToDrafts() {
    console.log('Navigating to Drafts');
  }

  navigateToSent() {
    console.log('Navigating to Sent');
  }

  navigateToNewMessages() {
    console.log('Navigating to New Messages');
  }

  navigateToReadMessages() {
    console.log('Navigating to Read Messages');
  }

  navigateToImportantMessages() {
    console.log('Navigating to Important Messages');
  }

  navigateToAgreement() {
    console.log('Navigating to Agreement');
  }

  navigateToNewResolutions() {
    console.log('Navigating to New Resolutions');
  }

  navigateToProcessingResolutions() {
    console.log('Navigating to Processing Resolutions');
  }

  navigateToCompletedResolutions() {
    console.log('Navigating to Completed Resolutions');
  }

  navigateToSigning() {
    console.log('Navigating to Signing');
  }

  navigateToEditor() {
    console.log('Navigating to Editor');
  }

  navigateToDepartmentDocs() {
    console.log('Navigating to Department Documents');
  }

  navigateToDepartmentStaff() {
    console.log('Navigating to Department Staff');
  }

  navigateToDepartmentReports() {
    console.log('Navigating to Department Reports');
  }

  navigateToSektorDocs() {
    console.log('Navigating to Sektor hujjatlari');
    // Implement navigation logic here
  }

  navigateToSektorStaff() {
    console.log('Navigating to Sektor xodimlari');
    // Implement navigation logic here
  }

  navigateToSektorStats() {
    console.log('Navigating to Sektor statistikasi');
    // Implement navigation logic here
  }

  // New navigation methods for STATISTIKA group
  navigateToGeneralStats() {
    console.log('Navigating to Umumiy statistika');
    // Implement navigation logic here
  }

  navigateToMonthlyReport() {
    console.log('Navigating to Oylik hisobot');
    // Implement navigation logic here
  }

  navigateToYearlyReport() {
    console.log('Navigating to Yillik hisobot');
    // Implement navigation logic here
  }

  navigateToDocumentReports() {
    console.log('Navigating to Hujjatlar hisoboti');
    // Implement navigation logic here
  }

  navigateToStaffReports() {
    console.log('Navigating to Xodimlar hisoboti');
    // Implement navigation logic here
  }

  navigateToActivityReports() {
    console.log('Navigating to Faoliyat hisoboti');
    // Implement navigation logic here
  }
}
