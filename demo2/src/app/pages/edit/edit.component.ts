import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  isAlert: boolean = false;
  constructor(private cdr: ChangeDetectorRef) {}

  save() {
    this.isAlert = true;
    setTimeout(() => {
      console.log('2 sn geçti');
      this.isAlert = false;
      this.cdr.detectChanges();
    }, 2000);
  }
}
