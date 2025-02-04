using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class SellingPrice
    {
        [Key]
        [Display(Name = "Id")]
        public int sp_id { get; set; }

        [Display(Name = "Product Id")]
        public int? sp_prod_id { get; set; }

        [Display(Name = "Product Name")]
        public string? sp_prod_name { get; set; } = string.Empty;

        [Display(Name = "Country Id")]
        public int? sp_country_id { get; set; }

        [Display(Name = "Country Name")]
        public string? sp_country_name { get; set; } = string.Empty;

        [Display(Name = "Price Type")]
        public int? sp_price_type { get; set; }

        [Display(Name = "Price Type Name")]
        public string sp_price_type_name { get; set; } = string.Empty;

        [Display(Name = "Price")]
        public decimal? sp_price { get; set; }

        [Display(Name = "Start Date")]
        [DataType(DataType.DateTime)]
        public DateTime? sp_start_date { get; set; }

        [Display(Name = "End Date")]
        [DataType(DataType.DateTime)]
        public DateTime? sp_end_date { get; set; } 

        [Display(Name = "Created By")]
        public int? sp_cre_by { get; set; }

        [Display(Name = "Created By Name")]
        public string? sp_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.DateTime)]
        public DateTime? sp_cre_date { get; set; } = DateTime.Now;
    }

}
