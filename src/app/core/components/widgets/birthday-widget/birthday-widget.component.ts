import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-birthday-widget',
  imports: [],
  templateUrl: './birthday-widget.component.html',
  styleUrl: './birthday-widget.component.css'
})
export class BirthdayWidgetComponent implements OnInit {
  todaysBirthdays = [
    { name: 'Abbos Xazratov' },
    { name: 'Diyorbek Xolmirzayev' },
    { name: 'Jasur Xolmirzayev' },
    { name: 'Shokhrukh Xolmirzayev' },
    { name: 'Xolmirzayev Jasurbek' }
  ]

  birthDayText: string = '';

  ngOnInit(): void {
    this.updateBirthdayText();
  }

  private updateBirthdayText(): void {
    const count = this.todaysBirthdays.length;

    // Bugun Abbos Xazratov va yana 4 kishining tugʻilgan kuni
    if (count === 0) {
      this.birthDayText = 'Bugun hech kimning tugʻilgan kuni emas';
    } else if (count === 1) {
      this.birthDayText = `Bugun ${this.todaysBirthdays[0].name} ning tugʻilgan kuni`;
    } else {
      const firstPerson = this.todaysBirthdays[0].name;
      this.birthDayText = `Bugun ${firstPerson} va yana ${count - 1} kishining tugʻilgan kuni`;
    }
  }
}
