namespace SampleAPI.RepoPatternForMultipleDB
{
    public interface IDBService
    {
        IOrderRepository GetOrderRepository();
    }
}
