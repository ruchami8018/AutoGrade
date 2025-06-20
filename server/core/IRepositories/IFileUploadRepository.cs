using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.IRepositories
{
    public interface IFileUploadRepository
    {
        Task<FileUpload> GetFileUploadByIdAsync(int id);

        Task<List<FileUpload>> GetAllByIdAsync(int id);


        Task<bool> AddFileUploadAsync(FileUpload fileUpload);

        Task<bool> UpdateFileUploadAsync(FileUpload fileUpload);

        Task<bool> DeleteFileUploadAsync(int id);
    }
}
