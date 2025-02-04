using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;


namespace Erp.Server.Repository
{
    public class FeedbackRepository : IFeedback
    {
        private DBContext db;

        public FeedbackRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateFeedback(Feedback feedback)
        {
            var f_id = new SqlParameter("f_id", feedback.f_id + "");
            var f_first_name = new SqlParameter("f_first_name", feedback.f_first_name ?? "");
            var f_last_name = new SqlParameter("f_last_name", feedback.f_last_name ?? "");
            var f_email = new SqlParameter("f_email", feedback.f_email ?? "");
            var f_phone = new SqlParameter("f_phone", feedback.f_phone ?? "");
            var f_message = new SqlParameter("f_message", feedback.f_message ?? "");
            var f_cre_by = new SqlParameter("f_cre_by", feedback.f_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateFeedback @f_id, @f_first_name, @f_last_name, @f_email, @f_phone, @f_message, @f_cre_by;",
                f_id, f_first_name, f_last_name, f_email, f_phone, f_message, f_cre_by).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public DbResult deleteFeedback(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteFeedback @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Feedback getFeedback(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var feedback = db.Set<Feedback>().FromSqlRaw("EXEC dbo.getFeedback @id;", _id).ToList().FirstOrDefault() ?? new Feedback();
            return feedback;
        }

        public List<Feedback> getFeedbacks()
        {
            var feedbacks = db.Set<Feedback>().FromSqlRaw("EXEC dbo.getFeedbacks;").ToList();
            return feedbacks;
        }
    }

}
