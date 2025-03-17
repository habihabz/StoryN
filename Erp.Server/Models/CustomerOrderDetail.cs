using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class CustomerOrderDetail
    {
        [Key]
        [Display(Name = "Id")]
        public int cd_id { get; set; }

        [Display(Name = "Customer Order Id")]
        public int? cd_co_id { get; set; }

        [Display(Name = "Product")]
        public int? cd_product { get; set; }

        [Display(Name = "Amount")]
        public decimal? cd_amount { get; set; } = 0;

        [Display(Name = "Discount")]
        public decimal? cd_discount { get; set; } = 0;

        [Display(Name = "Tax Amount")]
        public decimal? cd_tax_amount { get; set; } = 0;

        [Display(Name = "Net Amount")]
        public decimal? cd_net_amount { get; set; } = 0;

        [Display(Name = "Created By")]
        public int? cd_cre_by { get; set; }

        [Display(Name = "Created On")]
        [DataType(DataType.DateTime)]
        public DateTime cd_cre_date { get; set; } = DateTime.Now;
    }
}
