export class Barcode {
  b_id: number;
  b_prod_id:number;
  b_bar_code: string;
  b_cre_by: number;
  b_cre_by_name: string;
  b_cre_date: string;
  constructor() {
    this.b_id = 0;
    this.b_prod_id=0,
    this.b_bar_code = '';
    this.b_cre_by = 0;
    this.b_cre_by_name = '';
    this.b_cre_date = '';
  }

}
