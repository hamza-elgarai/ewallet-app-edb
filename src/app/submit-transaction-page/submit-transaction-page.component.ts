import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../_services/api-service.service';
// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-submit-transaction-page',
  templateUrl: './submit-transaction-page.component.html',
  styleUrls: ['./submit-transaction-page.component.css'],
})
export class SubmitTransactionPageComponent implements OnInit {
  benificiaryExists: string = 'yes';
  disableTextFields: boolean = true;
  disableDropDownChooseBenificiary: boolean = false;

  ClientData: any;
  Beneficiaries: any;

  clientId!: number;

  // * data for the transaction
  montant: number = 0;
  whoPayFees: string = '';
  benefId: number = 0;
  transactionType: string = 'GAB';

  generateOTP!: string;
  typedOTP: string = '';

  newBenificiary = {
    nom: '',
    prenom: '',
    phoneNumber: '',
  };

  constructor(
    private apiService: ApiServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.apiService.getClientInfo(1).subscribe(
      (response) => {
        this.ClientData = response;
        console.log(this.ClientData.solde);
        this.clientId = this.ClientData.id;

        console.log('im getting the client data', this.ClientData);
      },
      (error) => {
        console.log('error getting client data', error);
      }
    );

    this.apiService.getBeneficiaries(1).subscribe(
      (response) => {
        console.log('im getting the beneficiaries', response);
        this.Beneficiaries = response;
      },
      (error) => {
        console.log('error getting beneficiaries', error);
      }
    );
  }

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

  // * update benefId when the user selects a beneficiary from the dropdown
  selectBenificiary(benificiary: any) {
    console.log('selected benificiary', benificiary);
    this.benefId = benificiary.id;

    console.log('who ' + this.whoPayFees);
  }

  // * update whoPayFees when the user selects an option from the dropdown
  changeWhoPayFees(event: any) {
    this.whoPayFees = event.target.value;
    console.log('who ' + this.whoPayFees);
  }

  // * create a new benificiary
  addNewBenificiary() {
    console.log('new benificiary', this.newBenificiary);
    this.apiService.createBeneficiary(this.newBenificiary, 1).subscribe(
      (data) => {
        console.log('benficiary Created successfully', data);
        this.Beneficiaries.push(data);
        this.benefId = data.id;
        this.toast('benficiary Created successfully', 'success');
      },
      (error) => {
        console.log('error creating benficiary', error);
        this.toast('error creating benficiary', 'error');
      }
    );
  }

  // * generate a transaction
  sendOTPToClient() {
    this.apiService.sendOTP(this.ClientData.id).subscribe(
      (data) => {
        console.log('OTP sent successfully', data);
        this.generateOTP = data;
        this.toast('OTP sent successfully', 'success');
      },
      (error) => {
        console.log('error sending OTP', error);
        this.toast('error sending OTP', 'error');
      }
    );
  }

  //* submit the transaction
  confirmTransaction() {
    const data = {
      donorId: this.ClientData.id,
      beneficiaryId: this.benefId,
      amount: this.montant,
      whoPayFees: this.whoPayFees,
      paymentType: this.transactionType,
      otpValue: this.typedOTP,
      fraisTransfert: 2,
      notify: true,
      isNotificationFees: true,
    };
    console.log('transaction data', data);

    this.apiService.submitTransaction(data).subscribe(
      (response) => {
        console.log('transaction submitted successfully', response);
        this.toast('transaction submitted successfully', 'success');
      },
      (error) => {
        console.log('error submitting transaction', error);
        this.toast('error submitting transaction', 'error');
      }
    );
  }

  toast(message: string, state: string) {
    if (state === 'success') {
      this.toastr.success(message, 'Success', {
        timeOut: 2000,
        progressBar: true,
      });
    } else if (state === 'error') {
      this.toastr.error(message, 'Error', {
        timeOut: 2000,
        progressBar: true,
      });
    }
  }
}
