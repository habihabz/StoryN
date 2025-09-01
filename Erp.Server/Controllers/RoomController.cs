using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly ILogger<RoomController> logger;
        private readonly IUser iuser;
        private readonly IRoom iroom;

        public RoomController(ILogger<RoomController> _logger, IUser _iuser, IRoom _iroom)
        {
            logger = _logger;
            iuser = _iuser;
            iroom = _iroom;
        }

        [HttpPost("getRooms")]
        [Authorize]
        public List<Room> getRooms()
        {
            List<Room> rooms = new List<Room>();
            rooms = iroom.getRooms();
            return rooms;
        }

        [HttpPost("deleteRoom")]
        [Authorize]
        public DbResult deleteRoom([FromBody] int id)
        {
            DbResult dbResult = new DbResult();
            dbResult = iroom.deleteRoom(id);
            return dbResult;
        }

        [HttpPost("getRoom")]
        [Authorize]
        public Room getRoom([FromBody] int id)
        {
            Room room = new Room();
            room = iroom.getRoom(id);
            return room;
        }

        [HttpPost("createOrUpdateRoom")]
        [Authorize]
        public DbResult createOrUpdateRoom([FromBody] Room room)
        {
            DbResult dbResult = new DbResult();
            dbResult = iroom.createOrUpdateRoom(room);
            return dbResult;
        }
    }
}
