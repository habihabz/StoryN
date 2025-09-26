using Erp.Server.Models;
using Erp.Server.Services;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace Erp.Server.Repository
{
    public class FileUploadService : IFileUpload
    {
        private readonly IWebHostEnvironment _env;

        public FileUploadService(IWebHostEnvironment env)
        {
            _env = env;
        }

        public async Task<string> DeleteFileAsync( string fileName)
        {
           
            if ( string.IsNullOrEmpty(fileName))
                return "Invalid path or file name";

            var fullPath = Path.Combine(_env.WebRootPath, fileName);


            if (File.Exists(fullPath))
            {
                await Task.Run(() => File.Delete(fullPath));
                return "Success";
            }

            return "File not found";
        }

        public async Task<string> UploadFileAsync(IFormFile file, string uploadPath)
        {
            if (file == null || file.Length == 0)  return string.Empty;

            var uploads = Path.Combine(_env.WebRootPath, uploadPath);
            Directory.CreateDirectory(uploads);

            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(uploads, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Path.Combine(uploadPath, fileName);
        }
    }
}
