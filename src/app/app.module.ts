import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { CallbackComponent } from './components/callback/callback.component';
import { OAuthInterceptor } from './interceptors/oauth-interceptor';
import { AuthService } from './services/auth.service';
import { NavComponent } from './components/nav/nav.component';
import { SpotifyService } from './services/spotify.service';
import { TrackComponent } from './components/track/track.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';

const routes: Route[] = [
  { path: 'home', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'artist/', component: ArtistComponent },
  { path: 'track', component: TrackComponent },
  { path: 'album', component: AlbumComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    NavComponent,
    TrackComponent,
    ArtistComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: OAuthInterceptor,
    multi: true,
  },
    AuthService, 
    SpotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
