import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../services/contact.service';
import { ContactCreateComponent } from '../contact-create/contact-create.component';
import { DeleteContactComponent } from '../delete-contact/delete-contact.component';

@Component({
	selector: 'app-favorite-list',
	templateUrl: 'favorite-list.component.html',
	styleUrls: ['favorite-list.component.css']
})
export class FavoriteListComponent {
	
	imgFolderServer = 'http://192.168.33.10/typeqast/img/';
	
	contacts: any;
	
	contactSub: any;
	//favoriteSub: any;
	
	constructor(private contactService: ContactService, private modalService: NgbModal){}
	
	ngOnInit() {
		this.contactSub = this.contactService.getAllFavoriteContacts().subscribe(data => {
			this.contacts = data;
		});
	}
	
	//Handle Search field input:
	keyUp(search_value){
		if(search_value != ''){
			this.contactService.getAllFavoriteContactsByValue(search_value).subscribe(data => {
				this.contacts = data;
			});
		}else{
			this.contactService.getAllFavoriteContacts().subscribe(data => {
				this.contacts = data;
			});
		}
	}
	
	ngOnDestroy() {
		this.contactSub.unsubscribe();
	}
	
	openModalCreate() {
		const modalRef = this.modalService.open(ContactCreateComponent, { size: 'lg', backdrop: 'static', keyboard: false });
		modalRef.result.then(result=>{
			if(result == true){
				this.contactService.getAllFavoriteContacts().subscribe(data => {
					this.contacts = data;
				});
			}
		})
	}
	
	//change the user(contact) to favorite or not
	changeFavorite(event, user_id, favorite){
		event.stopPropagation();
		
		//find the position of the current unfavorite contact and remove it from the contacts array
		let position = this.contacts.findIndex(contact =>{
			return contact.id == user_id;
		});
		this.contacts.splice(position, 1);
		
		//toggle favorite
		let favorite_change = (favorite == 1) ? 0 : 1;
		
		let updateFavoriteObj = { 'id': user_id, 'favorite': favorite_change };
		
		//change the favorite for that user(contact) on the server
		this.contactService.updateFavorite(user_id,updateFavoriteObj).subscribe(data => {

		});
	}
	
	//Delete user(contact)
	openModalDelete(event, contact_id, first_name, last_name){
		event.stopPropagation();
		const modalDelRef = this.modalService.open(DeleteContactComponent, { size: 'sm' });
		modalDelRef.componentInstance.id = contact_id;
		modalDelRef.componentInstance.first_name = first_name;
		modalDelRef.componentInstance.last_name = last_name;
		
		modalDelRef.result.then((result) => {
			  if(result == true){
					this.contactService.getAllContacts().subscribe(data => {
						this.contacts = data;
					});
				}
			}, (reason) => {
			  //
			}
		);
		
	}
	
}