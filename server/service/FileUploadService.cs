using core.IRepositories;
using core.IServices;
using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service
{
    public class FileUploadService : IFileUploadService
    {
        private readonly IFileUploadRepository _fileUploadRepository;
        public FileUploadService(IFileUploadRepository fileUploadRepository)
        {
            _fileUploadRepository = fileUploadRepository;
        }

        public async Task<bool> AddFileUploadAsync(FileUpload fileUpload)
        {
            return await _fileUploadRepository.AddFileUploadAsync(fileUpload);
        }

        public async Task<bool> DeleteExamUploadAsync(int id)
        {
            return await _fileUploadRepository.DeleteFileUploadAsync(id);
        }

        public async Task<List<FileUpload>> GetAllByIdAsync(int id)
        {
            return await _fileUploadRepository.GetAllByIdAsync(id);
        }

        public async Task<FileUpload> GetExamUploadByIdAsync(int id)
        {
            return await _fileUploadRepository.GetFileUploadByIdAsync(id);
        }

        public async Task<bool> UpdateExamUploadAsync(FileUpload examUpload)
        {
            return await _fileUploadRepository.UpdateFileUploadAsync(examUpload);
        }

    }
}
