import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { Artist } from '../../models/spotify-models';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['../app.component.css']
})
export class ArtistComponent implements OnInit {

  constructor() { }

  @Input() artists: Artist;

  ngOnInit() {
  }

  public imageUrl(imagesUrl): string{
    let image: string;
    if(imagesUrl.length > 0 && imagesUrl.length == 3){
      image = imagesUrl[2].url;
    }else{
      image = "https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif";
    }
    return image;
  }

}
