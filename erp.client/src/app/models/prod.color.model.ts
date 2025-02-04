export class ProdColor {
  pc_id: number;
  pc_prod_id: number;
  pc_color: number;
  pc_color_name: string;
  pc_active_yn: string;
  pc_cre_by: number;
  pc_cre_by_name: string;
  pc_cre_date: string;
  
  constructor() {
    this.pc_id = 0;
    this.pc_prod_id=0;
    this.pc_color=0;
    this.pc_color_name='';
    this.pc_active_yn='';
    this.pc_cre_by = 0;
    this.pc_cre_by_name = '';
    this.pc_cre_date = '';
  }

}
