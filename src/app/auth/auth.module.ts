import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthComponent } from './auth.component';

// Http requests are pre-configured here!
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({          // Generates configured AuthHttp service class.
    tokenName: 'token',
		tokenGetter: (() => localStorage.getItem('token')),
		globalHeaders: [{'Content-Type':'application/json'}],
	}), http, options);
}

@NgModule({
  declarations: [
    AuthComponent                           // Dutifully declared, but not used!
  ],
  providers: [
    {
      provide: AuthHttp,                    // Maps AuthHttp to the configured-on-the-fly service instance during injection.
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AuthModule {}