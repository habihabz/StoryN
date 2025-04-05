using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IAddress
    {
        DbResult createOrUpdateAddress(Address cart);
        DbResult deleteAddress(int id);
        Address getAddress(int id);
        List<Address> getAddresses(RequestParams requestParams);
        List<Address> getMyAddresses(RequestParams requestParams);
    }
}
