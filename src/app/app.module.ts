import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';

@NgModule({
  declarations: [
    AppComponent,
	ContactListComponent,
	FavoriteListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
