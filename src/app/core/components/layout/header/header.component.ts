import { Component } from '@angular/core';
import { GlobalSearchBarComponent } from './global-search-bar/global-search-bar.component';
import { HeaderActionBarComponent } from './header-action-bar/header-action-bar.component';

@Component({
  selector: 'app-header',
  imports: [GlobalSearchBarComponent, HeaderActionBarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
