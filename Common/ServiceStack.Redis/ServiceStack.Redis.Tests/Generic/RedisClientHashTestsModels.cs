using System;
using ServiceStack.Common.Tests.Models;

namespace ServiceStack.Redis.Tests.Generic
{
	public class RedisClientHashTestsModelWithFieldsOfDifferentTypes
		: RedisClientHashTestsBase<ModelWithFieldsOfDifferentTypes>
	{
		private readonly IModelFactory<ModelWithFieldsOfDifferentTypes> factory = 
			new ModelWithFieldsOfDifferentTypesFactory();

		protected override IModelFactory<ModelWithFieldsOfDifferentTypes> Factory
		{
			get { return factory; }
		}
	}

	public class RedisClientHashTestsString
		: RedisClientHashTestsBase<string>
	{
		private readonly IModelFactory<string> factory = new BuiltInsFactory();

		protected override IModelFactory<string> Factory
		{
			get { return factory; }
		}
	}

	public class RedisClientHashTestsShipper
		: RedisClientHashTestsBase<Shipper>
	{
		private readonly IModelFactory<Shipper> factory = new ShipperFactory();

		protected override IModelFactory<Shipper> Factory
		{
			get { return factory; }
		}
	}

	public class RedisClientHashTestsInt
		: RedisClientHashTestsBase<int>
	{
		private readonly IModelFactory<int> factory = new IntFactory();

		protected override IModelFactory<int> Factory
		{
			get { return factory; }
		}
	}

	//public class RedisClientHashTestsDateTime
	//    : RedisClientHashTestsBase<DateTime>
	//{
	//    private readonly IModelFactory<DateTime> factory = new DateTimeFactory();

	//    protected override IModelFactory<DateTime> Factory
	//    {
	//        get { return factory; }
	//    }
	//}

}