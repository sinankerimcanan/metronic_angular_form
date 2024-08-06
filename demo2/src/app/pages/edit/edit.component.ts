import { ChangeDetectorRef, Component } from '@angular/core';
import { Product } from '../types/ProductModel';
import { EditService } from 'src/app/service/edit.service';
import { error } from 'console';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toJSON } from 'src/app/_metronic/kt/_utils';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  isAlert: boolean = false;
  items: Product[] = [];
  selectedId: number;
  itemsForm: FormGroup;
  responseData: Product = {
    id: 0,
    title: '123',
    imageurl: '123',
    stockstatus: false,
    description: '123',
  };
  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private editService: EditService
  ) {
    this.itemsForm = this.fb.group({
      title: ['', Validators.required],
      imageurl: ['', Validators.required],
      stockstatus: ['true', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.items = this.editService.getSepetFromLocalStorage();
  }
  save() {
    this.isAlert = true;
    setTimeout(() => {
      console.log('2 sn geçti');
      this.isAlert = false;
      this.cdr.detectChanges();
    }, 2000);
  }
  deleteItem(value: number) {
    console.log('componenet');

    this.editService.deleteItem(value).subscribe(
      (response) => {
        console.log('Item deleted successfully', response);
      },
      (error) => {
        console.error('Error deleting item', error);
      }
    );
  }

  onSelectedChange($event: Event) {
    this.selectedId = parseInt((event!.target as HTMLSelectElement).value);
    console.log('Seçilen değer:', this.selectedId);
    this.fetchDataFromBackend(this.selectedId);
  }
  fetchDataFromBackend(value: number) {
    this.editService.getItems(value).subscribe(
      (response) => {
        this.responseData = response;
        console.log('Ürün Verileri Çekildi');
        console.log('res:', response);
        this.cdr.detectChanges();
      },
      (error) => {
        console.log('Ürün Verileri çekilmedi');
        this.cdr.detectChanges();
      }
    );
  }

  onSubmit(value: number) {
    console.log('value :', value);
    if (this.itemsForm.valid) {
      const item: Product = this.itemsForm.value;
      console.log(item);

      this.editService.updateItem(value, item).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log('hatayı burdan aldık');
          console.log(error);
        }
      );
    }
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.itemsForm.patchValue({ imageurl: reader.result });
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };
  }
}
