using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IStep
    {
        DbResult createOrUpdateStep(Step step);
        DbResult deleteStep(int id);
        Step getNextStepOfaStory(RequestParams requestParams);
        Step getStep(int id);
        List<Step> getSteps();
        List<Step> getStepsOfAStory(int id);
    }
}
