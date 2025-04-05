export class Address  {
  ad_id: number;
  ad_user: number;
  ad_user_name: string;
  ad_address: string;
  ad_phone: string;
  ad_is_default_yn: string;
  ad_cre_by: number;
  ad_cre_by_name: string;
  ad_cre_date: string;

  constructor() {
    this.ad_id = 0;
    this.ad_user = 0;
    this.ad_user_name = '';
    this.ad_address = '';
    this.ad_phone = '';
    this.ad_is_default_yn = '';
    this.ad_cre_by = 0;
    this.ad_cre_by_name = '';
    this.ad_cre_date = '';
  }


}
