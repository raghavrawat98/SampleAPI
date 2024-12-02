using StackExchange.Redis;

namespace SampleAPI.RepoPatternForMultipleDB
{
    public class RedisDBService : IDBService
    {
        private readonly IConnectionMultiplexer _redis;

        public RedisDBService(IConfiguration configuration)
        {
            _redis = ConnectionMultiplexer.Connect(configuration.GetConnectionString("RedisConnection"));
        }

        public IOrderRepository GetOrderRepository()
        {
            return new RedisOrderRepository(_redis);
        }
    }
}
