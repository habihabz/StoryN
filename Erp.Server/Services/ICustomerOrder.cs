using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ICustomerOrder
    {
        DbResult createOrUpdateCustomerOrder(CustomerOrder customerOrder);
        DbResult deleteCustomerOrder(int id);
        CustomerOrder getCustomerOrder(int id);
        List<CustomerOrder> getCustomerOrders();
    }
}
