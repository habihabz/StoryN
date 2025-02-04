using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class ProductReviewRepository : IProductReview
    {
        private DBContext db;

        public ProductReviewRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateProductReview(ProductReview productReview)
        {
            var pr_id = new SqlParameter("pr_id", productReview.pr_id.ToString());
            var pr_prod_id = new SqlParameter("pr_prod_id", productReview.pr_prod_id.ToString());
            var pr_overall_rating = new SqlParameter("pr_overall_rating", productReview.pr_overall_rating.ToString());
            var pr_head_line = new SqlParameter("pr_head_line", productReview.pr_head_line ?? "");
            var pr_review = new SqlParameter("pr_review", productReview.pr_review ?? "");
            var pr_cre_by = new SqlParameter("pr_cre_by", productReview.pr_cre_by.ToString());

            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateProductReview @pr_id, @pr_prod_id, @pr_overall_rating, @pr_head_line, @pr_review, @pr_cre_by;",
                pr_id, pr_prod_id, pr_overall_rating, pr_head_line, pr_review, pr_cre_by).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public DbResult deleteProductReview(int id)
        {
            var _id = new SqlParameter("id", id.ToString());
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteProductReview @id;", _id).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public ProductReview getProductReview(int id)
        {
            var _id = new SqlParameter("id", id.ToString());
            var productReview = db.Set<ProductReview>().FromSqlRaw("EXEC dbo.getProductReview @id;", _id).ToList().FirstOrDefault() ?? new ProductReview();

            return productReview;
        }

        public List<ProductReview> getProductReviews(int prod_id)
        {
            var _prod_id = new SqlParameter("prod_id", prod_id.ToString());
            var productReviews = db.Set<ProductReview>().FromSqlRaw("EXEC dbo.getProductReviews @prod_id;", _prod_id).ToList();

            return productReviews;
        }
    }

}
