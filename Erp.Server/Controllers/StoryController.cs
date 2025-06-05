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
    public class StoryController : ControllerBase
    {
        private readonly ILogger<StoryController> logger;
        private readonly IUser iuser;
        private readonly IStory istory;
        private readonly IWebHostEnvironment env;
        private readonly PublicVariables publicVariables;

        public StoryController(ILogger<StoryController> _logger,IUser _iuser,IStory _istory, IWebHostEnvironment _env, IOptions<PublicVariables> _publicVariables)
        {
            logger = _logger;
            iuser = _iuser;
            istory = _istory;
            env = _env;
            publicVariables = _publicVariables.Value;

        }
        [HttpPost("getStories")]
        [Authorize]
        public List<Story> getStories()
        {
            List<Story> storys =new List<Story>();
            storys = istory.getStories();
            return storys; 
        }
        [HttpPost("deleteStory")]
        [Authorize]
        public DbResult deleteStory([FromBody] int id)
        {
            DbResult dbResult=new DbResult();
            dbResult = istory.deleteStory(id);
            return dbResult;
        }

        [HttpPost("getStory")]
        [Authorize]
        public Story getStory([FromBody] int id)
        {
            Story story = new Story();
            story = istory.getStory(id);
            return story;
        }
        [HttpPost("createOrUpdateStory")]
        [Authorize]
        [Consumes("multipart/form-data")]
        public async Task<DbResult> createOrUpdateStory([FromForm] Story story)
        {
            if (story.file != null && story.file.Length > 0)
            {
                var uploads = Path.Combine(env.WebRootPath, publicVariables.StoryImagePath);
                Directory.CreateDirectory(uploads);

                var originalName = Path.GetFileNameWithoutExtension(story.file.FileName);
                var extension = Path.GetExtension(story.file.FileName);
                var fileName = $"{Guid.NewGuid()}{extension}";
                var filePath = Path.Combine(uploads, fileName);

                story.st_image = Path.Combine(publicVariables.StoryImagePath, fileName); // store relative path

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await story.file.CopyToAsync(stream);
                }
            }

            var dbResult =  istory.createOrUpdateStory(story); // if possible, make this async
            return dbResult;
        }


    }
}
