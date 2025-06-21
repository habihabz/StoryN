using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Erp.Server.Repository
{
    public class StepRepository : IStep
    {
        private DBContext db;
        public StepRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateStep(Step step)
        {
            var sp_id = new SqlParameter("sp_id", step.sp_id + "");
            var sp_story = new SqlParameter("sp_story", step.sp_story + "");
            var sp_question = new SqlParameter("sp_question", step.sp_question + "");
            var sp_attachment = new SqlParameter("sp_attachment", step.sp_attachment + "");
            var sp_hint = new SqlParameter("sp_hint", step.sp_hint + "");
            var sp_answer = new SqlParameter("sp_answer", step.sp_answer + "");
            var sp_priority = new SqlParameter("sp_priority", step.sp_priority + "");
            var sp_cre_by = new SqlParameter("sp_cre_by", step.sp_cre_by + "");

            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.createOrUpdateStep @sp_id,@sp_story,@sp_question,@sp_attachment,@sp_hint,@sp_answer,@sp_priority,@sp_cre_by;",
                sp_id, sp_story, sp_question, sp_attachment, sp_hint, sp_answer, sp_priority, sp_cre_by).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public DbResult deleteStep(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteStep @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Step getNextStepOfaStory(RequestParams requestParams)
        {
            var _story = new SqlParameter("story", requestParams.story + "");
            var _user = new SqlParameter("user", requestParams.user + "");
            var step = db.Set<Step>().FromSqlRaw("EXEC dbo.getNextStepOfaStory @story,@user;", _story,_user).ToList().FirstOrDefault() ?? new Step();
            return step;
        }

        public Step getStep(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var step = db.Set<Step>().FromSqlRaw("EXEC dbo.getStep @id;", _id).ToList().FirstOrDefault() ?? new Step();
            return step;
        }

        public List<Step> getSteps()
        {
            var steps = db.Set<Step>().FromSqlRaw("EXEC dbo.getSteps;").ToList();
            return steps;
        }

        public List<Step> getStepsOfAStory(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var steps = db.Set<Step>().FromSqlRaw("EXEC dbo.getStepsOfAStory @id;", _id).ToList();
            return steps;
        }
    }
}
