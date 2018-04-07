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
	
	imgFolderServer = 'http://192.168.33.10/typeqast/img/';
	
	contacts: any;
	
	contactSub: any;
	//favoriteSub: any;
	
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
		modalRef.result.then(result=>{
			if(result == true){
				this.contactSub = this.contactService.getAllContacts().subscribe(data => {
					this.contacts = data;
				});
			}
		})
	}
	
	//change the user to favorite or not
	changeFavorite(user_id, favorite){
		//toggle favorite
		let favorite_change = (favorite == 1) ? 0 : 1;
		
		let updateFavoriteObj = { 'id': user_id, 'favorite': favorite_change };
		
		this.contactService.updateFavorite(user_id,updateFavoriteObj).subscribe(data => {
			//load the contacts again
			this.contactSub = this.contactService.getAllContacts().subscribe(data => {
					this.contacts = data;
			});
		});
	}
	
}