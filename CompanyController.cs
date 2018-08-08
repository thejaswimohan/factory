namespace MVC_DP_POC.Controllers
{
    using System.Web.Mvc;
    using Repository;
    using Newtonsoft.Json;

    public class CompanyController : Controller
    {        
        readonly ICompanyRepository<Company> repo;
        public CompanyController(ICompanyRepository<Company> tempProduct)
        {
            repo = tempProduct;
        }

        public string Index()
        {
            var logger = NLog.LogManager.GetCurrentClassLogger();
            logger.Debug("Program Started....");
            var data = repo.GetAll();
            return JsonConvert.SerializeObject(data);
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}