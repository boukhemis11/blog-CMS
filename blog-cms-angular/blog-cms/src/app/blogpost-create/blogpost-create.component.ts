import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { BlogpostService } from '../blogpost.service';

@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrls: ['./blogpost-create.component.css']
})
export class BlogpostCreateComponent implements OnInit {

  creationForm: FormGroup;
  title: '';
  subTitle: '';
  content: '';


  constructor(private fb: FormBuilder, private blogpostService: BlogpostService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.creationForm = this.fb.group({
      title: [null, Validators.required],
      subTitle: [null, Validators.required],
      content: [null]
    });
  }

  createBlogpost(formDirective: FormGroupDirective) {
    if(this.creationForm.valid) {
      this.blogpostService
        .createBlogpost(this.creationForm.value)
        .subscribe(data => this.handleSuccess(data, formDirective), error => this.handleError(error));
    }
  }

  handleSuccess(data, formDirective) {
    console.log('OK handleSuccess - blog post created', data);
    this.creationForm.reset();
    formDirective.resetForm();
    this.blogpostService.dispatchBlogpostCreated(data._id);
  }

  handleError(error) {
    console.log('KO handleError - blog post NOT created', error);
  }


}
