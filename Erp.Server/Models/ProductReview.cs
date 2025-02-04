using System;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class ProductReview
    {
        [Key]
        [Display(Name = "Review Id")]
        public int pr_id { get; set; }

        [Display(Name = "Product Id")]
        public int pr_prod_id { get; set; }

        [Display(Name = "Overall Rating")]
        public int pr_overall_rating { get; set; }

        [Display(Name = "Headline")]
        public string pr_head_line { get; set; } = string.Empty;

        [Display(Name = "Review")]
        public string pr_review { get; set; } = string.Empty;

        [Display(Name = "Created By")]
        public int pr_cre_by { get; set; }

        [Display(Name = "Created By Name")]
        public string pr_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.DateTime)]
        public DateTime pr_created_on { get; set; } = DateTime.Now;
    }

}
