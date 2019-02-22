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

  productos: any[] = [
    // {
    //   nombre_comercial: 'Producto1',
    //   descripcion: 'producto1',
    //   categoria: 'torax'
    // },
    // {
    //   nombre_comercial: 'Producto1',
    //   descripcion: 'producto1',
    //   categoria: 'torax'
    // },
    // {
    //   nombre_comercial: 'Producto1',
    //   descripcion: 'producto1',
    //   categoria: 'torax'
    // },
    // {
    //   nombre_comercial: 'Producto1',
    //   descripcion: 'producto1',
    //   categoria: 'torax'
    // },
    // {
    //   nombre_comercial: 'Producto1',
    //   descripcion: 'producto1',
    //   categoria: 'torax'
    // },
    // {
    //   nombre_comercial: 'Producto1',
    //   descripcion: 'producto1',
    //   categoria: 'torax'
    // }
];

  desde: number = 0;
  totalProductos: number = 0;


  constructor(public productosS: ProductosService){
    this.cargarProductos();
    this.url_serv = URL_SERVICIOS;
  }

  cambiarDesde(valor: number){
    let desde = this.desde + valor;
    if(desde>= this.totalProductos){
      return;
    }

    if(desde < 0){
      return;
    }


    this.desde += valor;

    // console.log(this.desde);

    this.cargarProductos();

  }

  cargarProductos(){
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

    console.log("entro a la funcion buscar", termino);
    
    if(termino === 'Categoria'){
      this.desde = 0;
      this.cargarProductos();
      return;
    }else{
      this.productosS.buscarProducto(termino, this.desde).subscribe( (res: any)=>{
        console.log(res);
        
        if(res.error){
          console.log("Ocurrio un error");
        }else{
          this.productos = res.productos;
          this.totalProductos = res.total;
        }
      });
    }

    
    
  }
}
