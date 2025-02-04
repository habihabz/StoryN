using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IProductReview
    {
        DbResult createOrUpdateProductReview(ProductReview productReview);
        DbResult deleteProductReview(int id);
        ProductReview getProductReview(int id);
        List<ProductReview> getProductReviews(int prod_id);
    }

}
