using System.Data.SqlClient;
namespace SampleAPI.RepoPatternForMultipleDB
{
    public class SQLServerOrderRepository : IOrderRepository
    {
        private readonly string _connectionString;

        public SQLServerOrderRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<Order> GetOrderAsync(int orderId)
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.OpenAsync();

            var query = "SELECT OrderId, CustomerName, TotalAmount FROM Orders WHERE OrderId = @OrderId";
            using var command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@OrderId", orderId);

            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                return new Order
                {
                    OrderId = reader.GetInt32(0),
                    CustomerName = reader.GetString(1),
                    TotalAmount = reader.GetString(2)
                };
            }

            return null;
        }
    }
}
