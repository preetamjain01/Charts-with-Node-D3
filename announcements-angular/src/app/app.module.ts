import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PapaParseModule } from 'ngx-papaparse';

import { AppComponent } from './app.component';
import { LoginComponent } from './userservices/login/login.component';
import { RoutingModule } from './shared/routing.module';
import { StylingModule } from './shared/style.module';
import { LandingPageComponent } from './welcome/landing-page/landing-page.component';
import { SignupComponent } from './userservices/signup/signup.component';
import { ForgotPasswordComponent } from './userservices/forgot-password/forgot-password.component';
import { CreateChartComponent } from './charts/create-chart/create-chart.component';

import {AppConstants} from './shared/appConstants';
import {UserServices} from './userservices/user.service';
import { FileSelectorComponent } from './shared/file-selector/file-selector.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import {LineChartComponent} from './charts/line-chart/line-chart.component';
import {ChartService} from './charts/charts.service';
import {NotificationService} from './shared/notification.service';
import {AuthGard} from './shared/auth-gaurd.service';
import {Ng2FileInputModule} from 'ng2-file-input';
import {PieChartComponent} from './charts/pie-chart/pie-chart.component';
import {SpinnerService} from './shared/spinner.service';
import { ChartResultComponent } from './charts/chart-result/chart-result.component';
import { CreateAnnouncementsComponent } from './announcements/create-announcements/create-announcements.component';
import { AnnouncementsSidebarComponent } from './announcements/announcements-sidebar/announcements-sidebar.component';
import {AnnouncementService} from './announcements/announcement.service';
import { DonutChartComponent } from './charts/donut-chart/donut-chart.component';
import { UpdateAccountComponent } from './userservices/update-account/update-account.component';
import { ResetPasswordComponent } from './userservices/reset-password/reset-password.component';
import { AddCreditsComponent } from './userservices/add-credits/add-credits.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { EditorAreaComponent } from './announcements/editor-area/editor-area.component';
import {ModelBoxComponent} from './shared/model-box/model-box.component';
import {CreditsService} from './shared/credits.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    SignupComponent,
    ForgotPasswordComponent,
    CreateChartComponent,
    FileSelectorComponent,
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,
    ChartResultComponent,
    CreateAnnouncementsComponent,
    AnnouncementsSidebarComponent,
    DonutChartComponent,
    UpdateAccountComponent,
    ResetPasswordComponent,
    EditorAreaComponent,
    ModelBoxComponent,
    AddCreditsComponent
  ],
  imports: [
    HttpClientModule,
    StylingModule,
    RoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PapaParseModule,
    Ng2FileInputModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [
    UserServices,
    AppConstants,
    ChartService,
    NotificationService,
    AuthGard,
    SpinnerService,
    AnnouncementService,
    CreditsService
  ],
  entryComponents: [
    ModelBoxComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
