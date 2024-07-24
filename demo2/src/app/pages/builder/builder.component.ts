import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { LayoutService } from '../../_metronic/layout';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Product } from '../types/ProductModel';
import { UploadService } from 'src/app/service/upload.service';

type Tabs = 'Header' | 'Toolbar' | 'PageTitle' | 'Aside' | 'Content' | 'Footer';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
})
export class BuilderComponent implements OnInit {
  itemsForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private layout: LayoutService,
    private itemService: UploadService
  ) {
    this.itemsForm = this.fb.group({
      title: ['', Validators.required],
      imageurl: ['', Validators.required],
      stockstatus: ['true', Validators.required],
      description: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.itemsForm.valid) {
      const items: Product = this.itemsForm.value;

      this.itemService.addItem(items).subscribe(
        (response) => {
          console.log('Ürün Eklendi : ', response);
        },
        (error) => {
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
  activeTab: Tabs = 'Header';
  model: any;
  @ViewChild('form', { static: true }) form: NgForm;
  configLoading: boolean = false;
  resetLoading: boolean = false;

  ngOnInit(): void {
    this.model = this.layout.getConfig();
  }

  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
  }

  resetPreview(): void {
    this.resetLoading = true;
    this.layout.refreshConfigToDefault();
  }

  submitPreview(): void {
    this.configLoading = true;
    this.layout.setConfig(this.model);
    location.reload();
  }
}
