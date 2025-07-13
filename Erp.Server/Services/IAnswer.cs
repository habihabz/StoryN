using Erp.Server.Models;
using System.Collections.Generic;
using System.Data;

namespace Erp.Server.Services
{
    public interface IAnswer
    {
        DbResult createOrUpdateAnswer(Answer answer);
        DbResult deleteAnswer(int id);
        Answer getAnswer(int id);
        List<Answer> getAnswers();
        DataTable getSubmittedStoryAnswers(int st_id);
    }
}