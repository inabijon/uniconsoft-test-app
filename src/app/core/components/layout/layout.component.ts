import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutService } from '../../services/layout.service';
import { WidgetService } from '../../services/widget.service';
import { WidgetsComponent } from "../widgets/widgets.component";
import { RightSidebarSettingsComponent } from "./right-sidebar-settings/right-sidebar-settings.component";

@Component({
  selector: 'app-layout',
  imports: [
    AvatarModule,
    SidebarModule,
    ButtonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    WidgetsComponent,
    RightSidebarSettingsComponent
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {

  constructor(public layoutService: LayoutService, public widgetService: WidgetService) {}
}
