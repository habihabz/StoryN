export class Client {
  cl_id: number;
  cl_name: string;
  cl_type: number;
  cl_type_name: string;
  cl_address: string;
  cl_email: string;
  cl_phone: string;
  cl_active_yn: boolean;
  cl_cre_by: number;
  cl_cre_by_name: string;
  cl_cre_date: string;

  constructor() {
    this.cl_id = 0;
    this.cl_name = '';
    this.cl_type = 0;
    this.cl_type_name = '';
    this.cl_address = '';
    this.cl_email = '';
    this.cl_phone = '';
    this.cl_active_yn = true;
    this.cl_cre_by = 0;
    this.cl_cre_by_name = '';
    this.cl_cre_date = new Date().toISOString().split('T')[0];
  }
}