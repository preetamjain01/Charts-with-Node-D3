import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-chart',
  templateUrl: './create-chart.component.html',
  styleUrls: ['./create-chart.component.scss']
})
export class CreateChartComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate() {
    this.router.navigate(['createCharts', 'bar']);
  }

  line(){
    this.router.navigate(['createCharts', 'line']);
  }

  navigatePie() {
    this.router.navigate(['createCharts', 'pie']);

  }
}
