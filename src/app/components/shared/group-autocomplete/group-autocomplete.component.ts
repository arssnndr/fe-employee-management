import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface AutocompleteItem {
  name: string;
}

@Component({
  selector: 'app-group-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './group-autocomplete.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GroupAutocompleteComponent),
      multi: true,
    },
  ],
})
export class GroupAutocompleteComponent implements ControlValueAccessor {
  @Input() items: AutocompleteItem[] = [];
  @Input() placeholder: string = 'Pilih atau ketik...';
  @Input() inputClass: string = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
  @Input() showClearWhenValue = true;

  @Output() selected = new EventEmitter<AutocompleteItem>();
  @Output() cleared = new EventEmitter<void>();

  searchTerm = '';
  filtered: AutocompleteItem[] = [];
  showDropdown = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.searchTerm = value || '';
    this.filter();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  onInput(value: string): void {
    this.searchTerm = value;
    this.onChange(this.searchTerm);
    this.filter();
    this.showDropdown = true;
  }

  onFocus(): void {
    this.showDropdown = true;
    this.filter();
  }

  onBlur(): void {
    setTimeout(() => {
      this.showDropdown = false;
      this.onTouched();
    }, 150);
  }

  filter(): void {
    const term = (this.searchTerm || '').toLowerCase();
    this.filtered = (this.items || []).filter((g) => g.name.toLowerCase().includes(term));
  }

  selectItem(item: AutocompleteItem): void {
    this.searchTerm = item.name;
    this.onChange(item.name);
    this.showDropdown = false;
    this.selected.emit(item);
  }

  clear(): void {
    this.searchTerm = '';
    this.onChange('');
    this.showDropdown = false;
    this.cleared.emit();
  }
}
