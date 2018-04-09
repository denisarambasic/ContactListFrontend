import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Phone } from '../phone';

@Component({
	selector: 'app-contact-create',
	templateUrl: 'contact-create.component.html',
	styleUrls: ['contact-create.component.css']
})
export class ContactCreateComponent {
	
	ImageFile: File;
	@ViewChild('fileInput') fileInput;
	form = new FormGroup({
		'first_name': new FormControl(),
		'last_name': new FormControl(),
		'image_name': new FormControl(),
		'email': new FormControl(),
		'favorite': new FormControl(),
		'phones' : new FormArray([])
	})
	
	constructor(public activeModal: NgbActiveModal, private contactService: ContactService) {}
	
	closeModal() {
		this.activeModal.close();
	}
	
	onSubmit(value){
		
		let formData = new FormData();
		formData.append('first_name', value.first_name);
		formData.append('last_name', value.last_name);
		if(this.ImageFile){
			formData.append('image_name', this.ImageFile, this.ImageFile.name);
		}else{			
			formData.append('image_name', 'false');
		}
		formData.append('email', value.email);
		formData.append('favorite', value.favorite);
		for (var i = 0; i < value.phones.length; i++) {

			let phone = JSON.stringify(new Phone(value.phones[i][0], value.phones[i][1]));
			formData.append('phones[]', phone);
		}
		
		this.contactService.submitData(formData).subscribe(resp => { 
			//console.log(resp);
			//Give the under component an response that the data have been changed to load it again
			this.activeModal.close(true);
		});
		
	}
	
	onFileChange(event) {
		if(event.target.files.length > 0) {
		  this.ImageFile = event.target.files[0];
		  
		}
	}
	
	
	//add phone to phones e.g. ['Home', '555-555']
	addPhone(name, phone) {
		(this.form.get('phones') as FormArray).push(new FormArray([new FormControl(name.value), new FormControl(phone.value)]));
		
		name.value = '';
		phone.value = '';
		
	}
	
	//remove phone from phones
	removePhone(index){
		(this.form.get('phones') as FormArray).removeAt(index);
	}
	
}