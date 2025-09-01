using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Room
    {
        [Key]
        [Display(Name = "Id")]
        public int rm_id { get; set; } = 0;

        [Display(Name = "Name")]
        public string rm_name { get; set; } = string.Empty;

        [Display(Name = "Code")]
        public string rm_code { get; set; } = string.Empty;

        [Display(Name = "Client")]
        public int rm_client { get; set; } = 0;

        [Display(Name = "Client Name")]
        public string rm_client_name { get; set; } = string.Empty;

        [Display(Name = "Expire Date")]
        [DataType(DataType.Date)]
        public DateTime rm_expire_date { get; set; } = DateTime.Now;

        [Display(Name = "Created By")]
        public int rm_cre_by { get; set; } = 0;

        [Display(Name = "Created By Name")]
        public string rm_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime rm_cre_date { get; set; } = DateTime.Now;
    }
}
