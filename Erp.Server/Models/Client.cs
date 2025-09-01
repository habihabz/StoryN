using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Client
    {
        [Key]
        [Display(Name = "Id")]
        public int cl_id { get; set; } = 0;

        [Display(Name = "Name")]
        public string cl_name { get; set; } = string.Empty;

        [Display(Name = "Type")]
        public int cl_type { get; set; } = 0;

        [Display(Name = "Type Name")]
        public string cl_type_name { get; set; } = string.Empty;

        [Display(Name = "Address")]
        public string cl_address { get; set; } = string.Empty;

        [Display(Name = "Email")]
        [EmailAddress]
        public string cl_email { get; set; } = string.Empty;

        [Display(Name = "Phone")]
        public string cl_phone { get; set; } = string.Empty;

        [Display(Name = "Active")]
        public bool cl_active_yn { get; set; } = true;

        [Display(Name = "Created By")]
        public int cl_cre_by { get; set; } = 0;

        [Display(Name = "Created By Name")]
        public string cl_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime cl_cre_date { get; set; } = DateTime.Now;
    }

}
