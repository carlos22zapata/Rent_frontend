import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { IJwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'https://localhost:7188'
  authSubject = new BehaviorSubject(false);
  private token: string;

  constructor(private httpClient: HttpClient) { }

  register(user:IUser):Observable<IJwtResponse>{
    return this.httpClient.post<IJwtResponse>('${this.AUTH_SERVER}/register',user) //Esta es la URL de la API, esta de register no la tengo
    .pipe(tap(
        (res: IJwtResponse) => {
          if(res){
            // guaradar token
            this.saveToken(res);
          }
        })
      );
  }

  login(user:IUser):Observable<IJwtResponse>{
    return this.httpClient.post<IJwtResponse>('${this.AUTH_SERVER}/api/Account/GetToken',user)
    .pipe(tap(
        (res: IJwtResponse) => {
          if(res){
            // guaradar token
          }
        })
      );
  }

  logout(): void{
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
  }

  private saveToken(token:string, expiresIn:string): void{
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }
}
