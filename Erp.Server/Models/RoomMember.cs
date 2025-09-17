using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Erp.Server.Models
{
    public class RoomMember
    {
        [Key]
        [Display(Name = "Id")]
        public int rmb_id { get; set; } = 0;

        [Display(Name = "Room")]
        public int rmb_room { get; set; } = 0;

        [Display(Name = "User")]
        public int rmb_user { get; set; } = 0;

        [Display(Name = "User Name")]
        public string rmb_user_name { get; set; } = string.Empty;

        [Display(Name = "Is Moderator")]
        public string rmb_is_moderator { get; set; } = "N";  // Default to "N"

        [Display(Name = "Created By")]
        public int rmb_cre_by { get; set; } = 0;

        [Display(Name = "Created By Name")]
        public string rmb_cre_by_name { get; set; } = string.Empty;

        [Display(Name = "Created On")]
        [DataType(DataType.Date)]
        public DateTime rmb_cre_date { get; set; }
    }
}
