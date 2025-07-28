import { NgClass, UpperCasePipe, CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  imports: [MenuModule, ButtonModule, NgClass, UpperCasePipe, CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
})
export class LanguageSwitcherComponent implements OnInit {
  @Input() actions: any;
  @ViewChild('menu') menu: any;
  @Input() appendTo: any;
  languages: MenuItem[] | undefined;

  private languageService: LanguageService = inject(LanguageService);

  // Tillar uchun ma'lumotlar
  languageData: { [key: string]: { name: string; flag: string } } = {
    'uz': { name: "O'zbekcha", flag: '/images/icons/uzb.svg' },
    'ru': { name: 'Русский', flag: '/images/icons/rus.svg' },
  };

  get currentLanguage() {
    return this.languageService.getLocalItem('lang') || this.languageService.getDefaultLang();
  }

  get currentLanguageData() {
    return this.languageData[this.currentLanguage] || this.languageData['uz'];
  }

  ngOnInit(): void {
    this.languages = this.languageService.availableLanguages.map((lang: any) => {
      const langData = this.languageData[lang] || { name: lang, flag: '🌐' };
      return {
        label: langData.name,
        icon: langData.flag,
        code: lang,
        command: () => this.chooseLanguage(lang)
      };
    });
  }

  chooseLanguage(code: string) {
    this.languageService.setLanguage(code);
  }

  toggleMenu() {
    // Menyu faqat bitta marta ochilishi va yopilishi kerak
  }
}
