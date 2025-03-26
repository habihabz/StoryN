using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class CustomerOrderStatus
    {
        [Key]
        [Display(Name = "Id")]
        public int cos_id { get; set; }

        [Display(Name = "Status Name")]
        public string cos_name { get; set; } = string.Empty;

        [Display(Name = "Created By")]
        public int? cos_cre_by { get; set; }

        [Display(Name = "Created By Name")]
        public string? cos_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime cos_cre_date { get; set; } = DateTime.Now;
    }
}
