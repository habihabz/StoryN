using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerOrderStatusController : ControllerBase
    {
        private readonly ILogger<CustomerOrderStatusController> logger;
        private readonly IUser iuser;
        private readonly ICustomerOrderStatus icustomerOrderStatus;

        public CustomerOrderStatusController(ILogger<CustomerOrderStatusController> _logger, IUser _iuser, ICustomerOrderStatus _icustomerOrderStatus)
        {
            logger = _logger;
            iuser = _iuser;
            icustomerOrderStatus = _icustomerOrderStatus;
        }

        [HttpPost("getCustomerOrderStatuses")]
        [Authorize]
        public List<CustomerOrderStatus> GetCustomerOrderStatuses()
        {
            return icustomerOrderStatus.GetCustomerOrderStatuses();
        }

        [HttpPost("deleteCustomerOrderStatus")]
        [Authorize]
        public DbResult DeleteCustomerOrderStatus([FromBody] int id)
        {
            return icustomerOrderStatus.DeleteCustomerOrderStatus(id);
        }

        [HttpPost("getCustomerOrderStatus")]
        [Authorize]
        public CustomerOrderStatus GetCustomerOrderStatus([FromBody] int id)
        {
            return icustomerOrderStatus.GetCustomerOrderStatus(id);
        }

        [HttpPost("createOrUpdateCustomerOrderStatus")]
        [Authorize]
        public DbResult CreateOrUpdateCustomerOrderStatus([FromBody] CustomerOrderStatus status)
        {
            return icustomerOrderStatus.CreateOrUpdateCustomerOrderStatus(status);
        }
    }
}
