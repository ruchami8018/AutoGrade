﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.DTOs
{
    public class FileUploadDto
    {
        public int FileId { get; set; }
        public string StudentName { get; set; }
        public string FilePath { get; set; }
    }
}
