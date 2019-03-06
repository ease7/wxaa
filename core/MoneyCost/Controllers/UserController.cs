﻿using System;
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
        /// <summary>
        /// 登陆code换取openid
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public async Task<string> Login(string code)
        {
            string result = await WeiXinService.JscodeToSessionAsync(code);

            return result;
        }
    }
}