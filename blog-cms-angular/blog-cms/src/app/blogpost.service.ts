import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blogpost } from 'src/models/blogpost';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  baseUrl = 'http://localhost:3000/api/v1/blog-posts';

  constructor(private htppClient: HttpClient) { }

  blogPostList(): Observable<Blogpost[]> {
    return this.htppClient.get<Blogpost[]>(`${this.baseUrl}/`);
  }

  blogPostById(id: string): Observable<Blogpost> {
    return this.htppClient.get<Blogpost>(`${this.baseUrl}/${id}`);
  }

  createBlogpost(blogpost: Blogpost): Observable<Blogpost> {
    return this.htppClient.post<Blogpost>(this.baseUrl, blogpost);
  }

  deleteSingleBlogpost(id: string): Observable<Blogpost> {
    return this.htppClient.delete<Blogpost>(`${this.baseUrl}/${id}`);
  }

  deleteBlogposts(ids: string[]): Observable<Blogpost> {
    const allids = ids.join(',');
    return this.htppClient.delete<Blogpost>(`${this.baseUrl}/?ids=${allids}`);
  }
}
