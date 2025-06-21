using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Erp.Server.Models
{
    public class Step
    {
        [Key]
        [Display(Name = "Id")]
        public int sp_id { get; set; }

        [Display(Name = "Story")]
        public int sp_story { get; set; }

        [Display(Name = "Story Name")]
        public string? sp_story_name { get; set; } = string.Empty;

        [Display(Name = "Question")]
        public string? sp_question { get; set; } = string.Empty;

        [Display(Name = "Attachment")]
        public string? sp_attachment { get; set; } = string.Empty;

        [Display(Name = "Hint")]
        public string? sp_hint { get; set; } = string.Empty;

        [Display(Name = "Answer")]
        public string? sp_answer { get; set; } = string.Empty;

        [Display(Name = "Priority")]
        public int sp_priority { get; set; }

        [Display(Name = "Created By")]
        public int? sp_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? sp_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime sp_cre_date { get; set; } = DateTime.Now;

        [NotMapped]
        public IFormFile? file { get; set; }
    }

}
