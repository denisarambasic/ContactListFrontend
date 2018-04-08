import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { DeleteContactComponent } from './delete-contact/delete-contact.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

import { ContactService } from './services/contact.service';

@NgModule({
  declarations: [
    AppComponent,
	ContactListComponent,
	FavoriteListComponent,
	ContactCreateComponent,
	DeleteContactComponent,
	ContactDetailComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	AppRoutingModule,
	NgbModule.forRoot(),
	FormsModule,
	ReactiveFormsModule
  ],
  entryComponents: [ContactCreateComponent, DeleteContactComponent],
  providers: [ ContactService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
