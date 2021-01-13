import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

import { GraphData } from 'src/app/shared/classes/graph-data';
import { AssessmentService } from './../../../shared/services/assessment.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  private unsubscribe: Subject<void> = new Subject<void>();
  
  private id: string;
  public graph: GraphData;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          stepSize: 5
        }}]
      }   
  };
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0, 181, 204, 1)'
    }]
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Quality' }
  ];
 
  constructor(private assessmentService:AssessmentService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params:Params) => this.id = params.id) 
  }

  ngOnInit(): void {
    this.initGraph();
  }

  private initGraph(): void {
    this.assessmentService.getGraph(this.id)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => {
        this.barChartLabels = Object.keys(res.data);
        Object.values(res.data).forEach((v:any) => this.barChartData[0].data?.push(v))
      });
  }
}
