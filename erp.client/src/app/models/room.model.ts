export class Room {
  rm_id: number;
  rm_name: string;
  rm_code: string;
  rm_client: number;
  rm_client_name: string;
  rm_expire_date: string;
  rm_cre_by: number;
  rm_cre_by_name: string;
  rm_cre_date: string;

  constructor() {
    this.rm_id = 0;
    this.rm_name='',
    this.rm_code='',
    this.rm_client=0,
    this.rm_client_name='',
    this.rm_expire_date=new Date().toISOString().split('T')[0];
    this.rm_cre_by = 0;
    this.rm_cre_by_name = '';
    this.rm_cre_date = '';
  }
}
