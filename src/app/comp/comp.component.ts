/*import { Component, Input } from '@angular/core';
import { driver } from '../driver';


@Component({
  selector: 'app-comp',
  imports: [],
  templateUrl: './comp.component.html',
  styleUrl: './comp.component.css'
})
export class CompComponent {
onDrvView() {
  console.log("KLIKNA ME");
}
 @Input()
 vozac:driver | undefined;
 @Input() 
 indeks:number|undefined;
}
*/
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { driver } from '../driver';

@Component({
  selector: 'app-comp',
  standalone: true, // Standalone komponenta
  imports: [CommonModule], // Dodavanje na CommonModule
  
  templateUrl: './comp.component.html',

  styleUrls: ['./comp.component.css']
})
export class CompComponent {

  
  @Input()
  vozac: driver | undefined;

  @Input()
  indeks: number | undefined;
  onDrvView(){
  
    let link: string |undefined; 
  
    if(this.vozac?.iconUrl)
    {link=this.vozac?.iconUrl}
    else{
      link="https://www.google.com/"
    };
    window.open(link,"_blank")
  }

 

  klasi() {
    return {
      'begin': this.vozac?.category == 'ASD',
      'adv': this.vozac?.category == 'EXPERT',
      'undr': true
    };
  }

  klasi2() {
    if (this.vozac?.category == 'ASD') {
      return 'begin';
    } else {
      return 'adv';
    }
  }

  stilovi() {
    if (this.vozac?.category == 'EXPERT') {
      return 'underline';
    } else {
      return 'none';
    }
  }
}
