using System.Text.Json;
using StackExchange.Redis;

namespace SampleAPI.RepoPatternForMultipleDB
{
    public class RedisOrderRepository : IOrderRepository
    {
        private readonly IConnectionMultiplexer _redis;

        public RedisOrderRepository(IConnectionMultiplexer redis)
        {
            _redis = redis;
        }

        public async Task<Order> GetOrderAsync(int orderId)
        {
            var db = _redis.GetDatabase();
            var orderData = await db.StringGetAsync($"Order:{orderId}");
            string orderDataString = orderData.ToString();
            return orderData.HasValue ? JsonSerializer.Deserialize<Order>(orderDataString) : null;
        }
    }
}
