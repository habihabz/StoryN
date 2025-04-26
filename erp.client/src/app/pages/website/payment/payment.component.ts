import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
    private apiUrl = `${environment.serverHostAddress}/api/payment/create-order`;
    razorpayLoaded = false;
  
    constructor(private http: HttpClient) {}

  loadRazorpay() {
    return new Promise((resolve, reject) => {
      if (this.razorpayLoaded) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        this.razorpayLoaded = true;
        resolve(true);
      };
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  }

  async pay() {
    await this.loadRazorpay();

    const Razorpay = (window as any).Razorpay;

    this.http.post<any>(this.apiUrl, { amount: 500 })
      .subscribe(order => {
        const options = {
          key: order.key,
          amount: order.amount * 100,
          currency: order.currency,
          name: 'Captain',
          description: 'Test Transaction',
          order_id: order.orderId,
          method: {
            upi: true
          },
          handler: (response: any) => {
            alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
          },
          prefill: {
            email: 'abimanjeri@gmail.com',
            contact: '9744764030'
          },
          theme: {
            color: '#3399cc'
          }
        };

        const rzp = new Razorpay(options);
        rzp.open();
      });
  }
}