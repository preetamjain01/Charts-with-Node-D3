import { Component, OnInit, Input } from '@angular/core';
import {ChartService} from '../charts.service';
import {NotificationService} from '../../shared/notification.service';

@Component({
  selector: 'app-chart-result',
  templateUrl: './chart-result.component.html',
  styleUrls: ['./chart-result.component.scss']
})
export class ChartResultComponent implements OnInit {

  @Input() chartData: any;

  chartName = '';
  showChartNameError = false;

  constructor( private chartServices: ChartService, private notify: NotificationService) { }

  ngOnInit() {}

  saveChart() {
    if (this.chartName.length <= 0) {
     this.notify.notification.next('Enter chart name');
     return;
    } else {
      this.showChartNameError = false;
      this.chartData.chartName = this.chartName;
      console.log('ChartData', this.chartData);
      this.chartServices.saveGeneratedChart(this.chartData).subscribe((result: any) => {
        console.log(result);
        this.notify.notification.next(result.message);
      }, error => {
        this.notify.notification.next(error);
      });
    }
  }


}
