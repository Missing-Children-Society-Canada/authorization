using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Registration.Startup))]
namespace Registration
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
