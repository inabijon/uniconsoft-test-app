import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { GlobalSearchBarComponent } from "./header/global-search-bar/global-search-bar.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-layout',
  imports: [AvatarModule, SidebarModule, RouterOutlet, GlobalSearchBarComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
 sidebarVisible = signal(false);

  toggleSidebar() {
    this.sidebarVisible.set(!this.sidebarVisible());
  }

}
