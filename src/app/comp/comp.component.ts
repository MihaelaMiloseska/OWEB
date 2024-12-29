import { Component, Input } from '@angular/core';
import { driver } from '../driver';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { style } from '@angular/animations';
@Component({
  selector: 'app-comp',
  imports:[CommonModule],
  templateUrl: './comp.component.html',
  styleUrl: './comp.component.css'
})
export class CompComponent {
  @Input()
  vozac:driver| undefined;
  @Input()
  indeks:number| undefined;

  onDrvView(){
    //console.log("Klikna me!")
    let link: string |undefined; 
    //var link=''
    if(this.vozac?.iconUrl)
    {link=this.vozac?.iconUrl}
    else{
      link="https://www.google.com/"
    };
    window.open(link,"_blank")
  }
  klasi()//ova e isto so klasi2 samo sto e vo jquery
  
  {
    return {'begin':this.vozac?.category=='ASD',
      'adv':this.vozac?.category=='EXPERT',
      'undr':true}
    }

  klasi2(){ 
    if(this.vozac?.category=='ASD'){return 'begin'}
    else{return 'adv'}
  }
  //angular znae da gi razviva dvete 
  stilovi(){
    if(this.vozac?.category=='EXPERT'){return 'underline'}
    else{return 'none'}
  }
}

