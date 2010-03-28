//
// http://code.google.com/p/servicestack/wiki/ServiceStackRedis
// ServiceStack.Redis: ECMA CLI Binding to the Redis key-value storage system
//
// Authors:
//   Demis Bellot (demis.bellot@gmail.com)
//
// Copyright 2010 Liquidbit Ltd.
//
// Licensed under the same terms of Redis and ServiceStack: new BSD license.
//

using System.Collections.Generic;
using System.Linq;
using ServiceStack.DesignPatterns.Model;

namespace ServiceStack.Redis
{
	public partial class RedisClient 
		: IRedisClient
	{
		public IHasNamed<IRedisHash> Hashes { get; set; }

		internal class RedisClientHashes
			: IHasNamed<IRedisHash>
		{
			private readonly RedisClient client;

			public RedisClientHashes(RedisClient client)
			{
				this.client = client;
			}

			public IRedisHash this[string hashId]
			{
				get
				{
					return new RedisClientHash(client, hashId);
				}
				set
				{
					var hash = this[hashId];
					hash.Clear();
					hash.CopyTo(value.ToArray(), 0);
				}
			}
		}

		public bool SetItemInHash(string hashId, string key, string value)
		{
			return base.HSet(hashId, key, value.ToUtf8Bytes()) == Success;
		}

		public string GetItemFromHash(string hashId, string key)
		{
			return base.HGet(hashId, key).FromUtf8Bytes();
		}

		public bool HashContainsKey(string hashId, string key)
		{
			return base.HExists(hashId, key);
		}

		public bool RemoveFromHash(string hashId, string key)
		{
			return base.HDel(hashId, key) == Success;
		}

		public int GetHashCount(string hashId)
		{
			return base.HLen(hashId);
		}

		public List<string> GetHashKeys(string hashId)
		{
			var multiDataList = base.HKeys(hashId);
			return multiDataList.ToStringList();
		}

		public List<string> GetHashValues(string hashId)
		{
			var multiDataList = base.HValues(hashId);
			return multiDataList.ToStringList();
		}

		public Dictionary<string, string> GetAllFromHash(string hashId)
		{
			var multiDataList = base.HGetAll(hashId);
			var map = new Dictionary<string, string>();

			for (var i = 0; i < multiDataList.Length; i += 2)
			{
				var key = multiDataList[i].FromUtf8Bytes();
				map[key] = multiDataList[i + 1].FromUtf8Bytes();
			}

			return map;
		}
	}
}