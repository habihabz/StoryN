export class Feedback {
  f_id: number;
  f_first_name:string;
  f_last_name: string;
  f_email: string;
  f_phone: string;
  f_message: string;
  f_cre_by:number;
  f_cre_by_name :string;
  f_created_on :string ;
  constructor() {
    this.f_id = 0;
    this.f_first_name='',
    this.f_last_name = '';
    this.f_email = '';
    this.f_phone = '';
    this.f_message = '';
    this.f_cre_by=0;
    this.f_cre_by_name='';
    this.f_created_on='';
  }

}
