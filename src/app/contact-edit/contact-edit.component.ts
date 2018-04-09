import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Phone } from '../phone';

@Component({
	selector: 'app-contact-edit',
	templateUrl: 'contact-edit.component.html',
	styleUrls: ['contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
	@Input() contact;
	@ViewChild('fileInput') fileInput;
	image_name = '';
	form: any;
	user_id: number;
	ImageFile: File;
	
	constructor(public activeModal: NgbActiveModal, private contactService: ContactService) {}

	ngOnInit() {
		this.user_id = this.contact.id;
		this.form = new FormGroup({
			'first_name': new FormControl(this.contact.first_name),
			'last_name': new FormControl(this.contact.last_name),
			'image_name': new FormControl(),
			'email': new FormControl(this.contact.email),
			'favorite': new FormControl(this.contact.favorite),
			'phones' : new FormArray([])
		});
		
		/*== set the phones ==*/
		this.contact.phones.forEach(phone=>{
			(this.form.get('phones') as FormArray).push(new FormArray([new FormControl(phone.name), new FormControl(phone.number)]));
		})
	}
	
	removePhoto(image_name){
		//set the image name if someone click close ot put it again on place
		this.image_name = image_name;
		
		//Delete the image name that the choose file button is shown again
		this.contact.image_name = '';
	}
	
	onSubmit(value){
		/*console.log(value);*/
		
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
		
		
		this.contactService.editData(this.user_id, formData).subscribe(resp => {
			console.log(resp);
			//Give the under component an response that the data have been changed to load it again
			this.activeModal.close(true);
			
		});
		
		
		
	}
	
	onFileChange(event) {
		if(event.target.files.length > 0) {
		  this.ImageFile = event.target.files[0];
		  
		}
	}
	
	
	closeModal() {
		this.contact.image_name = this.image_name;
		
		this.activeModal.close();
		
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