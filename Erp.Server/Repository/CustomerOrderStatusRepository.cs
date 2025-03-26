using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class CustomerOrderStatusRepository : ICustomerOrderStatus
    {
        private DBContext db;

        public CustomerOrderStatusRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult CreateOrUpdateCustomerOrderStatus(CustomerOrderStatus status)
        {
            var cos_id = new SqlParameter("cos_id", status.cos_id + "");
            var cos_name = new SqlParameter("cos_name", status.cos_name + "");
            var cos_cre_by = new SqlParameter("cos_cre_by", status.cos_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw(
                "EXEC dbo.createOrUpdateCustomerOrderStatus @cos_id, @cos_name, @cos_cre_by;",
                cos_id, cos_name, cos_cre_by
            ).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public DbResult DeleteCustomerOrderStatus(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteCustomerOrderStatus @id;", _id)
                .ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public CustomerOrderStatus GetCustomerOrderStatus(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var status = db.Set<CustomerOrderStatus>().FromSqlRaw("EXEC dbo.getCustomerOrderStatus @id;", _id)
                .ToList().FirstOrDefault() ?? new CustomerOrderStatus();

            return status;
        }

        public List<CustomerOrderStatus> GetCustomerOrderStatuses()
        {
            var statuses = db.Set<CustomerOrderStatus>().FromSqlRaw("EXEC dbo.getCustomerOrderStatuses;").ToList();
            return statuses;
        }
    }
}
