import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})

export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];

  /*TODO: Consumo De la API*/
  private API_KEY_GIPHY: string = 'HTbnuxqaQB8Oye5V4iG1z7iJWuI24kC1';
  private servicesUrl: string = 'https://api.giphy.com/v1/gifs';

  /*Toca llamar esta libreria de Anglar Para recibir peticiones por Request*/
  constructor(private http: HttpClient){
    this.loadLocalStorage();
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  searchTag(tag: string):void {
    if(tag.length === 0)return;
    this.organizeHistory(tag);

    /*Asignación de Parametros por metodo GET*/
    const param = new HttpParams()
      .set('api_key',this.API_KEY_GIPHY)
      .set('limit', '40')
      .set('q',tag)

    /*Request a la API de GIPHY*/
    this.http.get<SearchResponse>(`${this.servicesUrl}/search`,{params: param})
      .subscribe(resp => {
        this.gifList = resp.data;
      })
  }

  private organizeHistory(tag: string){
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage():void{
    //Guardar item en Local Storage, y luego transformar un objeto en un string convertible
    localStorage.setItem('history',JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if(!localStorage.getItem('history'))return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    this.searchTag(this._tagsHistory[0]);
  }
}
