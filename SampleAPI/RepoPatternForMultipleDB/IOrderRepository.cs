namespace SampleAPI.RepoPatternForMultipleDB
{
    public interface IOrderRepository
    {
        Task<Order> GetOrderAsync(int orderId);
    }
}
