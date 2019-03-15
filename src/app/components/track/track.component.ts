import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../../models/spotify-models';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['../app.component.css']
})
export class TrackComponent implements OnInit {

  constructor() { }

  @Input() tracks: Track;

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
