import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../services/contact.service';
import { ContactCreateComponent } from '../contact-create/contact-create.component';
@Component({
	selector: 'app-contact-list',
	templateUrl: 'contact-list.component.html',
	styleUrls: ['contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
	
	contacts: any;
	
	contactSub: any;
	
	constructor(private contactService: ContactService, private modalService: NgbModal){}
	
	ngOnInit() {
		this.contactSub = this.contactService.getAllContacts().subscribe(data => {
			this.contacts = data;
		});
	}
	
	ngOnDestroy() {
		this.contactSub.unsubscribe();
	}
	
	openModalCreate() {
		const modalRef = this.modalService.open(ContactCreateComponent, { size: 'lg', backdrop: 'static', keyboard: false });
		
	}
	
}