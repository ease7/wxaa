using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeiXin.Core;

namespace MoneyCost.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2", "login" };
        }

        /// <summary>
        /// 登陆code换取openid
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
           // GET api/user/login
        [HttpGet("{type}")]
        public async Task<string> Get(string type, string code)
        {
            if(type == "login")
            {
                string result = await WeiXinService.JscodeToSessionAsync(code);

                return result;

            }
            else
            {
                return "";
            }

           
        }
    }
}