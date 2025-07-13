using System.Data;
using Erp.Server.Models;
using Erp.Server.Repository;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Converters;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswerController : ControllerBase
    {
        private readonly ILogger<AnswerController> logger;
        private readonly IAnswer ianswer;

        public AnswerController(ILogger<AnswerController> _logger, IAnswer _ianswer)
        {
            logger = _logger;
            ianswer = _ianswer;
        }

        [HttpPost("getAnswers")]
        [Authorize]
        public List<Answer> getAnswers()
        {
            return ianswer.getAnswers();
        }

        [HttpPost("getAnswer")]
        [Authorize]
        public Answer getAnswer([FromBody] int id)
        {
            return ianswer.getAnswer(id);
        }

        [HttpPost("deleteAnswer")]
        [Authorize]
        public DbResult deleteAnswer([FromBody] int id)
        {
            return ianswer.deleteAnswer(id);
        }

        [HttpPost("createOrUpdateAnswer")]
        [Authorize]
        public DbResult createOrUpdateAnswer([FromBody] Answer answer)
        {
            return ianswer.createOrUpdateAnswer(answer);
        }


        [HttpPost("getSubmittedStoryAnswers")]
        [Authorize]
        public ActionResult getSubmittedStoryAnswers([FromBody] int st_id)
        {
            DataTableConvert dataTableConvert = new DataTableConvert();
            DataTable vatReport = ianswer.getSubmittedStoryAnswers(st_id);
            var list = dataTableConvert.ConvertDataTableToList(vatReport);

            return Ok(list);
        }
    }
}
