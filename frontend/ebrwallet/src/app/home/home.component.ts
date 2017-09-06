import { DataService } from '../services/data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var toastr: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subscription  : FormGroup;
  contact       : FormGroup;
  shownPopup    = false;
  shownModal    = false;
  shownContact  = false;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private dataService: DataService) {
    this.subscription = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });

    this.contact = fb.group({
      firstName : ['', Validators.required],
      lastName  : ['', Validators.required],
      email     : ['', Validators.compose([Validators.required, Validators.email])],
      message   : ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  /**
   * Subscribe to newsletter
   */
  subscribe() {
    if(this.subscription.valid){
      this.dataService.subscribeNews(this.subscription.value.email)
        .then(res => toastr.success('Success!', 'Subscribed successfully.'))
        .catch(err => toastr.error('Couldn\'t subscribe at the moment.'));
    }
  }

  /**
   * Scrolling to the top of the screen at decremental steps
   */
  scrollTop() {
    let x = window.innerHeight;
    // Set a interval id
    const clId = setInterval(() => {
      window.scrollTo(0, x);
      x -= 50;
      if (x <= 0) {
        window.scrollTo(0, 0);
        clearInterval(clId);    // Clear interval once it reaches the top
      }
    }, 15);
  }

  showContact() {
    this.shownContact = !this.shownContact;
  }


  showPopup() {
    this.shownPopup = !this.shownPopup;
  }

  showModal() {
    this.shownModal = !this.shownModal;
  }

  submitContact() {
    if(this.contact.valid) {
      this.dataService.submitContact(this.contact.value)
       .then(res => {
            toastr.success('Success!', 'Contacted successfully.');
            this.contact.reset();
            this.showContact();
        })
        .catch(err => toastr.error('Couldn\'t contact at the moment.'));
    }
  }

}
