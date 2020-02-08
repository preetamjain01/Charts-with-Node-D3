import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PapaParseService} from 'ngx-papaparse';
import { ChartService } from '../charts.service';
import {SpinnerService} from '../../shared/spinner.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BarChartComponent implements OnInit {

  barChartForm: FormGroup;
  fileData: any;
  file: File;
  showDataFields = false;
  chart: any;
  chartData: any;

  constructor(private papa: PapaParseService,
              private chartService: ChartService) { }

  ngOnInit() {
    this.barChartForm = new FormGroup({
      xaxis: new FormControl('', [<any>Validators.required]),
      yaxis: new FormControl('', [<any>Validators.required]),
    });
  }

  onSubmit(selectedValues , isValid: boolean) {
    if (isValid && selectedValues.xaxis !== selectedValues.yaxis) {
      console.log(selectedValues);
      this.chartService.createBarChart(selectedValues, this.file).subscribe((data: any) => {
        //console.log(data);
        this.chartData = data;
        this.chartData.chart = `data:image/png;base64,${data.chart}`;
      });
    }
  }

  getData (file) {
    return new Promise((resolve, reject) => {
      this.papa.parse(file, {
        header: true,
        error: (error) => reject(error),
        complete: (data) => resolve(data)
      });
    });
  }

  onFileSelected(file) {
    this.file = file;
    this.getData(file).then(data => {
      this.fileData = data;
      console.log('File Data', this.fileData);
      this.showDataFields = true;
    });
  }
}
