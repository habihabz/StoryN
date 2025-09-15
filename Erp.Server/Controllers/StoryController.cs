using Erp.Server.Models;
using Erp.Server.Repository;
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
        private readonly IFileUpload iFileUpload;

        public StoryController(ILogger<StoryController> _logger,IUser _iuser,IStory _istory, IWebHostEnvironment _env,
            IOptions<PublicVariables> _publicVariables,
            IFileUpload _iFileUpload)
        {
            logger = _logger;
            iuser = _iuser;
            istory = _istory;
            env = _env;
            publicVariables = _publicVariables.Value;
            iFileUpload = _iFileUpload;

        }
        [HttpPost("getStories")]
       // [Authorize]
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
        //[Authorize]
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

            var uploads = Path.Combine(env.WebRootPath, publicVariables.StoryImagePath);
            Directory.CreateDirectory(uploads);

            if (story.file != null && story.file.Length > 0)
            {
                var st_image = await iFileUpload.UploadFileAsync(story.file, publicVariables.StoryImagePath);
                if (!string.IsNullOrWhiteSpace(st_image))
                {
                    story.st_image = st_image;
                }
            }

            if (story.startImage != null && story.startImage.Length > 0)
            {
                var st_start_image = await iFileUpload.UploadFileAsync(story.startImage, publicVariables.StoryImagePath);
                if (!string.IsNullOrWhiteSpace(st_start_image))
                {
                    story.st_start_image = st_start_image;
                }
            }
            if (story.endImage != null && story.endImage.Length > 0)
            {
                string? end_image = await iFileUpload.UploadFileAsync(story.endImage, publicVariables.StoryImagePath);

                if (!string.IsNullOrWhiteSpace(end_image))
                {
                    story.st_end_image = end_image;
                }
            }

            var dbResult =  istory.createOrUpdateStory(story); 
            return dbResult;
        }

        [HttpPost("startGame")]
        [Authorize]
        public DbResult startGame([FromBody] RequestParams requestParams)
        {
            DbResult dbResult = new DbResult();
            dbResult = istory.startGame(requestParams);
            return dbResult;
        }

        [HttpPost("getStoriesByRoom")]
        // [Authorize]
        public List<Story> getStoriesByRoom([FromBody] int rs_room)
        {
            List<Story> storys = new List<Story>();
            storys = istory.getStoriesByRoom(rs_room);
            return storys;
        }


        [HttpPost("getStoriesByRoomCode")]
        [Authorize]
        public List<Story> getStoriesByRoomCode([FromBody] RequestParams requestParams)
        {
            List<Story> roomStories = new List<Story>();
            roomStories = istory.getStoriesByRoomCode(requestParams);
            return roomStories;
        }
    }
}
