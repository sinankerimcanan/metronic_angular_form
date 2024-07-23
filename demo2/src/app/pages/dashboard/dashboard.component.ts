import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../_metronic/partials';
import { HttpClient } from '@angular/common/http';
import { Product } from '../types/ProductModel';
import { ProductService } from 'src/app/service/product.service';
import { SepetService } from 'src/app/service/sepet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  @ViewChild('modal') private modalComponent: ModalComponent;
  constructor(private http : HttpClient,
    private productService : ProductService,
    private sepetService : SepetService,
    private cdr : ChangeDetectorRef) {}

  responseData : Product[] = []
  isLoggin = true

  async openModal() {
    return await this.modalComponent.open();
  }
  ngOnInit(): void {
    this.fetchDataFromBackend();
  }

  fetchDataFromBackend() {
    this.productService.getItems().subscribe(
      (response) => {
        this.responseData = response;
        console.log('Ürün Verileri Çekildi');
        console.log(response)
        // this.sepetService.setSepetData(this.responseData)
        this.isLoggin = false
        this.cdr.detectChanges()

      },
      (error) => {
        console.log('Ürün Verileri çekilmedi');
        this.isLoggin = false
        this.cdr.detectChanges()
      }
    );
  }
}
