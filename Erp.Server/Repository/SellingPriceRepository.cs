using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class sellingPriceRepository : ISellingPrice
    {
        private DBContext db;
        public sellingPriceRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult changePrice(SellingPrice sellingPrice)
        {
            var sp_id = new SqlParameter("sp_id", sellingPrice.sp_id + "");
            var sp_prod_id = new SqlParameter("sp_prod_id", sellingPrice.sp_prod_id + "");
            var sp_country_id = new SqlParameter("sp_country_id", sellingPrice.sp_country_id + "");
            var sp_price_type = new SqlParameter("sp_price_type", sellingPrice.sp_price_type + "");
            var sp_start_date = new SqlParameter("sp_start_date", sellingPrice.sp_start_date + "");
            var sp_end_date = new SqlParameter("sp_end_date", sellingPrice.sp_end_date + "");
            var sp_price = new SqlParameter("sp_price", sellingPrice.sp_price + "");
            var sp_cre_by = new SqlParameter("sp_cre_by", sellingPrice.sp_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.changePrice @sp_id,@sp_prod_id,@sp_country_id,@sp_price_type,@sp_start_date,@sp_end_date,@sp_price,@sp_cre_by;",
                sp_id, sp_prod_id, sp_country_id, sp_price_type, sp_start_date, sp_end_date, sp_price, sp_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteSellingPrice(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deletesellingPrice @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public SellingPrice getSellingPrice(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var sellingPrice = db.Set<SellingPrice>().FromSqlRaw("EXEC dbo.getsellingPrice @id;", _id).ToList().FirstOrDefault() ?? new SellingPrice();
            return sellingPrice;
        }

        public List<SellingPrice> getSellingPrices(SellingPrice sellingPrice)
        {
            var sp_prod_id = new SqlParameter("sp_prod_id", sellingPrice.sp_prod_id + "");
            var sp_country_id = new SqlParameter("sp_country_id", sellingPrice.sp_country_id + "");
            var sp_price_type = new SqlParameter("sp_price_type", sellingPrice.sp_price_type + "");
      
            var sellingPrices = db.Set<SellingPrice>().FromSqlRaw("EXEC dbo.getsellingPrices @sp_prod_id,@sp_country_id,@sp_price_type;",sp_prod_id, sp_country_id, sp_price_type).ToList();
            return sellingPrices;
        }
    }
}
