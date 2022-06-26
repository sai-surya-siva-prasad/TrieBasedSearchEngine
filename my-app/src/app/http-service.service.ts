import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  words: Array<String> = [];
  //private _wordString: string;

  //wordString: string;

  constructor(private http: HttpClient) {
    //this.wordString = 
  }

  getPosts() : string {

    return this.http.get('assets/words.txt').toString();
        //this.words.push(data));


    //return this.http.get(this.url);
  }

}
