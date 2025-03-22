export class CustomerOrderDetail {
    cd_id: number;
    cd_co_id: number;
    cd_product: number;
    cd_product_name: string;
    cd_size:number;
    cd_size_name :string;
    cd_qty: number;
    cd_amount: number;
    cd_discount: number;
    cd_tax_amount: number;
    cd_net_amount: number;
    cd_cre_by: number;
    cd_cre_date: string;

    constructor() {
        this.cd_id = 0;
        this.cd_co_id = 0;
        this.cd_product = 0;
        this.cd_product_name='';
        this.cd_size=0;
        this.cd_size_name='';
        this.cd_qty=0;
        this.cd_amount = 0;
        this.cd_discount = 0;
        this.cd_tax_amount = 0;
        this.cd_net_amount = 0;
        this.cd_cre_by = 0;
        this.cd_cre_date = '';
    }
}
