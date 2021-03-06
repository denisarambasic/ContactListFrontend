import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactService {
	
	url = 'http://192.168.33.10/typeqast/api/users/';
	
	constructor(private http: HttpClient) {}
	
	//get all contacts(users)
	getAllContacts(){
		return this.http.get(this.url);
	}
	
	//get all favorite contacts(users)
	getAllFavoriteContacts(){
		return this.http.get(this.url + 'favorites');
	}
	
	//get all contacts by falue from the searchbox
	getAllContactsByValue(search_value){
		return this.http.get(this.url + 'search/' + search_value);
	}
	
	//get all favorite contacts by falue from thesearchbox
	getAllFavoriteContactsByValue(search_value){
		return this.http.get(this.url + 'favorites/search/' + search_value);
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
	
	//Get user by i
	getUserById(user_id) {
		return this.http.get(this.url + user_id);
	}
	
	//edit contact
	editData(user_id, formData){
		return this.http.post(this.url + user_id, formData);
	}
	
}