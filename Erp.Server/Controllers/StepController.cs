using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StepController : ControllerBase
    {
        private readonly ILogger<StepController> logger;
        private readonly IUser iuser;
        private readonly IStep istep;
        private readonly IWebHostEnvironment env;
        private readonly PublicVariables publicVariables;

        public StepController(ILogger<StepController> _logger, IUser _iuser, IStep _istep, IWebHostEnvironment _env, IOptions<PublicVariables> _publicVariables)
        {
            logger = _logger;
            iuser = _iuser;
            istep = _istep;
            env = _env;
            publicVariables = _publicVariables.Value;
        }

        [HttpPost("getSteps")]
        [Authorize]
        public List<Step> getSteps()
        {
            return istep.getSteps();
        }

        [HttpPost("deleteStep")]
        [Authorize]
        public DbResult deleteStep([FromBody] int id)
        {
            return istep.deleteStep(id);
        }

        [HttpPost("getStep")]
        [Authorize]
        public Step getStep([FromBody] int id)
        {
            return istep.getStep(id);
        }

        [HttpPost("getStepsOfAStory")]
        [Authorize]
        public List<Step> getStepsOfAStory([FromBody] int id)
        {
            return istep.getStepsOfAStory(id);
        }

        [HttpPost("createOrUpdateStep")]
        [Authorize]
        [Consumes("multipart/form-data")]
        public async Task<DbResult> createOrUpdateStep([FromForm] Step step)
        {
            if (step.file != null && step.file.Length > 0)
            {
                var uploads = Path.Combine(env.WebRootPath, publicVariables.StepAttachmentPath);
                Directory.CreateDirectory(uploads);

                var extension = Path.GetExtension(step.file.FileName);
                var fileName = $"{Guid.NewGuid()}{extension}";
                var filePath = Path.Combine(uploads, fileName);

                step.sp_attachment = Path.Combine(publicVariables.StepAttachmentPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await step.file.CopyToAsync(stream);
                }
            }

            return istep.createOrUpdateStep(step);
        }

        [HttpPost("getNextStepOfaStory")]
        [Authorize]
        public Step getNextStepOfaStory([FromBody] RequestParams requestParams)
        {
            return istep.getNextStepOfaStory(requestParams);
        }
    }
}
