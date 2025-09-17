using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomStoryController : ControllerBase
    {
        private readonly ILogger<RoomStoryController> logger;
        private readonly IUser iuser;
        private readonly IRoomStory iroomStory;

        public RoomStoryController(ILogger<RoomStoryController> _logger, IUser _iuser, IRoomStory _iroomStory)
        {
            logger = _logger;
            iuser = _iuser;
            iroomStory = _iroomStory;
        }

        [HttpPost("getRoomStories")]
        [Authorize]
        public List<RoomStory> getRoomStories()
        {
            List<RoomStory> roomStories = new List<RoomStory>();
            roomStories = iroomStory.getRoomStories();
            return roomStories;
        }

        [HttpPost("getRoomStory")]
        [Authorize]
        public RoomStory getRoomStory([FromBody] int id)
        {
            RoomStory roomStory = new RoomStory();
            roomStory = iroomStory.getRoomStory(id);
            return roomStory;
        }

        [HttpPost("deleteRoomStory")]
        [Authorize]
        public DbResult deleteRoomStory([FromBody] int id)
        {
            DbResult dbResult = new DbResult();
            dbResult = iroomStory.deleteRoomStory(id);
            return dbResult;
        }

        [HttpPost("createOrUpdateRoomStory")]
        [Authorize]
        public DbResult createOrUpdateRoomStory([FromBody] RoomStory roomStory)
        {
            DbResult dbResult = new DbResult();
            dbResult = iroomStory.createOrUpdateRoomStory(roomStory);
            return dbResult;
        }

        [HttpPost("getRoomStoriesByRoom")]
        [Authorize]
        public List<RoomStory> getRoomStoriesByRoom([FromBody]  int room)
        {
            List<RoomStory> roomStories = new List<RoomStory>();
            roomStories = iroomStory.getRoomStoriesByRoom(room);
            return roomStories;
        }

   
    }
}
