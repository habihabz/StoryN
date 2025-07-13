export class ErrorLog {
  el_id: number;
  el_controller: string;
  el_page: string;
  el_action: string;
  el_error:string;
  el_cre_by:number;
  el_cre_by_name:string;
  el_cre_date: string;
  constructor() {
    this.el_id = 0;
    this.el_controller='',
    this.el_page = '';
    this.el_action='';
    this.el_error = '';
    this.el_cre_by=0;
    this.el_cre_by_name='';
    this.el_cre_date = '';
  }
}
