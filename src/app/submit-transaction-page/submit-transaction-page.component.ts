import { Component } from '@angular/core';

@Component({
  selector: 'app-submit-transaction-page',
  templateUrl: './submit-transaction-page.component.html',
  styleUrls: ['./submit-transaction-page.component.css'],
})
export class SubmitTransactionPageComponent {
  benificiaryExists: string = 'yes';
  disableTextFields: boolean = true;
  disableDropDownChooseBenificiary: boolean = false;

  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleVisibilityOfTextFields() {
    if (this.benificiaryExists === 'yes') {
      this.disableTextFields = true; // Disable the text field if "Yes" is selected
      this.disableDropDownChooseBenificiary = false;
    } else if (this.benificiaryExists === 'no') {
      this.disableTextFields = false; // Enable the text field if "No" is selected
      this.disableDropDownChooseBenificiary = true;
    }
  }
}
