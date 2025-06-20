//unnecessary

//using Microsoft.AspNetCore.Mvc;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace api.Controllers
//{
//    using Microsoft.AspNetCore.Mvc;
//    using System.Threading.Tasks;
//    using AutoGrade.Core.Models;
//    using AutoGrade.Service.Interfaces;
//    using core.Models;

//    namespace AutoGrade.API.Controllers
//    {
//        [ApiController]
//        [Route("api/assistant")]
//        public class AssistantController : ControllerBase
//        {
//            private readonly IAssistantService _assistantService;

//            public AssistantController(IAssistantService assistantService)
//            {
//                _assistantService = assistantService;
//            }

//            [HttpPost("ask")]
//            public async Task<IActionResult> Ask([FromBody] AssistantRequest request)
//            {
//                var response = await _assistantService.ProcessPromptAsync(request);
//                return Ok(response);
//            }
//        }
//    }

//}
