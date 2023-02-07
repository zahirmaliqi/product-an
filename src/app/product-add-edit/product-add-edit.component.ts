import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreservicesService } from '../core/coreservices.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit {
  productForm: FormGroup;
  category: string[] = ['Fruits','Electronics','Vegetables','Kitchens','Clothings',];

  constructor(
    private _fbv: FormBuilder, 
    private _prodService: ProductService, 
    private _dialogRef: MatDialogRef<ProductAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreservicesService,    
    ){

    this.productForm=this._fbv.group({
      productName:'',
      productCategory:'',
      price:'',
      productDate:'',
    });
  }

  ngOnInit(): void {
    this.productForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.productForm.valid){
      if(this.data){
        this._prodService.updateProduct(this.data.id,this.productForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Product detail updated!');
            this._dialogRef.close(true);
          },
          error: console.log,
        });

      }else{
        this._prodService.addProduct(this.productForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Product added into Table succesfully');
            this._dialogRef.close(true);
          },
          error: console.log,
        });

      }
    }
  }

}
