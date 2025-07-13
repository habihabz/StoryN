using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Erp.Server.Repository
{
    public class AnswerRepository : IAnswer
    {
        private DBContext db;

        public AnswerRepository(DBContext _db)
        {
            db = _db;
        }

        public DbResult createOrUpdateAnswer(Answer answer)
        {
            var a_id = new SqlParameter("a_id", answer.a_id + "");
            var a_story = new SqlParameter("a_story", answer.a_story + "");
            var a_step = new SqlParameter("a_step", answer.a_step + "");
            var a_answer = new SqlParameter("a_answer", answer.a_answer ?? "");
            var a_cre_by = new SqlParameter("a_cre_by", answer.a_cre_by + "");
            var a_cre_date = new SqlParameter("a_cre_date", answer.a_cre_date.ToString("yyyy-MM-dd HH:mm:ss"));

            var dbresult = db.Set<DbResult>().FromSqlRaw(
                "EXEC dbo.createOrUpdateAnswer @a_id,@a_story,@a_step,@a_answer,@a_cre_by,@a_cre_date;",
                a_id, a_story,  a_step, a_answer, a_cre_by, a_cre_date
            ).ToList().FirstOrDefault() ?? new DbResult();

            return dbresult;
        }

        public DbResult deleteAnswer(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var dbresult = db.Set<DbResult>().FromSqlRaw("EXEC dbo.deleteAnswer @id;", _id).ToList().FirstOrDefault() ?? new DbResult();
            return dbresult;
        }

        public Answer getAnswer(int id)
        {
            var _id = new SqlParameter("id", id + "");
            var answer = db.Set<Answer>().FromSqlRaw("EXEC dbo.getAnswer @id;", _id).ToList().FirstOrDefault() ?? new Answer();
            return answer;
        }

        public List<Answer> getAnswers()
        {
            return db.Set<Answer>().FromSqlRaw("EXEC dbo.getAnswers;").ToList();
        }

        public DataTable getSubmittedStoryAnswers(int st_id)
        {
            var dataTable = new DataTable();
            using (var connection = db.Database.GetDbConnection())
            {
                connection.Open();

                using var command = connection.CreateCommand();
                command.CommandText = "getSubmittedStoryAnswers";
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add(new SqlParameter("@st_id", st_id));
                using var reader = command.ExecuteReader();
                dataTable.Load(reader);
            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
            return dataTable;
        }
    }
}
