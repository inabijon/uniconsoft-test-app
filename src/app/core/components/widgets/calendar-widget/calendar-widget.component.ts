import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  fullDate: Date;
}

@Component({
  selector: 'app-calendar-widget',
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar-widget.component.html',
  styleUrl: './calendar-widget.component.css'
})
export class CalendarWidgetComponent implements OnInit, OnDestroy {
  selectedDate: Date = new Date();
  currentDate: Date = new Date();
  currentTime: string = '';
  currentMonthYear: string = '';

  daysOfWeek: string[] = ['DU', 'SE', 'CHO', 'PA', 'JU', 'SHA', 'YA'];
  calendarDays: CalendarDay[] = [];

  private timeInterval: any;

  constructor() {
    this.updateTime();
    this.generateCalendar();
  }

  ngOnInit() {
    this.timeInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    });
  }

  private generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Update month/year display
    this.currentMonthYear = this.currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    // Get first day of month and calculate starting point
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
    // Convert to Monday = 0, Sunday = 6
    let startDay = firstDay.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    this.calendarDays = [];

    // Previous month days
    for (let i = startDay - 1; i >= 0; i--) {
      const date = daysInPrevMonth - i;
      this.calendarDays.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        fullDate: new Date(year, month - 1, date)
      });
    }

    // Current month days
    const today = new Date();
    for (let date = 1; date <= daysInMonth; date++) {
      const fullDate = new Date(year, month, date);
      const isToday = this.isSameDay(fullDate, today);
      const isSelected = this.isSameDay(fullDate, this.selectedDate);

      this.calendarDays.push({
        date,
        isCurrentMonth: true,
        isToday,
        isSelected,
        fullDate
      });
    }

    // Next month days to fill the grid
    const remainingCells = 42 - this.calendarDays.length; // 6 rows × 7 days = 42
    for (let date = 1; date <= remainingCells; date++) {
      this.calendarDays.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        fullDate: new Date(year, month + 1, date)
      });
    }
  }

  previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }

  selectDate(day: CalendarDay) {
    if (!day.isCurrentMonth) return;

    this.selectedDate = new Date(day.fullDate);
    this.generateCalendar(); // Regenerate to update selected state
  }

  getDayClasses(day: CalendarDay): string {
    const baseClasses = 'w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200';

    if (!day.isCurrentMonth) {
      return `${baseClasses} text-white/30 cursor-not-allowed`;
    }

    if (day.isToday) {
      return `${baseClasses} bg-blue-400 text-white shadow-lg transform scale-110`;
    }

    if (day.isSelected) {
      return `${baseClasses} bg-white/30 text-white ring-2 ring-white/50`;
    }

    return `${baseClasses} text-white hover:bg-white/20 cursor-pointer`;
  }

  trackByDay(index: number, day: CalendarDay): string {
    return `${day.fullDate.getTime()}-${day.isCurrentMonth}`;
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }
}
