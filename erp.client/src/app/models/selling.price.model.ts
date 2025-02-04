export class SellingPrice  {
  sp_id: number;
  sp_prod_id :number;
  sp_prod_name :string;
  sp_country_id:number;
  sp_country_name: string;
  sp_price_type :number;
  sp_price_type_name :string;
  sp_price:number;
  sp_start_date :string;
  sp_end_date :string;
  sp_cre_by:number;
  sp_cre_by_name:string;
  sp_cre_date :string;
  constructor() {
    this.sp_id = 0;
    this.sp_prod_id=0;
    this.sp_prod_name='';
    this.sp_country_id=0,
    this.sp_country_name = '';
    this.sp_price_type=0;
    this.sp_price_type_name='';
    this.sp_price=0;
    this.sp_start_date='';
    this.sp_end_date='';
    this.sp_cre_by=0;
    this.sp_cre_by_name='';
    this.sp_cre_date='';

  }
}
