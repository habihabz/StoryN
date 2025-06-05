using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IStory
    {
        DbResult createOrUpdateStory(Story story);
        DbResult deleteStory(int id);
        Story getStory(int id);
        List<Story> getStories();
    }
}
