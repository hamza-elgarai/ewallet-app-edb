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
    title:"Nom",
    prenom:"Prénom",
    typePieceIdentite:"Type de pièce d'identité",
    paysEmissionPieceIdentite:"Pays d'émission de pièce d'identité",
    numeroPieceIdentite:"Numéro de pièce d'identité",
    expirationPieceIdentite:"Date d'expiration de la pièce d'identité",
    dateNaissance:"Date de naissance",
    profession:"Profession",
    paysNationalite:"Pays de nationalité",
    paysAdresse:"Addresse Pays",
    adresseLegale:"Adresse legale",
    ville:"Ville",
    gsm:"Tél",
    email:"E-mail"
  }
  client:any = {
    id:null,
    title:"",
    prenom:"",
    typePieceIdentite:"",
    paysEmissionPieceIdentite:"",
    numeroPieceIdentite:"",
    expirationPieceIdentite: "",
    dateNaissance: "",
    profession:"",
    paysNationalite:"",
    paysAdresse:"",
    adresseLegale:"",
    ville:"",
    gsm:"",
    email:""
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
