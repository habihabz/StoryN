using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ICart
    {
        DbResult createOrUpdateCart(Cart cart);
        DbResult deleteCart(int id);
        Cart getCart(int id);
        List<Cart> getCarts(RequestParams requestParams);
    }
}
