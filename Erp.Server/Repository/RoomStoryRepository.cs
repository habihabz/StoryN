using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class RoomStoryRepository : IRoomStory
    {
        private readonly DBContext db;

        public RoomStoryRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateRoomStory(RoomStory roomStory)
        {
            var rs_id = new SqlParameter("rs_id", roomStory.rs_id + "");
            var rs_room = new SqlParameter("rs_room", roomStory.rs_room + "");
            var rs_story = new SqlParameter("rs_story", roomStory.rs_story + "");
            var rs_expire_date = new SqlParameter("rs_expire_date", roomStory.rs_expire_date);
            var rs_cre_by = new SqlParameter("rs_cre_by", roomStory.rs_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw(
                "EXEC dbo.createOrUpdateRoomStory @rs_id,@rs_room,@rs_story,@rs_expire_date,@rs_cre_by;",
                rs_id, rs_room, rs_story, rs_expire_date, rs_cre_by
            ).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public DbResult deleteRoomStory(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw(
                "EXEC dbo.deleteRoomStory @id;", _id
            ).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public RoomStory getRoomStory(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var roomStory = db.Set<RoomStory>().FromSqlRaw(
                "EXEC dbo.getRoomStory @id;", _id
            ).ToList().FirstOrDefault() ?? new RoomStory();

            return roomStory;
        }

        public List<RoomStory> getRoomStories()
        {
            var roomStories = db.Set<RoomStory>().FromSqlRaw("EXEC dbo.getRoomStories;").ToList();
            return roomStories;
        }

        public List<RoomStory> getRoomStoriesByRoom(int rs_room)
        {
            var _rs_room = new SqlParameter("rs_room", rs_room + "");

            var roomStories = db.Set<RoomStory>().FromSqlRaw(
                "EXEC dbo.getRoomStoriesByRoom @rs_room;", _rs_room).ToList();

            return roomStories;
        }
    }
}
