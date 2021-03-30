import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowPostService } from '../show-post.service';
import { MatCardModule } from '@angular/material/card'
@Component({
  selector: 'app-onepost',
  templateUrl: './onepost.component.html',
  styleUrls: ['./onepost.component.css'],
  providers: [ShowPostService]
})
export class OnepostComponent implements OnInit {
  id;
  post;
  lines;
  img='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.UQGFB4sNZ-ouIPL71C-auAHaEK%26pid%3DApi&f=1'
  constructor(private activatedRoute: ActivatedRoute, public showPostService: ShowPostService) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      this.id=String(params.get('_id'));
      console.log(this.id);
    });
    this.showPostService.getOnePost(this.id).subscribe(post=>{
      this.post=post;
      this.lines=this.post.description.split("\n");
      console.log(post);
    })
  }

}
