import React, { Component } from 'react';

import { CustomWheel } from '@/feature/custom-wheel';
import { MONTHS, YEARS } from '@/feature/custom-wheel/const';

interface DatePickerProps {
  date: Date;
  onDateChange: (newDate: Date) => void;
}

export class DataPicker extends Component<DatePickerProps> {
  dateChanged = (type: string, changedData: number) => {
    let newDate;

    switch (type) {
      case 'day': {
        newDate = new Date(
          this.props.date.getFullYear(),
          this.props.date.getMonth(),
          changedData + 1,
        );

        break;
      }
      case 'month': {
        const maxDayInSelectedMonth = new Date(
          this.props.date.getFullYear(),
          changedData + 1,
          0,
        ).getDate();

        const day = Math.min(this.props.date.getDate(), maxDayInSelectedMonth);

        newDate = new Date(this.props.date.getFullYear(), changedData, day);

        break;
      }
      case 'year': {
        const newYear = YEARS[changedData];

        const maxDayInSelectedMonth = new Date(
          newYear,
          this.props.date.getMonth() + 1,
          0,
        ).getDate();
        const day = Math.min(this.props.date.getDate(), maxDayInSelectedMonth);

        newDate = new Date(newYear, this.props.date.getMonth(), day);

        break;
      }
    }

    newDate && this.props.onDateChange(newDate);
  };

  render() {
    const days = Array.from({
      length: new Date(
        this.props.date.getFullYear(),
        this.props.date.getMonth() + 1,
        0,
      ).getDate(),
    })
      .fill(1)
      .map((value, index) => (value as string) + index);

    return (
      <div className='m-6 flex justify-center overflow-hidden py-8'>
        <CustomWheel
          type='day'
          data={days}
          selected={this.props.date.getDate()}
          onDateChange={this.dateChanged}
        />
        <CustomWheel
          type='month'
          data={MONTHS}
          selected={this.props.date.getMonth() + 1}
          onDateChange={this.dateChanged}
        />
        <CustomWheel
          type='year'
          data={YEARS}
          selected={YEARS.indexOf(this.props.date.getFullYear()) + 1}
          onDateChange={this.dateChanged}
        />
      </div>
    );
  }
}
