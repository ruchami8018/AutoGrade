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
    public class FileService : IFileService
    {
        private readonly IUserFileRepository _fileRepository;
        public FileService(IUserFileRepository fileRepository)
        {
            _fileRepository = fileRepository;
        }

        public async Task<bool> AddFileAsync(UserFile newFile)
        {
            return await _fileRepository.AddFileAsync(newFile);
        }

        public async Task<UserFile> GetByIdAsync(int id)
        {
            return await _fileRepository.GetByIdAsync(id);
        }

        public async Task<List<UserFile>> GetFilesByUserIdAsync(int userId)
        {
            return await _fileRepository.GetFilesByUserIdAsync(userId);
        }

        public async Task<bool> UpdateFileAsync(UserFile file)
        {
            return await _fileRepository.UpdateFileAsync(file);
        }

        public async Task<bool> DeleteFileAsync(int id)
        {
            return await _fileRepository.DeleteFileAsync(id);
        }
    }
}
