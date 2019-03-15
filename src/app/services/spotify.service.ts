import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
//import { Observable } from 'rxjs';
import { SearchResult } from "../models/spotify-models";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SpotifyService {
    private apiUrl = "https://api.spotify.com/v1/";
    private httpOptions = {
        headers: this.authService.getHeaders()
    };

    constructor(private httpClient: HttpClient, private authService: AuthService) {}

    public search(args: string, type: string): Observable<SearchResult> {
        const url: string = this.apiUrl + 'search?q=' + args + '&type=' + type;
        return this.httpClient.get<SearchResult>(url, this.httpOptions);
    }

    // public search(args: string, type: string): [Observable<SearchResult>, string] {
    //     const url: string = this.apiUrl + 'search?q=' + args + '&type=' + type;
    //     let res = this.httpClient.get<SearchResult>(url, this.httpOptions).subscribe(
    //         res => {
    //           const searchResult: SearchResult = res;
    //           console.log('Search Result');
    //           console.dir(searchResult.artists.items);
    //           this.artist_seach = searchResult.artists.items;
    //         };
    //     )
    //     let tuple: [Observable<SearchResult>, string];
    //     tuple[0] = res;
    //     tuple[1] = type;
    //     return tuple;
    // }

//     getArtist(id:string){

//         let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);
  
//         this.artistUrl = 'https://api.spotify.com/v1/artists/'+id;
//         return this._http.get(this.artistUrl, {headers: headers })
//         .map(res => res);
//     }
  
//     getAlbums(artistId:string){
  
//         let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);
//         this.albumsUrl = 'https://api.spotify.com/v1/artists/'+artistId+ '/albums';
//         return this._http.get(this.albumsUrl, {headers: headers })
//         .map(res => res);
//     }
  
//     getAlbum(id:string){
  
//         let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token);
//         this.albumUrl = 'https://api.spotify.com/v1/albums/'+id;
//         return this._http.get(this.albumUrl, {headers: headers })
//         .map(res => res);
//   }
}