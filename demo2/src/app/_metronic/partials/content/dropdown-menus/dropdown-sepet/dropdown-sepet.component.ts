import { ChangeDetectorRef, Component, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { error } from 'console';
import { BehaviorSubject, Observable, Subject, Subscription, of } from 'rxjs';
import { SepetService } from 'src/app/service/sepet.service';
import { Product } from 'src/app/pages/types/ProductModel';

@Component({
  selector: 'app-dropdown-sepet',
  templateUrl: './dropdown-sepet.component.html',
})
export class DropdownSepetComponent {
  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  responseData: any[];
  // sepet: number[] = [];
  private sepetSubscription!: Subscription;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private sepetService: SepetService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.sepetSubscription = this.sepetService.getSepetData().subscribe(
      (data) => {
        this.responseData = data;
        console.log('Girdikkkkk', this.responseData);
        this.cdr.detectChanges(); // View'i manuel olarak günceller
      },
      (error) => {
        console.error('Sepet yüklenirken bir hata oluştu', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.sepetSubscription) {
      this.sepetSubscription.unsubscribe();
    }
  }

  clearSepet() {
    this.sepetService.clearSepet();
  }

  // veriCek() {
  //   this.fetchDataFromBackend();
  //   this.sepetService.getSepetData()
  // }
  // ngOnInit() {
  //   this.fetchDataFromBackend();
  // }
  // clearSepet() {
  //   localStorage.removeItem('sepet');
  //   this.responseData = [];
  // }
  // fetchDataFromBackend() {
  //   const array = localStorage.getItem('sepet');
  //   let sepet: number[] = array ? JSON.parse(array) : [];

  //   console.log('Array içi dolu');
  //   this.sepetService.getItems(sepet).subscribe(
  //     (response) => {
  //       this.responseData = response;
  //       console.log('Ürün Verileri Çekildi');
  //       console.log(this.responseData);
  //     },
  //     (error) => {
  //       console.log('Ürün Verileri çekilmedi');
  //     }
  //   );
  // }
}
