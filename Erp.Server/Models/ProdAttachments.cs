using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class ProdAttachment
    {
        [Key]
        [Display(Name = "Id")]
        public int pa_id { get; set; }

        [Display(Name = "Product Id")]
        public int? pa_prod_id { get; set; }

        [Display(Name = "Color")]
        public int? pa_color { get; set; }

        [Display(Name = "Color Name")]
        public string? pa_color_name { get; set; } = string.Empty;

        [Display(Name = "Image Path")]
        public string? pa_image_path { get; set; } = string.Empty;

        [Display(Name = "Created By")]
        public int? pa_cre_by { get; set; }

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime? pa_cre_date { get; set; } = DateTime.Now;
    }

}
