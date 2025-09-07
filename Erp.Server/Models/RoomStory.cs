using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class RoomStory
    {
        [Key]
        [Display(Name = "Id")]
        public int rs_id { get; set; } = 0;

        [Display(Name = "Room")]
        public int rs_room { get; set; } = 0;

        [Display(Name = "Story")]
        public int rs_story { get; set; } = 0;

        [Display(Name = "Story Name")]
        public string rs_story_name { get; set; } = string.Empty;

        [Display(Name = "Expire Date")]
        [DataType(DataType.Date)]
        public DateTime rs_expire_date { get; set; } = DateTime.Now;

        [Display(Name = "Created By")]
        public int rs_cre_by { get; set; } = 0;

        [Display(Name = "Created By")]
        public string rs_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime rs_cre_date { get; set; } = DateTime.Now;
    }
}
