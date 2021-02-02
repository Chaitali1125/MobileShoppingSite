import {Product} from '../model/product.model';
export class Cart {
    id: number=0;
    amount:number=0;
    art_name:string="";
    artist_name:string="";
    image:any;
    user_id:number=0;
    product_id: number=0;  
  
    // id          | bigint(20)    | NO   | PRI | NULL    | auto_increment |
    // | amount      | decimal(10,2) | YES  |     | NULL    |                |
    // | art_name    | varchar(75)   | YES  |     | NULL    |                |
    // | artist_name | varchar(75)   | YES  |     | NULL    |                |
    // | image       | longblob      | YES  |     | NULL    |                |
    // | user_id     | bigint(20)    | YES  | MUL | NULL    |                |
    // | product_id
    // constructor(id: number, product:Product,qty=1)
    // {
    //   this.id =id;
    //   this.productId = product.id;
    //   this.productName = product.name;
    //   this.price = product.price;
    //   this.qty =qty;
    // }
}
