using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly ILogger<FeedbackController> logger;
        private readonly IUser iuser;
        private readonly IFeedback ifeedback;

        public FeedbackController(ILogger<FeedbackController> _logger, IUser _iuser, IFeedback _ifeedback)
        {
            logger = _logger;
            iuser = _iuser;
            ifeedback = _ifeedback;
        }

        [HttpPost("getFeedbacks")]
        [Authorize]
        public List<Feedback> getFeedbacks()
        {
            List<Feedback> feedbacks = new List<Feedback>();
            feedbacks = ifeedback.getFeedbacks();
            return feedbacks;
        }

        [HttpPost("deleteFeedback")]
        [Authorize]
        public DbResult deleteFeedback([FromBody] int id)
        {
            DbResult dbResult = new DbResult();
            dbResult = ifeedback.deleteFeedback(id);
            return dbResult;
        }

        [HttpPost("getFeedback")]
        [Authorize]
        public Feedback getFeedback([FromBody] int id)
        {
            Feedback feedback = new Feedback();
            feedback = ifeedback.getFeedback(id);
            return feedback;
        }

        [HttpPost("createOrUpdateFeedback")]
        [Authorize]
        public DbResult createOrUpdateFeedback([FromBody] Feedback feedback)
        {
            DbResult dbResult = new DbResult();
            dbResult = ifeedback.createOrUpdateFeedback(feedback);
            return dbResult;
        }
    }
}
