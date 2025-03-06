using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class CustomerOrderRepository : ICustomerOrder
    {
        private DBContext db;
        public CustomerOrderRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateCustomerOrder(CustomerOrder customerOrder)
        {
            var co_id = new SqlParameter("co_id", customerOrder.co_id + "");
            var co_customer = new SqlParameter("co_customer", customerOrder.co_customer + "");
            var co_d_address = new SqlParameter("co_d_address", customerOrder.co_d_address + "");
            var co_cre_by = new SqlParameter("co_cre_by", customerOrder.co_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateCustomerOrder @co_id,@co_customer,@co_d_address,@co_cre_by;",
                co_id, co_customer, co_d_address, co_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

     

        public DbResult deleteCustomerOrder(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteCustomerOrder @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public CustomerOrder getCustomerOrder(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var customerorder = db.Set<CustomerOrder>().FromSqlRaw("EXEC dbo.getCustomerOrder @id;", _id).ToList().FirstOrDefault() ?? new CustomerOrder();
            return customerorder;
        }


        public List<CustomerOrder> getCustomerOrders()
        {
            var customerorders = db.Set<CustomerOrder>().FromSqlRaw("EXEC dbo.getCustomerOrders;").ToList();
            return customerorders;
        }

    }
}
