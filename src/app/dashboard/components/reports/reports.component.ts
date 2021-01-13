import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { saveAs } from 'file-saver';

import { AssessmentService } from './../../../shared/services/assessment.service';
import { ReportData } from './../../../shared/classes/report-data';
import { User } from 'src/app/shared/classes/user';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject<void>();

  public reports: ReportData[];
  public columns: string[] = ['id', 'imageUrl', 'name', 'usersResolved', 'active'];
  public isAdmin:boolean;
  public user:User;

  constructor(private assessmentService: AssessmentService,
              private authService: AuthService,
              private router:Router
    ) { }

  ngOnInit(): void {
    this.initReports();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public onReportClick(report: ReportData): void {
    this.router.navigate(['dashboard/graph'],{
      queryParams:{
          'id': report.id, 
      }
  });
  }

  private initReports(): void {
    this.assessmentService.getAssesment()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.reports = res;
      });
    this.isAdmin = this.authService.isAdmin;
    this.user = this.authService.isUserLogged;
  }

  public downloadCSV(data: ReportData[]): void {
    const replacer = (key: string, value: any) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    const csv = data.map((row: any) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.map(item => item.toUpperCase()).join(','));
    const csvArray = csv.join('\r\n');

    const blob = new Blob([csvArray], {type: 'text/csv' });
    saveAs(blob, 'reports.csv');
  }

  public goToAdmin(): void {
    this.router.navigateByUrl('/dashboard/admin');
  }

  public logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
