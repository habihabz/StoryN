using Erp.Server.Models;
using Erp.Server.Repository;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerOrderController : ControllerBase
    {
        private readonly ILogger<CustomerOrderController> logger;
        private readonly IUser iuser;
        private readonly ICustomer icustomer;
        private readonly ICustomerOrder icustomerOrder;
        private readonly IJwtAuthManager ijwtAuthManager;

        public CustomerOrderController(ILogger<CustomerOrderController> _logger,
            IUser _iuser,ICustomerOrder _icustomerorder, IJwtAuthManager _ijwtAuthManager, ICustomer _icustomer)
        {
            logger = _logger;
            iuser = _iuser;
            icustomerOrder = _icustomerorder;
            ijwtAuthManager = _ijwtAuthManager;
            icustomer = _icustomer;

        }
        [HttpPost("getCustomerOrders")]
        [Authorize]
        public List<CustomerOrder> getCustomerOrders()
        {
            List<CustomerOrder> customerorders =new List<CustomerOrder>();
            customerorders = icustomerOrder.getCustomerOrders();
            return customerorders;
        }
        [HttpPost("deleteCustomerOrder")]
        [Authorize]
        public DbResult deleteCustomerOrder([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = icustomerOrder.deleteCustomerOrder(id);
            return dbResult;
        }

        [HttpPost("getCustomerOrder")]
        [Authorize]
        public CustomerOrder getCustomerOrder([FromBody] int id)
        {
            CustomerOrder customerorder = new CustomerOrder();
            customerorder = icustomerOrder.getCustomerOrder(id);
            return customerorder;
        }
        [HttpPost("createOrUpdateCustomerOrder")]
        [Authorize]
        public DbResult createOrUpdateCustomerOrder([FromBody] CustomerOrder customerorder)
        {
            DbResult dbResult = new DbResult();
            dbResult = icustomerOrder.createOrUpdateCustomerOrder(customerorder);
            return dbResult;
        } 
        
       

    }
}
