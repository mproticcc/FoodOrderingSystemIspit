import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  @Output() dateRangeSelected = new EventEmitter<{
    start: Date | null;
    end: Date | null;
  }>();

  constructor() {}

  ngOnInit(): void {
    this.range.valueChanges.subscribe(() => {
      this.emitDateRange();
    });
  }

  emitDateRange() {
    const start = this.range.get('start')!.value;
    const end = this.range.get('end')!.value;
    this.dateRangeSelected.emit({ start, end });
  }
}
