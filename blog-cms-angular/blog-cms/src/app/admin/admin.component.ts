import { Component, OnInit } from '@angular/core';
import { Blogpost } from 'src/models/blogpost';
import { Observable } from 'rxjs';
import { BlogpostService } from '../blogpost.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  blogPostList$: Observable<Blogpost[]>;

  constructor(private blogPostService: BlogpostService) { }

  ngOnInit() {
    this.blogPostList$ = this.blogPostService.blogPostList();
  }

}
