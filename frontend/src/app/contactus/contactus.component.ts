import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-contactus',
  imports: [ReactiveFormsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss',
  standalone: true
})
export class ContactusComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern('^[0-9]{10}$')],
      subject: [''],
      source: [''],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
     console.log('Form value:', this.contactForm.value);
      this.http.post('http://localhost:5000/api/contactus',this.contactForm.value).subscribe((result)=>{
        console.log(result);
        this.contactForm.reset();
      })
      // Reset form after submit if needed
     
    } else {
      console.log('Form is not valid');
    }
  }
}
