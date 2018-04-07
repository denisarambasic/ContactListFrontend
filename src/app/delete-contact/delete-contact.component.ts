import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../services/contact.service';

@Component({
	selector: 'app-delete-contact',
	templateUrl: 'delete-contact.component.html',
	styleUrls: ['delete-contact.component.css']
})
export class DeleteContactComponent {
	@Input() id;
	@Input() first_name;
	@Input() last_name;

	constructor(public activeModal: NgbActiveModal, private contactService: ContactService) {}
	
	deleteUser() {
		//delete user
		this.contactService.deleteContact(this.id).subscribe(data => {
			console.log(data);
			this.activeModal.close(true);
		})	
		
	}
	
	close() {
		this.activeModal.close();
	}
	
}