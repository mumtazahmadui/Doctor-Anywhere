import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthData } from '../../models/auth-data';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html'
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {

    this.route.fragment.subscribe(fragment => {

      const fragments = fragment.split('&');

      let accessToken: string;
      let tokenType: string;
      let expiresIn: string;
      let state: string;

      for (const frag of fragments) {

        const parts = frag.split('=');

        switch (parts[0]) {
          case 'access_token':
            accessToken = parts[1];
            break;
          case 'token_type':
            tokenType = parts[1];
            break;
          case 'expires_in':
            expiresIn = parts[1];
            break;
          case 'state':
            state = parts[1];
            break;
        }
      }

      console.log(accessToken);
      console.log(tokenType);
      console.log(expiresIn);

      const authData = <AuthData>{
        accessToken: accessToken,
        tokenType: tokenType,
        expiresIn: parseInt(expiresIn, 10),
        creationDate: new Date().getTime()
      };

      this.authService.saveAuthData(authData);

      this.router.navigate(['']);
    });
  }
}
