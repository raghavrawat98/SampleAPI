namespace SampleAPI.RepoPatternForMultipleDB
{
    public class SQLServerDBService : IDBService
    {
        private readonly string _connectionString;

        public SQLServerDBService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("SqlServerConnection");
        }

        public IOrderRepository GetOrderRepository()
        {
            return new SQLServerOrderRepository(_connectionString);
        }
    }
}
