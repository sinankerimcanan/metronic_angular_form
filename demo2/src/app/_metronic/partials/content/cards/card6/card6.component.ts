import { Component, HostBinding, Input } from '@angular/core';
import { Product } from 'src/app/pages/types/ProductModel';
import { SepetService } from 'src/app/service/sepet.service';

@Component({
  selector: 'app-card6',
  templateUrl: './card6.component.html',
  styleUrls: ['./card6.component.scss'],
})
export class Card6Component {
  constructor(private sepetService: SepetService) {}
  // addSepet(data : any){
  //   this.sepetService.sepeteEkle(data)
  // }
  addToSepet() {
    const currentSepet = this.sepetService.getSepetFromLocalStorage();
    this.sepetService.getItem(this.responseId).subscribe({
      next: (res) => {
        console.log('addToSepet', res);
        currentSepet.push(res);
        this.sepetService.setSepetData(currentSepet);
      },
    });
  }

  // sepeteEkle(urunId: number) {
  //   const sepetStr = localStorage.getItem('sepet');
  //   let sepet: number[] = sepetStr ? JSON.parse(sepetStr) : [];
  //   sepet.push(urunId);
  //   localStorage.setItem('sepet', JSON.stringify(sepet));
  //   console.log(`Ürün ID: ${urunId} sepete eklendi.`);

  // }

  @Input() responseId!: number;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @HostBinding('class') class = 'card h-100';
}
