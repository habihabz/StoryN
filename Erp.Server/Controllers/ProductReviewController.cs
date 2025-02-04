using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductReviewController : ControllerBase
    {
        private readonly ILogger<ProductReviewController> logger;
        private readonly IUser iuser;
        private readonly IProductReview iproductReview;

        public ProductReviewController(ILogger<ProductReviewController> _logger, IUser _iuser, IProductReview _iproductReview)
        {
            logger = _logger;
            iuser = _iuser;
            iproductReview = _iproductReview;
        }

        [HttpPost("getProductReviews")]
       // [Authorize]
        public List<ProductReview> getProductReviews([FromBody] int prod_id)
        {
            List<ProductReview> productReviews = new List<ProductReview>();
            productReviews = iproductReview.getProductReviews(prod_id);
            return productReviews;
        }

        [HttpPost("deleteProductReview")]
        [Authorize]
        public DbResult deleteProductReview([FromBody] int id)
        {
            DbResult dbResult = new DbResult();
            dbResult = iproductReview.deleteProductReview(id);
            return dbResult;
        }

        [HttpPost("getProductReview")]
       // [Authorize]
        public ProductReview getProductReview([FromBody] int id)
        {
            ProductReview productReview = new ProductReview();
            productReview = iproductReview.getProductReview(id);
            return productReview;
        }

        [HttpPost("createOrUpdateProductReview")]
        [Authorize]
        public DbResult createOrUpdateProductReview([FromBody] ProductReview productReview)
        {
            DbResult dbResult = new DbResult();
            dbResult = iproductReview.createOrUpdateProductReview(productReview);
            return dbResult;
        }
    }

}
