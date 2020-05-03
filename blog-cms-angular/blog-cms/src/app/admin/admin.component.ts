import { Component, OnInit } from '@angular/core';
import { Blogpost } from 'src/models/blogpost';
import { Observable } from 'rxjs';
import { BlogpostService } from '../blogpost.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  blogPostList$: Observable<Blogpost[]>;
  errorFromServer = '';
  durationInSeconds = 5;

  constructor(private blogPostService: BlogpostService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.blogPostList$ = this.blogPostService.blogPostList();
  }

  deleteBlogPosts(selecteOptions) {
    const ids = selecteOptions.map(so => so.value);
    this.openSnackBar();
    if (ids.length === 1) {
      return this.blogPostService
        .deleteSingleBlogpost(ids[0])
        .subscribe(data => this.refresh(data), err => this.handleError(err));
    } else {
      return this.blogPostService
        .deleteBlogposts(ids)
        .subscribe(data => this.refresh(data), err => this.handleError(err));
    }
  }

  refresh(data) {
    console.log('data', data);
    this.blogPostList$ = this.blogPostService.blogPostList();
  }

  handleError(error) {
    if(error.status === 401) {
      this.router.navigate(['/auth']);
    } else {
      this.errorFromServer = `Error ${error.status} - ${error.statusText}`;
    }
  }



  openSnackBar() {
    this.snackBar.openFromComponent(AlertComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
