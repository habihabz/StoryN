using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IRoom
    {
        DbResult createOrUpdateRoom(Room room);
        DbResult deleteRoom(int id);
        Room getRoom(int id);
        List<Room> getRooms();
    }
}
