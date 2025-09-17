using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Erp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomMemberController : ControllerBase
    {
        private readonly ILogger<RoomMemberController> logger;
        private readonly IUser iuser;
        private readonly IRoomMember iroomMember;

        public RoomMemberController(ILogger<RoomMemberController> _logger, IUser _iuser, IRoomMember _iroomMember)
        {
            logger = _logger;
            iuser = _iuser;
            iroomMember = _iroomMember;
        }

        [HttpPost("getRoomMembers")]
        [Authorize]
        public List<RoomMember> getRoomMembers()
        {
            List<RoomMember> roomMembers = new List<RoomMember>();
            roomMembers = iroomMember.getRoomMembers();
            return roomMembers;
        }

        [HttpPost("getRoomMember")]
        [Authorize]
        public RoomMember getRoomMember([FromBody] int id)
        {
            RoomMember roomMember = new RoomMember();
            roomMember = iroomMember.getRoomMember(id);
            return roomMember;
        }

        [HttpPost("deleteRoomMember")]
        [Authorize]
        public DbResult deleteRoomMember([FromBody] int id)
        {
            DbResult dbResult = new DbResult();
            dbResult = iroomMember.deleteRoomMember(id);
            return dbResult;
        }

        [HttpPost("createOrUpdateRoomMember")]
        [Authorize]
        public DbResult createOrUpdateRoomMember([FromBody] RoomMember roomMember)
        {
            DbResult dbResult = new DbResult();
            dbResult = iroomMember.createOrUpdateRoomMember(roomMember);
            return dbResult;
        }

        [HttpPost("getRoomMembersByRoom")]
        [Authorize]
        public List<RoomMember> getRoomMembersByRoom([FromBody] int room)
        {
            List<RoomMember> roomMembers = new List<RoomMember>();
            roomMembers = iroomMember.getRoomMembersByRoom(room);
            return roomMembers;
        }
    }
}
