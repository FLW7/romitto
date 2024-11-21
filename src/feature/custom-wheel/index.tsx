import React, { Component } from 'react';

import styles from './styles.module.css';

import { cn } from '@/shared/lib/utils';
interface CustomWheelProps {
  data: string[] | number[];
  selected: number;
  type: string;
  onDateChange: (type: string, changedData: number) => void;
}

export class CustomWheel extends Component<CustomWheelProps> {
  state = { position: 0 };
  offset = 0;
  previousY = 0;
  dragging = false;

  constructor(props: CustomWheelProps) {
    super(props);
    this.state = { position: props.selected ? -(props.selected - 1) * 50 : 0 };
  }

  componentDidUpdate() {
    const selectedPosition = -(this.props.selected - 1) * 50;

    if (!this.dragging && this.state.position !== selectedPosition) {
      this.setState({ position: selectedPosition });
    }
  }

  onMouseDown = (event: any) => {
    this.previousY = event?.touches ? event?.touches?.[0]?.clientY : event?.clientY;
    this.dragging = true;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    document.addEventListener('touchmove', this.onMouseMove);
    document.addEventListener('touchend', this.onMouseUp);
  };

  onMouseMove = (event: any) => {
    const clientY = event?.touches ? event?.touches?.[0]?.clientY : event?.clientY;

    this.offset = clientY - this.previousY;

    const maxPosition = -this.props.data.length * 50;
    const position = this.state.position + this.offset;

    this.setState({ position: Math.max(maxPosition, Math.min(50, position)) });

    this.previousY = event.touches ? event.touches[0].clientY : event.clientY;
  };

  onMouseUp = () => {
    // calculate closeset snap
    const maxPosition = -(this.props.data.length - 1) * 50;
    const rounderPosition = Math.round((this.state.position + this.offset * 5) / 50) * 50;
    const finalPosition = Math.max(maxPosition, Math.min(0, rounderPosition));

    this.dragging = false;
    this.setState({ position: finalPosition });

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('touchmove', this.onMouseMove);
    document.removeEventListener('touchend', this.onMouseUp);

    this.props.onDateChange(this.props.type, -finalPosition / 50);
  };

  render() {
    const inlineStyle = {
      willChange: 'transform',
      transition: `transform ${Math.abs(this.offset) / 100 + 0.1}s`,
      transform: `translateY(${this.state.position}px)`,
    };

    return (
      <div
        className={styles.center}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onMouseDown}
      >
        <ul className='handle' style={inlineStyle}>
          {this.props.data.map((value, index) => (
            <li
              key={`${value}.${index}`}
              className={cn(styles.li, {
                [styles.selected]: this.props.selected === index + 1,
              })}
            >
              {value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
