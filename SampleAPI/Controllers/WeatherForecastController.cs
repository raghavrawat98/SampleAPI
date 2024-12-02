using Microsoft.AspNetCore.Mvc;
using SampleAPI.RepoPatternForMultipleDB;

namespace SampleAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IDBService _dbService;
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(
            ILogger<WeatherForecastController> logger, 
            IDBService dbService
            )
        {
            _logger = logger;
            _dbService = dbService;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            int []arr = { 1,2,3,4};
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet(Name = "GetOrders")]
        public async Task<IActionResult> GetOrders(int orderID)
        {
            var repository = _dbService.GetOrderRepository();
            var order = await repository.GetOrderAsync(orderID);

            if (order == null)
                return NotFound();

            return Ok(order);
        }
    }
}
