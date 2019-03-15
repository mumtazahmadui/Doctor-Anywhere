import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/**
 * Intercepteur HTTP:
 * Intercepte toutes les requêtes sortantes et y ajoute un header Authorization
 * avec le token stocké dans le localstorage
 */
@Injectable()
export class OAuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = localStorage.getItem('access_token');
    let tokenType = localStorage.getItem('token_type');
    const authReq = req.clone({headers: req.headers.set('Authorization', tokenType + ' ' + accessToken)});
    return next.handle(authReq);
  }
}
