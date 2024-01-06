import { Component } from '@angular/core';
import benefData from "../beneficiaires"

@Component({
  selector: 'app-clients-page',
  templateUrl: './benef-page.component.html',
  styleUrls: ['./benef-page.component.css']
})
export class BenefPageComponent {

  beneficiaires:any[] = benefData.map((b)=>{b.selected = false;return b})
  renderedBenefs = this.beneficiaires
  searchTerm=""
  
  selectedBenefs:any[] = []
  isSelectAllChecked = false;
  handleSearch(){
    this.beneficiaires = this.beneficiaires.map(c=>{c.selected=false;return c})
    this.renderedBenefs = this.beneficiaires.filter((c)=>{
      let valuesString = JSON.stringify(Object.values(c))
      return (valuesString.toLowerCase().includes(this.searchTerm.toLowerCase()))
    })
  }
  handleClickOnRadio(event:Event){
    event.stopPropagation()
  }
  selectAll(event:Event){
    if(this.isSelectAllChecked){
      this.beneficiaires = this.beneficiaires.map(c => {c.selected = false;return c})
    }
    else{
      this.beneficiaires = this.beneficiaires.map(c => {c.selected = true;return c})
    }
    this.isSelectAllChecked = !this.isSelectAllChecked

  }
  handleSelectRow(){
    console.log((this.beneficiaires.find(c=>!c.selected))?false:true)
    this.isSelectAllChecked= (this.beneficiaires.find(c=>!c.selected))?false:true
    
  }

  labels:any = {
      "nom": "Nom",
      "prenom": "Prénom",
      "email": "E-mail",
      "phone": "Télephone",
    }
  
  beneficiaire:any = {
    "id": 5,
    "nom": "Benzema",
    "prenom": "Karim",
    "email": "kbenz@yahoo.fr",
    "phone": "0615151515",
    "isBlockListed": false,
    "walletCode": "hxxx23",
    "walletClient": 2
  }
getObjectKeys(obj: any): string[] {
  return Object.keys(obj);
}
get isTableEmpty(){
  return !(this.renderedBenefs && this.renderedBenefs.length >0)
}

modalClass="modal-bg"
openModal(event:Event){
  this.modalClass = "modal-bg modal-opened"
}
closeModal(event:Event){
  this.modalClass = "modal-bg"
}
stopPropagation(event:Event){
  event.stopPropagation()
}

}
