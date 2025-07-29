import { Component } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  imports: [],
  templateUrl: './weather-widget.component.html',
  styleUrl: './weather-widget.component.css'
})
export class WeatherWidgetComponent {
  weatherData = {
    location: 'Tashkent',
    condition: 'Cloudy',
    temperature: 32,
    icon: '/images/weather/cloudy-day-1.svg'
  };
}
