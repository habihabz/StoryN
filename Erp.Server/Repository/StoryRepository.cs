using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class StoryRepository : IStory
    {
        private DBContext db;
        public StoryRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateStory(Story story)
        {
            var st_id = new SqlParameter("st_id", story.st_id + "");
            var st_name = new SqlParameter("st_name", story.st_name + "");
            var st_description = new SqlParameter("st_description", story.st_description + "");
            var st_category = new SqlParameter("st_category", story.st_category + "");
            var st_type = new SqlParameter("st_type", story.st_type + "");
            var st_trailer = new SqlParameter("st_trailer", story.st_trailer + "");
            var st_image = new SqlParameter("st_image", story.st_image + "");
            var st_start_image = new SqlParameter("st_start_image", story.st_start_image + "");
            var st_end_image = new SqlParameter("st_end_image", story.st_end_image + "");
            var st_active_yn = new SqlParameter("st_active_yn", story.st_active_yn + "");
            var st_cre_by = new SqlParameter("st_cre_by", story.st_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateStory " +
                "@st_id,@st_name,@st_description,@st_category,@st_type,@st_trailer,@st_image,@st_start_image,@st_end_image, @st_active_yn,@st_cre_by;",
                st_id, st_name, st_description, st_category, st_type, st_trailer, st_image, st_start_image, st_end_image, st_active_yn, st_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteStory(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteStory @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Story getStory(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var story = db.Set<Story>().FromSqlRaw("EXEC dbo.getStory @id;", _id).ToList().FirstOrDefault() ?? new Story();
            return story;
        }

        public List<Story> getStories()
        {
            var storys = db.Set<Story>().FromSqlRaw("EXEC dbo.getStories;").ToList();
            return storys;
        }

        public DbResult startGame(RequestParams requestParams)
        {
            var _story = new SqlParameter("story", requestParams.story + "");
            var _user = new SqlParameter("user", requestParams.user + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.startGame @story,@user;", _story,_user).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public List<Story> getStoriesByRoom(int rs_room)
        {
            var _rs_room = new SqlParameter("rs_room", rs_room + "");
            var stories = db.Set<Story>().FromSqlRaw("EXEC dbo.getStoriesByRoom @rs_room;", _rs_room).ToList();
            return stories;
        }

        public List<Story> getStoriesByRoomCode(RequestParams requestParams)
        {
            var code = new SqlParameter("code", requestParams.code + "");
            var stories = db.Set<Story>().FromSqlRaw("EXEC dbo.getStoriesByRoomCode @code;", code).ToList();
            return stories;
        }
    }
}
