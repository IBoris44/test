import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let headers;
        let copiedReq;
        const token = localStorage.getItem('token');
        if (token) {
            headers = req.headers
                .append('Content-Type', 'application/json')
                .append('X-Token', token);

            copiedReq = req.clone({
                headers,
            });
            return next.handle(copiedReq);
        }

        headers = req.headers
            .append('Content-Type', 'application/json');
        copiedReq = req.clone({
            headers,
        });
        return next.handle(copiedReq)
            
    };
}
