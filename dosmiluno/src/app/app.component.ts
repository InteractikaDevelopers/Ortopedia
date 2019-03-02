import { Component } from '@angular/core';
import { ProductosService } from './services/productos.service';
import { URL_SERVICIOS } from './config/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  url_serv: string;
  desde: number = 0;
  totalProductos: number = 0;
  busqueda: boolean = false;
  terminoActual:string = '';
  productos: any[] = [];
  categoria = 'Categoria';



  constructor(public productosS: ProductosService){
    this.cargarProductos();
    this.url_serv = URL_SERVICIOS;
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;
    if(desde >= this.totalProductos){
      return;
    }

    if(desde < 0){
      return;
    }
    

    // console.log(this.desde);
    if(this.busqueda){
      if(this.productos.length >= 6 || valor < 0){
        this.desde += valor;
        this.buscarProducto(this.terminoActual);
      }else{
        return;
      }
      
    }else{
      this.desde += valor;
      this.cargarProductos();
    }

  }

  cargarProductos(){
    this.busqueda = false;
    this.productosS.obtenerProductos(this.desde).subscribe( (res: any)=>{

      console.log(res);

      if(res.error){
        console.log("Ocurrio un error");
      }else{
        this.productos = res.productos;
        this.totalProductos = res.total;
      }
      
    });

  }

  buscarProducto(termino: string){
    console.log("entro a la funcion");
    
    console.log(termino);
    
    this.busqueda = true;
    this.terminoActual = termino;

    if(this.terminoActual === 'Categoria'){
      this.busqueda = false;
      this.desde = 0;
      this.cargarProductos();
      document.getElementById('productos').scrollIntoView();
      return;
    }else{
      this.productosS.buscarProducto(this.terminoActual, this.desde).subscribe( (res: any)=>{
        console.log(res);
        
        if(res.error){
          console.log("Ocurrio un error");
        }else{
          document.getElementById('productos').scrollIntoView();
          this.productos = res.productos;
          this.totalProductos = res.total;
        }
      });
    }
    
  }
}
