using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class CustomerOrder
    {
        [Key]
        [Display(Name = "Id")]
        public int co_id { get; set; } 
        
        [Display(Name = "Id")]
        public int? co_customer { get; set; }

        [Display(Name = "Customer")]
        public string? co_customer_name { get; set; } = string.Empty;

        [Display(Name = "Delivery Address")]
        public int? co_d_address { get; set; } = 0;

        [Display(Name = "Delivery Address")]
        public string? co_d_address_details { get; set; } = string.Empty;

        [Display(Name = "Quantity")]
        public int? co_qty { get; set; } = 0;

        [Display(Name = "Amount")]
        public int? co_amount { get; set; } = 0;

        [Display(Name = "Status")]
        public int? co_status { get; set; } = 0;

        [Display(Name = "Status")]
        public int? co_status_name { get; set; } = 0;

        [Display(Name = "Created By")]
        public int? co_cre_by { get; set; }

        [Display(Name = "Created By Name")]
        public string? co_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime co_cre_date { get; set; } = DateTime.Now;
    }
}
