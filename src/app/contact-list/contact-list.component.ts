import { Component, OnInit, OnDestroy } from '@angular/core';

import { ContactService } from '../services/contact.service';

@Component({
	selector: 'app-contact-list',
	templateUrl: 'contact-list.component.html',
	styleUrls: ['contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
	
	contacts: any;
	
	contactSub: any;
	
	constructor(private contactService: ContactService){}
	
	ngOnInit() {
		this.contactSub = this.contactService.getAllContacts().subscribe(data => {
			this.contacts = data;
		});
	}
	
	ngOnDestroy() {
		this.contactSub.unsubscribe();
	}
	
}