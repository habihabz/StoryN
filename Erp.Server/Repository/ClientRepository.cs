using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class ClientRepository : IClient
    {
        private readonly DBContext db;

        public ClientRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateClient(Client client)
        {
            var cl_id = new SqlParameter("cl_id", client.cl_id + "");
            var cl_name = new SqlParameter("cl_name", client.cl_name + "");
            var cl_type = new SqlParameter("cl_type", client.cl_type + "");
            var cl_address = new SqlParameter("cl_address", client.cl_address + "");
            var cl_email = new SqlParameter("cl_email", client.cl_email + "");
            var cl_phone = new SqlParameter("cl_phone", client.cl_phone + "");
            var cl_active_yn = new SqlParameter("cl_active_yn", client.cl_active_yn ? "1" : "0");
            var cl_cre_by = new SqlParameter("cl_cre_by", client.cl_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw(
                "EXEC dbo.createOrUpdateClient @cl_id, @cl_name, @cl_type, @cl_address, @cl_email, @cl_phone, @cl_active_yn, @cl_cre_by;",
                cl_id, cl_name, cl_type, cl_address, cl_email, cl_phone, cl_active_yn, cl_cre_by
            ).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public DbResult deleteClient(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw(
                "EXEC dbo.deleteClient @id;", _id
            ).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public Client getClient(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var client = db.Set<Client>().FromSqlRaw(
                "EXEC dbo.getClient @id;", _id
            ).ToList().FirstOrDefault() ?? new Client();

            return client;
        }

        public List<Client> getClients()
        {
            var clients = db.Set<Client>().FromSqlRaw("EXEC dbo.getClients;").ToList();
            return clients;
        }
    }


}
