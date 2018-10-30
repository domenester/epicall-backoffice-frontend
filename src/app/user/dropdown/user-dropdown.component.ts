import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services';
import { ControlValueAccessor } from '@angular/forms';
import { ReportComponent } from '../../report/report.component';

@Component({
    selector: 'app-user-dropdown',
    templateUrl: './user-dorpdown.component.html',
    styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent implements OnInit, ControlValueAccessor {
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    @Output() userSelected = new EventEmitter();

    constructor(
      private userService: UserService,
    ) {
      this.fetchDropdown();
    }

    writeValue(value: any): void { }
    registerOnChange(fn: (_: any) => void): void { }
    registerOnTouched(fn: any): void { }
    fetchDropdown() {
      this.userService.list().subscribe(
        users => {
          this.dropdownList = users.map( user => ({ id: user.id, text: user.fullName }));
        }
      );
    }

    ngOnInit() {
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'text',
        allowSearchFilter: true,
        searchPlaceholderText: 'Pesquisar...',
        enableCheckAll: false
      };
    }

    onItemHandle(item: any) { this.userSelected.emit(this.selectedItems as any); }

    public getSelectedItems () { return this.selectedItems; }
}
