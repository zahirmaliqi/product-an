import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ProductService } from './services/product.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { CoreservicesService } from './core/coreservices.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'product';
  token = localStorage.getItem('token');

  displayedColumns: string[] = ['id', 'productName','productCategory','price','productDate','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _prodService: ProductService, private _coreService: CoreservicesService ){}

  ngOnInit(): void {
    this.getProductList();
    // console.log(this.token);
    
  }

  

  openAddEditProductForm(){
    const dialogRef = this._dialog.open(ProductAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      },
    });
  }

  getProductList(){
    this._prodService.getProductList().subscribe({
      next: (res) => {
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.sort=this.sort; 
        this.dataSource.paginator=this.paginator;

      },
      error: console.log,
    });

  }


  deleteProduct(id: number){
    this._prodService.deleteProduct(id).subscribe({
      next: (res) => {
       this._coreService.openSnackBar('Product deleted !', 'done');
       this.getProductList(); //refreshon menihere listen

      },
      error: console.log,

    });
  }

  open_editForm(data: any){
    const dialogRef=this._dialog.open(ProductAddEditComponent,{
      data: data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      },
    });
  
  }

}
