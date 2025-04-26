using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;
using System.Collections.Generic;


namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {

        private readonly string key = "rzp_test_qKiDdOgRFuLrJj";
        private readonly string secret = "BESqvp0LNCUAbiYJZVqnUnaS";
        private readonly ILogger<PaymentController> logger;
        private readonly IUser iusers;
    
        public PaymentController(ILogger<PaymentController> _logger,IUser _iusers)
        {
            logger = _logger;
            iusers = _iusers;
         
        }

        [HttpPost("create-order")]
        public IActionResult CreateOrder([FromBody] PaymentRequest request)
        {
            RazorpayClient client = new RazorpayClient(key, secret);

            Dictionary<string, object> options = new Dictionary<string, object>
        {
            { "amount", request.Amount * 100 }, // amount in paise
            { "currency", "INR" },
            { "payment_capture", 1 }
        };

            Order order = client.Order.Create(options);

            return Ok(new
            {
                orderId = order["id"],
                amount = request.Amount,
                currency = "INR",
                key = key
            });
        }
        public class PaymentRequest
        {
            public int Amount { get; set; }
        }
    }
}
