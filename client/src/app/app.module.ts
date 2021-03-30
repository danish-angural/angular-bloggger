import { CommonService } from './service/common.service';
import { AddPostComponent } from './add-post/add-post.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RootComponent } from './root/root.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ROUTING } from './app.routing';
import { HomeComponent } from './home/home.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatCardModule } from '@angular/material/card';
import { OnepostComponent } from './show-post/onepost/onepost.component'
import { RouterModule } from '@angular/router'
@NgModule({
  declarations: [
    RootComponent,
    LoginComponent,
    HomeComponent,
    ShowPostComponent,
    AddPostComponent,
    OnepostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ROUTING,
    HttpClientModule,
    MatCardModule,
    RouterModule,
    RouterModule.forRoot([
      {path: 'blog/:_id', component: OnepostComponent}
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [CommonService],
  bootstrap: [RootComponent]
})
export class AppModule { }
