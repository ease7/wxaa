using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace WeiXin.Core
{
    public class WeiXinService
    {
        public static async Task<string> JscodeToSessionAsync(string code)
        {
            using (HttpClient client = new HttpClient())
            {
                string url = WeiXinSettings.GetJscode2Session(code);

                var result = await client.GetAsync(url);

                if (result.IsSuccessStatusCode)
                {
                    string str = await result.Content.ReadAsStringAsync();

                    return str;
                }
            }

            return "";
        }
    }
}
