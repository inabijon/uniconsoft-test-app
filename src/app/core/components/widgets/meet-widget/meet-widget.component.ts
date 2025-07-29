import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-meet-widget',
  imports: [ButtonModule],
  templateUrl: './meet-widget.component.html',
  styleUrl: './meet-widget.component.css'
})
export class MeetWidgetComponent {
  createMeeting() {
    // Logic to create a new meeting
    console.log('Creating a new meeting...');
  }

  joinMeeting() {
    // Logic to join an existing meeting
    console.log('Joining an existing meeting...');
  }
}
