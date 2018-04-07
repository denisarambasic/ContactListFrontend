import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactService {
	
	url = 'http://192.168.33.10/typeqast/api/users/';
	
	constructor(private http: HttpClient) {}
	
	getAllContacts(){
		return this.http.get(this.url);
	}
	
	//create a new user(contact) on the backend
	submitData(formData) {
		return this.http.post(this.url + 'create', formData);
	}
	
	//Update the favorite status for a user
	updateFavorite(user_id, updateFavoriteObj){
		return this.http.patch(this.url + user_id, updateFavoriteObj);
	}
	
	//delete user(contact)
	deleteContact(user_id) {
		return this.http.delete(this.url + user_id);
	}
	
}