using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class RoomMemberRepository : IRoomMember
    {
        private readonly DBContext db;

        public RoomMemberRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateRoomMember(RoomMember roomMember)
        {
            var rmb_id = new SqlParameter("rmb_id", roomMember.rmb_id + "");
            var rmb_room = new SqlParameter("rmb_room", roomMember.rmb_room + "");
            var rmb_user = new SqlParameter("rmb_user", roomMember.rmb_user + "");
            var rmb_is_moderator = new SqlParameter("rmb_is_moderator", roomMember.rmb_is_moderator);
            var rmb_cre_by = new SqlParameter("rmb_cre_by", roomMember.rmb_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw(
                "EXEC dbo.createOrUpdateRoomMember @rmb_id, @rmb_room, @rmb_user, @rmb_is_moderator, @rmb_cre_by;",
                rmb_id, rmb_room, rmb_user, rmb_is_moderator, rmb_cre_by
            ).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public DbResult deleteRoomMember(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw(
                "EXEC dbo.deleteRoomMember @id;", _id
            ).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public RoomMember getRoomMember(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var roomMember = db.Set<RoomMember>().FromSqlRaw(
                "EXEC dbo.getRoomMember @id;", _id
            ).ToList().FirstOrDefault() ?? new RoomMember();

            return roomMember;
        }

        public List<RoomMember> getRoomMembers()
        {
            var roomMembers = db.Set<RoomMember>().FromSqlRaw("EXEC dbo.getRoomMembers;").ToList();
            return roomMembers;
        }

        public List<RoomMember> getRoomMembersByRoom(int room)
        {
            var _room = new SqlParameter("room", room + "");

            var roomMembers = db.Set<RoomMember>().FromSqlRaw(
                "EXEC dbo.getRoomMembersByRoom @room;", _room).ToList();

            return roomMembers;
        }
    }
}
