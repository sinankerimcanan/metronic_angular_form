import { NgModule } from '@angular/core';
import { EditComponent } from './edit.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  CardsModule,
  ModalsModule,
  WidgetsModule,
} from 'src/app/_metronic/partials';

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
  ],
})
export class EditModule {}
