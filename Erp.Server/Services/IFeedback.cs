using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IFeedback
    {
        DbResult createOrUpdateFeedback(Feedback feedback);
        DbResult deleteFeedback(int id);
        Feedback getFeedback(int id);
        List<Feedback> getFeedbacks();
    }

}
