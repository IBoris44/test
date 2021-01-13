import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar'
import { ChartsModule } from 'ng2-charts';
import { MatButtonModule } from '@angular/material/button';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReportsComponent } from './components/reports/reports.component';
import { GraphComponent } from './components/graph/graph.component';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ReportsComponent,
    GraphComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    ChartsModule,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class DashboardModule { }
