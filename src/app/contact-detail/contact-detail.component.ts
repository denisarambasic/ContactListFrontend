import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Location } from '@angular/common';
@Component({
	selector: 'app-contact-detail',
	templateUrl: 'contact-detail.component.html',
	styleUrls: ['contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit, OnDestroy {
	
	imgFolderServer = 'http://192.168.33.10/typeqast/img/';
	id: number;
	routeSub: any;
	contactSub: any;
	contact: any;
	
	constructor(private activatedRoute: ActivatedRoute, private contactService: ContactService
				private location: Location){}
	
	ngOnInit() {
		this.routeSub = this.activatedRoute.params.subscribe(data => {
			this.id = data.id;
		});
		
		this.contactSub = this.contactService.getUserById(this.id).subscribe(data => {
			this.contact = data;
		});
	}
	
	ngOnDestroy() {
		this.routeSub.unsubscribe();
		this.contactSub.unsubscribe();
	}
	
	/*== Go the route back from where you came ==*/
	goBack() {
		this.location.back();
	}
	
	//change the user(contact) to favorite or not
	changeFavorite(user_id, favorite){

		//toggle favorite
		let favorite_change = (favorite == 1) ? 0 : 1;
		
		let updateFavoriteObj = { 'id': user_id, 'favorite': favorite_change };
		
		//update the favorite on this contact
		this.contact.favorite = favorite_change;
		
		this.contactService.updateFavorite(user_id,updateFavoriteObj).subscribe(data => {
			//update the favorite on server
		});
	}
	
}