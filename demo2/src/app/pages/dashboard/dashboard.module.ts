import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
import { CardsModule } from "../../_metronic/partials/content/cards/cards.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {
            path: '',
            component: DashboardComponent,
        },
    ]),
    WidgetsModule,
    ModalsModule,
    CardsModule
],
})
export class DashboardModule {}
