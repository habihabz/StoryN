using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IClient
    {
        DbResult createOrUpdateClient(Client client);
        DbResult deleteClient(int id);
        Client getClient(int id);
        List<Client> getClients();
    }
}
