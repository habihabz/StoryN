using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class RoomRepository : IRoom
    {
        private DBContext db;

        public RoomRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateRoom(Room room)
        {
            var rm_id = new SqlParameter("rm_id", room.rm_id + "");
            var rm_name = new SqlParameter("rm_name", room.rm_name + "");
            var rm_code = new SqlParameter("rm_code", room.rm_code + "");
            var rm_client = new SqlParameter("rm_client", room.rm_client + "");
            var rm_expire_date = new SqlParameter("rm_expire_date", room.rm_expire_date);
            var rm_cre_by = new SqlParameter("rm_cre_by", room.rm_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw(
                "EXEC dbo.createOrUpdateRoom @rm_id,@rm_name,@rm_code,@rm_client,@rm_expire_date,@rm_cre_by;",
                rm_id, rm_name, rm_code, rm_client, rm_expire_date, rm_cre_by
            ).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public DbResult deleteRoom(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw(
                "EXEC dbo.deleteRoom @id;", _id
            ).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public Room getRoom(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var room = db.Set<Room>().FromSqlRaw(
                "EXEC dbo.getRoom @id;", _id
            ).ToList().FirstOrDefault() ?? new Room();

            return room;
        }

        public List<Room> getRooms()
        {
            var rooms = db.Set<Room>().FromSqlRaw("EXEC dbo.getRooms;").ToList();
            return rooms;
        }
    }

}
