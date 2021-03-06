import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  constructor(public http: HttpClient) {
    
   }

  obtenerProductos(desde: number = 0){

    let url = URL_SERVICIOS + '/obtenerproductos/ortopedia y artículos médicos/8?desde=' + desde;
    return this.http.get(url);

  }

  buscarProducto(termino: string, desde: number = 0){
    let url = URL_SERVICIOS + '/buscar/ortopedia y artículos médicos/productos/8/' + termino +'?desde=' + desde;
    return this.http.get(url).pipe(  retry(5) );
  }
  
  
}
