import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserProfile, SearchResult, Artist, Album, Track } from '../models/spotify-models';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private spotifyService: SpotifyService) { }

  headers: HttpHeaders;
  artist_search: Artist[] = [];
  album_search: Album[] = [];
  track_search: Track[] = [];
  typeSearch: string[] = [
    "artist",
    "album",
    "track"
  ];
  typeSelected: string;

  public getType(): string{
    return this.typeSelected;
  }
  
  ngOnInit(): void {

    if (this.authService.hasValidToken()) {
      this.authService.signIn();
      this.headers = this.authService.getHeaders();
      console.log(this.headers);
    }
  }

  public onSubmit(value: string, type: string): void{
    console.log('Start Search');
    if(type === "artist"){
      this.typeSelected = type;
      this.spotifyService.search(value, type).subscribe(
        res => {
          const searchResult: SearchResult = res;
          console.log('Search Artist');
          console.dir(searchResult.artists.items);
          this.artist_search = searchResult.artists.items;
        }
      )
    }else if(type === "album"){
      this.typeSelected = type;
      this.spotifyService.search(value, type).subscribe(
        res => {
          const searchResult: SearchResult = res;
          console.log('Search Album');
          console.dir(searchResult.albums.items);
          this.album_search = searchResult.albums.items;
        }
      )
    }else if(type === "track"){
      this.typeSelected = type;
      this.spotifyService.search(value, type).subscribe(
        res => {
          const searchResult: SearchResult = res;
          console.log('Search Track');
          console.dir(searchResult.tracks.items);
          this.track_search = searchResult.tracks.items;
        }
      )
    }    
  }

  // public onSubmit(value: string, type: string): void{
  //   console.log('Start Search');
  //   this.spotifyService.search(value, type).subscribe(
  //     res => {
  //       const searchResult: SearchResult = res;
  //       console.log('Search Result');
  //       console.dir(searchResult.artists.items);
  //       this.artist_seach = searchResult.artists.items;
  //     }
  //   )
  // }

  public getValue(): any{
    if(this.typeSelected === "artist"){
      return this.artist_search;
    }else if(this.typeSelected ==="track"){
      return this.track_search;
    }else if(this.typeSelected === "album"){
      return this.album_search;
    }
  }

  // public imageUrl(imagesUrl): string{
  //   let image: string;
  //   if(imagesUrl.length > 0 && imagesUrl.length == 3){
  //     image = imagesUrl[2].url;
  //   }else{
  //     image = "https://upload.wikimedia.org/wikipedia/en/e/ee/Unknown-person.gif";
  //   }
  //   return image;
  // }
}
