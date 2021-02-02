export class Address {
//     +-----------+-------------+------+-----+---------+----------------+
// | Field     | Type        | Null | Key | Default | Extra          |
// +-----------+-------------+------+-----+---------+----------------+
// | id        | bigint(20)  | NO   | PRI | NULL    | auto_increment |
// | apartment | varchar(75) | NO   |     | NULL    |                |
// | city      | varchar(75) | NO   |     | NULL    |                |
// | country   | varchar(75) | NO   |     | NULL    |                |
// | pin       | varchar(6)  | NO   |     | NULL    |                |
// | state     | varchar(75) | NO   |     | NULL    |                |
// | street    | varchar(75) | NO   |     | NULL    |                |
// | user_id   | bigint(20)  | YES  | MUL | NULL    |                |
// +-----------+-------------+------+-----+---------+----------------+
    id:number=0;    
    apartment:string="";
    city:string="";
    country:string="";
    pin:number=0;
    state:string="";
	street:string="";
    user_id:number=0;
	Address(){}
}
