import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactListComponent } from './contact-list/contact-list.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

const appRoutes: Routes = [
  { path: 'contacts', component: ContactListComponent },
  { path: 'contacts/favorites', component: FavoriteListComponent },
  { path: 'contacts/:id', component: ContactDetailComponent }
]

@NgModule({
	imports: [ RouterModule.forRoot(appRoutes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}