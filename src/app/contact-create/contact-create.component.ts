import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-contact-create',
	templateUrl: 'contact-create.component.html',
	styleUrls: ['contact-create.component.css']
})
export class ContactCreateComponent {
	
	constructor(public activeModal: NgbActiveModal) {}
	
	closeModal() {
		this.activeModal.close();
	}
	
}