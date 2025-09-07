using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IRoomStory
    {
        DbResult createOrUpdateRoomStory(RoomStory roomStory);
        DbResult deleteRoomStory(int id);
        RoomStory getRoomStory(int id);
        List<RoomStory> getRoomStories();
        List<RoomStory> getRoomStoriesByRoom(int rs_room);
    }
}
