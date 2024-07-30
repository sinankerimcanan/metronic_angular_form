import { NgModule } from '@angular/core';
import { EditComponent } from './edit.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CardsModule,
  ModalsModule,
  WidgetsModule,
} from 'src/app/_metronic/partials';
import { DropdownMenusModule } from '../../_metronic/partials/content/dropdown-menus/dropdown-menus.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
    CardsModule,
    DropdownMenusModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EditModule {}
