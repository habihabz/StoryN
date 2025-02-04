using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class ProdColor
    {
        [Key]
        [Display(Name = "Id")]
        public int pc_id { get; set; }

        [Display(Name = "Product Id")]
        public int pc_prod_id { get; set; }

        [Display(Name = "Color")]
        public int pc_color { get; set; }

        [Display(Name = "Color Name")]
        public string pc_color_name { get; set; } = string.Empty;

        [Display(Name = "Active")]
        public string pc_active_yn { get; set; } = "Y";

        [Display(Name = "Created By")]
        public int pc_cre_by { get; set; }

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime pc_cre_date { get; set; } = DateTime.Now;
    }

}
