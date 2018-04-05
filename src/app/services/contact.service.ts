import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactService {
	
	url = 'http://192.168.33.10/typeqast/api/users/';
	
	constructor(private http: HttpClient) {}
	
	getAllContacts(){
		return this.http.get(this.url);
	}
	
}