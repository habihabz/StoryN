using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Feedback
    {
        [Key]
        [Display(Name = "ID")]
        public int f_id { get; set; }

        [Display(Name = "First Name")]
        public string f_first_name { get; set; } = string.Empty;

        [Display(Name = "Last Name")]
        public string f_last_name { get; set; } = string.Empty;

        [Display(Name = "Email")]
        public string f_email { get; set; } = string.Empty;

        [Display(Name = "Phone")]
        public string f_phone { get; set; } = string.Empty;

        [Display(Name = "Message")]
        public string f_message { get; set; } = string.Empty;

        [Display(Name = "Created By ID")]
        public int f_cre_by { get; set; }

        [Display(Name = "Created By Name")]
        public string f_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime f_created_on { get; set; } = DateTime.Now;
    }

}
