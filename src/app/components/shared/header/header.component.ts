import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { ButtonConfig } from '../../../models/employee.interface';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() buttonConfig: ButtonConfig = {
    classStyle: 'bg-red-600 hover:bg-red-700 text-white',
    label: ''
  };

  @Output() buttonClick = new EventEmitter<string>();

  onButtonClick() {
    this.buttonClick.emit('clicked');
  }
}
