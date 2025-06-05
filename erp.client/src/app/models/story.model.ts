export class Story {
  st_id: number;
  st_name: string;
  st_description :string;
  st_image :string;
  st_category:number;
  st_category_name:string;
  st_active_yn: string;
  st_cre_by: number;
  st_cre_by_name: string;
  st_cre_date: string;
  constructor() {
    this.st_id = 0;
    this.st_name='',
    this.st_description='';
    this.st_image='';
    this.st_category=0;
    this.st_category_name='';
    this.st_active_yn = '';
    this.st_cre_by = 0;
    this.st_cre_by_name = '';
    this.st_cre_date = '';
  }

}
