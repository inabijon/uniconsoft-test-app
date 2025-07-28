import { NgClass, UpperCasePipe } from '@angular/common';
import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-language-switcher',
  imports: [MenuModule, ButtonModule, NgClass, UpperCasePipe],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
})
export class LanguageSwitcherComponent implements OnInit {
  @Input() actions: any;
  @ViewChild('menu') menu: any;
  @Input() appendTo: any;
  languages: MenuItem[] | undefined;

  private browserService: BrowserStorageService = inject(BrowserStorageService);

  constructor() {}

  get currentLanguage() {
    return this.browserService.getLocalItem('lang') || 'en';
  }

  ngOnInit(): void {
    this.languages = this.browserService.availableLangs.map((lang: any) => {
      return { label: lang, command: () => this.chooseLanguage(lang) };
    });
  }

  chooseLanguage(code: string) {
    this.browserService.setLocalItem('lang', code);
    this.browserService.loadLanguage(code).subscribe(() => {});
  }

  toggleMenu() {
    // Menyu faqat bitta marta ochilishi va yopilishi kerak
  }
}
