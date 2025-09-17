using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class Story { 
    
        [Key]
        [Display(Name = "Id")]
        public int st_id { get; set; }

        [Display(Name = "Name")]
        public string? st_name { get; set; } = string.Empty;

        [Display(Name = "Description")]
        public string? st_description { get; set; } = string.Empty;

        [Display(Name = "Type")]
        public int? st_type { get; set; }

        [Display(Name = "Type")]
        public string? st_type_name { get; set; } = string.Empty;

        [Display(Name = "Category")]
        public int? st_category { get; set; }

        [Display(Name = "Category")]
        public string? st_category_name { get; set; } = string.Empty;

        [Display(Name = "Trailer")]
        public string? st_trailer { get; set; } = string.Empty;

        [Display(Name = "Image Path")]
        public string? st_image { get; set; } = string.Empty;


        [Display(Name = "Start Image Path")]
        public string? st_start_image { get; set; } = string.Empty;


        [Display(Name = "End Image")]
        public string? st_end_image { get; set; } = string.Empty;


        [Display(Name = "Active")]
        public string? st_active_yn { get; set; } = "Y";

        [Display(Name = "Created By")]
        public int? st_cre_by { get; set; }

        [Display(Name = "Created By")]
        public string? st_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime  st_cre_date { get; set; } = DateTime.Now;

        [NotMapped]
        public IFormFile? trailer { get; set; }

        [NotMapped]
        public IFormFile? file { get; set; }

        [NotMapped]
        public IFormFile? startImage { get; set; }

        [NotMapped]
        public IFormFile? endImage { get; set; }




    }
}
