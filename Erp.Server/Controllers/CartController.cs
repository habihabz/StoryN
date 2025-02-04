using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ILogger<CartController> logger;
        private readonly IUser iuser;
        private readonly ICart icart;

        public CartController(ILogger<CartController> _logger,IUser _iuser,ICart _icart)
        {
            logger = _logger;
            iuser = _iuser;
            icart = _icart;

        }
        [HttpPost("getCarts")]
        [Authorize]
        public List<Cart> getCarts(RequestParams requestParams)
        {
            List<Cart> carts =new List<Cart>();
            carts = icart.getCarts(requestParams);
            return carts;
        }
        [HttpPost("deleteCart")]
        [Authorize]
        public DbResult deleteCart([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = icart.deleteCart(id);
            return dbResult;
        }

        [HttpPost("getCart")]
        [Authorize]
        public Cart getCart([FromBody] int id)
        {
            Cart cart = new Cart();
            cart = icart.getCart(id);
            return cart;
        }
        [HttpPost("createOrUpdateCart")]
        [Authorize]
        public DbResult createOrUpdateCart([FromBody] Cart cart)
        {
            DbResult dbResult = new DbResult();
            dbResult = icart.createOrUpdateCart(cart);
            return dbResult;
        }

    }
}
