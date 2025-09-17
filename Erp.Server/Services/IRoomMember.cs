using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IRoomMember
    {
        DbResult createOrUpdateRoomMember(RoomMember roomMember);
        DbResult deleteRoomMember(int id);
        RoomMember getRoomMember(int id);
        List<RoomMember> getRoomMembers();
        List<RoomMember> getRoomMembersByRoom(int room);
    }
}
