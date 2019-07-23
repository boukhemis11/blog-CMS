import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from '../blogpost.service';
import { Observable } from 'rxjs';
import { Blogpost } from 'src/models/blogpost';
import { Location } from '@angular/common';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {

  blogPost$: Observable<Blogpost>;

  constructor(private route: ActivatedRoute, private location: Location, private blogpostService: BlogpostService) { }

  ngOnInit() {
    this.getblogpost();
  }

  getblogpost() {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogPost$ = this.blogpostService.blogPostById(id);
  }

  goBack(): void {
    this.location.back();
  }
}
