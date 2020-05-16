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
@NgModule({
  declarations: [
    RootComponent,
    LoginComponent,
    HomeComponent,
    ShowPostComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ROUTING,
    HttpClientModule,
  ],
  providers: [CommonService],
  bootstrap: [RootComponent]
})
export class AppModule { }
