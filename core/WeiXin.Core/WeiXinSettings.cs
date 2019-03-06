using System;
using System.Collections.Generic;
using System.Text;

namespace WeiXin.Core
{
    internal class WeiXinSettings
    {
        public static string URL_Jscode2Session = "https://api.weixin.qq.com/sns/jscode2session";

        public static string appid = "wx3ef111ef9b22218f";

        public static string secret = "50107976543a9a29e7f00da2195187a5";




        public static string GetJscode2Session(string code)
        {
            return $"{URL_Jscode2Session}?grant_type=authorization_code&appid={appid}&secret={secret}&js_code={code}";
        }
    }
}
