import { Component, inject } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { BirthdayWidgetComponent } from './birthday-widget/birthday-widget.component';
import { CalendarWidgetComponent } from './calendar-widget/calendar-widget.component';
import { MeetWidgetComponent } from './meet-widget/meet-widget.component';
import { NotesWidgetComponent } from './notes-widget/notes-widget.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';

@Component({
  selector: 'app-widgets',
  imports: [
    CalendarWidgetComponent,
    WeatherWidgetComponent,
    BirthdayWidgetComponent,
    MeetWidgetComponent,
    NotesWidgetComponent,
  ],
  templateUrl: './widgets.component.html',
  styleUrl: './widgets.component.css',
})
export class WidgetsComponent {
  public widgetService: WidgetService = inject(WidgetService);
}
