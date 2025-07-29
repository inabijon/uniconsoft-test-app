import { Component } from '@angular/core';
import { GlobalSearchBarComponent } from './global-search-bar/global-search-bar.component';
import { HeaderActionBarComponent } from './header-action-bar/header-action-bar.component';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-header',
  imports: [GlobalSearchBarComponent, HeaderActionBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public layoutService: LayoutService) {}

  onMenuToggle() {
    console.log('Before toggle:');
    this.layoutService.logCurrentState();

    this.layoutService.onMenuToggle();

    console.log('After toggle:');
    setTimeout(() => {
      this.layoutService.logCurrentState();
    }, 10);
  }
}
