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
            var st_image = new SqlParameter("st_image", story.st_image + "");
            var st_active_yn = new SqlParameter("st_active_yn", story.st_active_yn + "");
            var st_cre_by = new SqlParameter("st_cre_by", story.st_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateStory @st_id,@st_name,@st_description,@st_category,@st_image,@st_active_yn,@st_cre_by;",
                st_id, st_name, st_description, st_category, st_image, st_active_yn, st_cre_by).ToList().FirstOrDefault() ?? new DbResult();
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
    }
}
