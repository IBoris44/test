import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { API_CONSTANTS } from '../constants/api-constants';
import { GraphData } from './../classes/graph-data';
import { ReportData } from './../classes/report-data';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAssesment(): Observable<ReportData[]> {
    return this.http
      .get(`${this.apiUrl}${API_CONSTANTS.dashboards.assessments}`)
      .pipe(map(data => (data as Array<any>).map(item => new ReportData(item))));
  }

  public getGraph(id: string): Observable<GraphData> {
    return this.http
      .get(`${this.apiUrl}${API_CONSTANTS.dashboards.graph}`,
      {params: new HttpParams().set('id', id)})
      .pipe(map(value => new GraphData(value)));
  }

}
