using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ICustomerOrderStatus
    {
        DbResult CreateOrUpdateCustomerOrderStatus(CustomerOrderStatus status);
        DbResult DeleteCustomerOrderStatus(int id);
        CustomerOrderStatus GetCustomerOrderStatus(int id);
        List<CustomerOrderStatus> GetCustomerOrderStatuses();
    }
}
