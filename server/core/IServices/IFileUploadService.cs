using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.IServices
{
    public interface IFileUploadService
    {
        Task<FileUpload> GetExamUploadByIdAsync(int id);

        Task<List<FileUpload>> GetAllByIdAsync(int id);

        Task<bool> AddFileUploadAsync(FileUpload fileUpload);
        Task<bool> UpdateExamUploadAsync(FileUpload examUpload);

        Task<bool> DeleteExamUploadAsync(int id);
    }
}
