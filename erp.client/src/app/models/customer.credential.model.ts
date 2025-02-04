import { Customer } from "./customer.model";

export class CustomerCredential {
  id: number;
  username: string;
  password: string;
  message: string;
  token: string;
  customer:Customer;

  constructor() {
    this.id = 0;
    this.username='',
    this.password = '';
    this.message = '';
    this.token = '';
    this.customer=new Customer();
  }

}
