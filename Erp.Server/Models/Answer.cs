using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Answer
    {

        [Key]
        [Display(Name = "Id")]
        public int a_id { get; set; }

        [Display(Name = "Story")]
        public int a_story { get; set; }

        [Display(Name = "Story Name")]
        public string? a_story_name { get; set; } = string.Empty;

        [Display(Name = "Step")]
        public int a_step { get; set; }

        [Display(Name = "Answer")]
        public string? a_answer { get; set; } = string.Empty;

        [Display(Name = "Created By")]
        public int a_cre_by { get; set; }

        [Display(Name = "Created By Name")]
        public string? a_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created Date")]
        [DataType(DataType.DateTime)]
        public DateTime a_cre_date { get; set; } = DateTime.Now;

    }
}