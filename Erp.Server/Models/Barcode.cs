using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Barcode
    {
        [Key]
        [Display(Name = "Id")]
        public int b_id { get; set; }

        [Display(Name = "Prod Id")]
        public int b_prod_id { get; set; }

        [Display(Name = "Barcode")]
        public string b_bar_code { get; set; } = "Y";

        [Display(Name = "Created By")]
        public int? b_cre_by { get; set; }

        [Display(Name = "Created By Name")]
        public string b_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime b_cre_date { get; set; } = DateTime.Now;
    }
}
