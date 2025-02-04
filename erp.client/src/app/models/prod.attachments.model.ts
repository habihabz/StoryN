export class ProdAttachement {
  pa_id: number;
  pa_prod_id: number;
  pa_color: number;
  pa_color_name: string;
  pa_image_path: string;
  pa_cre_by: number;
  pa_cre_by_name: string;
  pa_cre_date: string;
  
  constructor() {
    this.pa_id = 0,
    this.pa_prod_id=0,
    this.pa_color=0,
    this.pa_color_name='',
    this.pa_image_path='',
    this.pa_cre_by = 0,
    this.pa_cre_by_name = '',
    this.pa_cre_date = ''
  }

}
