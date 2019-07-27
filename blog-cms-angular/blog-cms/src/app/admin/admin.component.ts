import { Component, OnInit } from '@angular/core';
import { Blogpost } from 'src/models/blogpost';
import { Observable } from 'rxjs';
import { BlogpostService } from '../blogpost.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  blogPostList$: Observable<Blogpost[]>;
  errorFromServer = '';

  constructor(private blogPostService: BlogpostService, private router: Router) { }

  ngOnInit() {
    this.blogPostList$ = this.blogPostService.blogPostList();
  }

  deleteBlogPosts(selecteOptions) {
    const ids = selecteOptions.map(so => so.value)
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

}
