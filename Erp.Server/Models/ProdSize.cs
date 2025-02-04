using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class ProdSize
    {
        [Key]
        [Display(Name = "Id")]
        public int ps_id { get; set; }

        [Display(Name = "Product Id")]
        public int ps_prod_id { get; set; }

        [Display(Name = "Size")]
        public int ps_size { get; set; }

        [Display(Name = "Size Name")]
        public string ps_size_name { get; set; } = string.Empty;

        [Display(Name = "Active")]
        public string ps_active_yn { get; set; } = "Y";

        [Display(Name = "Created By")]
        public int ps_cre_by { get; set; }

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime ps_cre_date { get; set; } = DateTime.Now;
    }

}
