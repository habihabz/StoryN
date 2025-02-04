export class ProdSize {
  ps_id: number;
  ps_prod_id: number;
  ps_size: number;
  ps_size_name: string;
  ps_active_yn: string;
  ps_cre_by: number;
  ps_cre_by_name: string;
  ps_cre_date: string;

  constructor() {

    this.ps_id = 0;
    this.ps_prod_id=0;
    this.ps_size=0;
    this.ps_size_name='';
    this.ps_active_yn='';
    this.ps_cre_by = 0;
    this.ps_cre_by_name = '';
    this.ps_cre_date = '';

  }

}
