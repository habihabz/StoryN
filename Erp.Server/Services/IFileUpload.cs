using Erp.Server.Models;

namespace Erp.Server.Services
{
    public interface IFileUpload
    {
        Task<string> UploadFileAsync(IFormFile file, string uploadPath);
    }
}
