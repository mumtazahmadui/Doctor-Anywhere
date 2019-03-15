import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserProfile} from '../models/spotify-models';
import {AuthData} from '../models/auth-data';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  public connectionStatusChanged: Subject<UserProfile>;

  constructor(private http: HttpClient) {
    this.connectionStatusChanged = new Subject<UserProfile>();
  }

  private loadAuthData(): AuthData {

    return <AuthData>{
      accessToken: localStorage.getItem('access_token'),
      tokenType: localStorage.getItem('token_type'),
      creationDate: parseInt(localStorage.getItem('creation_date')),
      expiresIn: parseInt(localStorage.getItem('expires_in'))
    };
  }

  public saveAuthData(authData: AuthData): void {
    localStorage.setItem('access_token', authData.accessToken);
    localStorage.setItem('token_type', authData.tokenType);
    localStorage.setItem('creation_date', authData.creationDate.toString());
    localStorage.setItem('expires_in', authData.expiresIn.toString());

    this.signIn();
  }

  public hasValidToken(): boolean {

    let result: boolean;
    let authData = this.loadAuthData();

    console.log('Has ValidToken with data : ');

    console.log(authData);

    if (authData.accessToken != null) {
      let expiresIn = localStorage.getItem('expires_in');
      result = new Date().getTime() < authData.creationDate + (parseInt(expiresIn) * 1000);
    } else {
      result = false;
    }

    console.log('valid ? ' + result);

    return result;
  }

  public signOut() {

    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('creation_date');
    localStorage.removeItem('expires_in');
    this.connectionStatusChanged.next(null);
  }

  public signIn(): void {

    console.log('Signing In with authData : ');

    let authData = this.loadAuthData();

    console.log(authData);
    //debugger;

    this.http.get<UserProfile>('https://api.spotify.com/v1/me', {
      headers: new HttpHeaders().set('Authorization', authData.tokenType + ' ' + authData.accessToken)
    }).subscribe(profile => this.connectionStatusChanged.next(profile), err => this.connectionStatusChanged.next(null));
  }

  public getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.loadAuthData().tokenType + ' ' + this.loadAuthData().accessToken);
    // console.log("TEST TEST TEST TEST TEST " + this.loadAuthData().accessToken);
    return headers;
  }
}

    // let authData = this.loadAuthData();
    // let accessToken = authData.accessToken;
    // let tokenType = authData.tokenType;
    // let creationDate = authData.creationDate;
    // let expiresIn = authData.expiresIn;
    // const headers: HttpHeaders = new HttpHeaders().append('Authorization', tokenType + ' ' + accessToken);
    // return headers;
