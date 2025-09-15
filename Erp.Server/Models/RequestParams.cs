namespace Erp.Server.Models
{
    public class RequestParams
    {
        public int id { get; set; }
        public int story { get; set; } = 0;
        public string name { get; set; } =string.Empty;
        public string type { get; set; } = string.Empty;
        public int country { get; set; } = 0;
        public string details { get; set; } = string.Empty;
        public string code { get; set; } = string.Empty;
        public int user { get; set; } = 0;

    }
}
