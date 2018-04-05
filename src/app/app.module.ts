import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';

import { ContactService } from './services/contact.service';

@NgModule({
  declarations: [
    AppComponent,
	ContactListComponent,
	FavoriteListComponent,
	ContactCreateComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	AppRoutingModule,
	NgbModule.forRoot()
  ],
  entryComponents: [ContactCreateComponent],
  providers: [ ContactService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
