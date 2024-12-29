import { Component, Input } from '@angular/core';
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