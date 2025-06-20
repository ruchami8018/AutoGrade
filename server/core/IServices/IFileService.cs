﻿using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.IServices
{
    public interface IFileService
    {
        Task<UserFile> GetByIdAsync(int id);
        Task<bool> AddFileAsync(UserFile newFile);
        Task<List<UserFile>> GetFilesByUserIdAsync(int userId);
        Task<bool> UpdateFileAsync(UserFile file);
        Task<bool> DeleteFileAsync(int id);
    }
}
