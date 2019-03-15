import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserProfile} from '../../models/spotify-models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  // TODO Use your spotify application ID
  public clientId = '2f4bad19d4c946dd933a2fcba48d254a&';
  public userProfile: UserProfile;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

    this.authService.connectionStatusChanged.subscribe(res => {
      this.userProfile = res;
    }, err => {
      this.userProfile = null;
    });
  }

  signOut(): void {

    this.authService.signOut();
  }
}
