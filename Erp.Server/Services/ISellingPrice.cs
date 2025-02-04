using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface ISellingPrice
    {
        DbResult changePrice(SellingPrice sellingPrice);
        DbResult deleteSellingPrice(int id);
        SellingPrice getSellingPrice(int id);
        public List<SellingPrice> getSellingPrices(SellingPrice sellingPrice);
    }
}
