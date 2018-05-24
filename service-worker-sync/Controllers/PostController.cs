using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using service_worker_sync.Models;

namespace service_worker_sync.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {   
        [HttpPost]
        public IActionResult Post([FromBody] Message message)
        {
            return Ok(message);
        }
    }
}

