using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ILogger<ClientController> logger;
        private readonly IUser iuser;
        private readonly IClient iclient;

        public ClientController(ILogger<ClientController> _logger, IUser _iuser, IClient _iclient)
        {
            logger = _logger;
            iuser = _iuser;
            iclient = _iclient;
        }

        [HttpPost("getClients")]
        [Authorize]
        public List<Client> getClients()
        {
            List<Client> clients = new List<Client>();
            clients = iclient.getClients();
            return clients;
        }

        [HttpPost("deleteClient")]
        [Authorize]
        public DbResult deleteClient([FromBody] int id)
        {
            DbResult dbResult = new DbResult();
            dbResult = iclient.deleteClient(id);
            return dbResult;
        }

        [HttpPost("getClient")]
        [Authorize]
        public Client getClient([FromBody] int id)
        {
            Client client = new Client();
            client = iclient.getClient(id);
            return client;
        }

        [HttpPost("createOrUpdateClient")]
        [Authorize]
        public DbResult createOrUpdateClient([FromBody] Client client)
        {
            DbResult dbResult = new DbResult();
            dbResult = iclient.createOrUpdateClient(client);
            return dbResult;
        }
    }
}
