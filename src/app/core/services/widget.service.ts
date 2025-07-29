import { Injectable, signal } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';

export interface WidgetConfig {
  id: string;
  name: string;
  isVisible: boolean;
  order: number;
}

@Injectable({
  providedIn: 'root'
})
export class WidgetService {
  private readonly STORAGE_KEY = 'widget-config';

  // Default widget configuration
  private defaultWidgets: WidgetConfig[] = [
    { id: 'calendar', name: 'Kalendar', isVisible: true, order: 1 },
    { id: 'weather', name: 'Ob-havo', isVisible: true, order: 2 },
    { id: 'birthday', name: "Tug'ilgan kunlar", isVisible: true, order: 3 },
    { id: 'meet', name: 'Microsoft Teams', isVisible: true, order: 4 },
    { id: 'notes', name: 'Eslatmalar', isVisible: true, order: 5 }
  ];

  // Signal for reactive state management
  private widgetConfigSignal = signal<WidgetConfig[]>(this.defaultWidgets);

  // Signal for right sidebar visibility
  private isRightSidebarVisible = signal<boolean>(true);

  constructor(private storageService: BrowserStorageService) {
    this.widgetConfigSignal.set(this.loadWidgetConfig());
    this.isRightSidebarVisible.set(this.loadSidebarVisibility());
  }

  // Get current widget configuration
  getWidgetConfig() {
    return this.widgetConfigSignal();
  }

  // Get widget configuration as signal (reactive)
  getWidgetConfigSignal() {
    return this.widgetConfigSignal.asReadonly();
  }

  // Check if a specific widget is visible
  isWidgetVisible(widgetId: string): boolean {
    const widget = this.widgetConfigSignal().find(w => w.id === widgetId);
    return widget?.isVisible ?? false;
  }

  // Toggle widget visibility
  toggleWidget(widgetId: string): void {
    const currentConfig = this.widgetConfigSignal();
    const updatedConfig = currentConfig.map(widget =>
      widget.id === widgetId
        ? { ...widget, isVisible: !widget.isVisible }
        : widget
    );

    this.widgetConfigSignal.set(updatedConfig);
    this.saveWidgetConfig(updatedConfig);
  }

  // Set widget visibility
  setWidgetVisibility(widgetId: string, isVisible: boolean): void {
    const currentConfig = this.widgetConfigSignal();
    const updatedConfig = currentConfig.map(widget =>
      widget.id === widgetId
        ? { ...widget, isVisible }
        : widget
    );

    this.widgetConfigSignal.set(updatedConfig);
    this.saveWidgetConfig(updatedConfig);
  }

  // Get widgets sorted by order
  getSortedWidgets(): WidgetConfig[] {
    return this.widgetConfigSignal().sort((a, b) => a.order - b.order);
  }

  // Update widget order
  updateWidgetOrder(widgetId: string, newOrder: number): void {
    const currentConfig = this.widgetConfigSignal();
    const updatedConfig = currentConfig.map(widget =>
      widget.id === widgetId
        ? { ...widget, order: newOrder }
        : widget
    );

    this.widgetConfigSignal.set(updatedConfig);
    this.saveWidgetConfig(updatedConfig);
  }

  // Right sidebar visibility methods
  isRightSidebarVisibleSignal() {
    return this.isRightSidebarVisible.asReadonly();
  }

  getRightSidebarVisibility(): boolean {
    return this.isRightSidebarVisible();
  }

  toggleRightSidebar(): void {
    const newVisibility = !this.isRightSidebarVisible();
    this.isRightSidebarVisible.set(newVisibility);
    this.saveSidebarVisibility(newVisibility);
  }

  setRightSidebarVisibility(isVisible: boolean): void {
    this.isRightSidebarVisible.set(isVisible);
    this.saveSidebarVisibility(isVisible);
  }

  // Reset to default configuration
  resetToDefault(): void {
    this.widgetConfigSignal.set([...this.defaultWidgets]);
    this.saveWidgetConfig(this.defaultWidgets);
    this.isRightSidebarVisible.set(true);
    this.saveSidebarVisibility(true);
  }

  // Check if any widgets are visible
  hasVisibleWidgets(): boolean {
    return this.widgetConfigSignal().some(widget => widget.isVisible);
  }

  // Private methods for storage
  private loadWidgetConfig(): WidgetConfig[] {
    try {
      const stored = this.storageService.getLocalItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as WidgetConfig[];
        // Merge with defaults to handle new widgets
        return this.mergeWithDefaults(parsed);
      }
    } catch (error) {
      console.error('Error loading widget config:', error);
    }
    return [...this.defaultWidgets];
  }

  private saveWidgetConfig(config: WidgetConfig[]): void {
    try {
      this.storageService.setLocalItem(this.STORAGE_KEY, JSON.stringify(config));
    } catch (error) {
      console.error('Error saving widget config:', error);
    }
  }

  private loadSidebarVisibility(): boolean {
    try {
      const stored = this.storageService.getLocalItem('right-sidebar-visible');
      return stored ? JSON.parse(stored) : true;
    } catch (error) {
      console.error('Error loading sidebar visibility:', error);
      return true;
    }
  }

  private saveSidebarVisibility(isVisible: boolean): void {
    try {
      this.storageService.setLocalItem('right-sidebar-visible', JSON.stringify(isVisible));
    } catch (error) {
      console.error('Error saving sidebar visibility:', error);
    }
  }

  private mergeWithDefaults(storedConfig: WidgetConfig[]): WidgetConfig[] {
    const merged = [...this.defaultWidgets];

    storedConfig.forEach(storedWidget => {
      const defaultIndex = merged.findIndex(w => w.id === storedWidget.id);
      if (defaultIndex >= 0) {
        merged[defaultIndex] = { ...merged[defaultIndex], ...storedWidget };
      }
    });

    return merged;
  }
}
