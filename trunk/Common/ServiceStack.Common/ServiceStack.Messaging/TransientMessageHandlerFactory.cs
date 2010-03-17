using System;

namespace ServiceStack.Messaging
{
	internal class TransientMessageHandlerFactory<T>
		: IMessageHandlerFactory
	{
		private readonly TransientMessageServiceBase messageService;
		private readonly Action<IMessage<T>> processMessageFn;
		private readonly Action<Exception> processExceptionFn;

		public TransientMessageHandlerFactory(TransientMessageServiceBase messageService, Action<IMessage<T>> processMessageFn)
			: this(messageService, processMessageFn, null)
		{
		}

		public TransientMessageHandlerFactory(TransientMessageServiceBase messageService, Action<IMessage<T>> processMessageFn, Action<Exception> processExceptionEx)
		{
			if (messageService == null)
				throw new ArgumentNullException("messageService");

			if (processMessageFn == null)
				throw new ArgumentNullException("processMessageFn");

			this.messageService = messageService;
			this.processMessageFn = processMessageFn;
			this.processExceptionFn = processExceptionEx;
		}

		public IMessageHandler CreateMessageHandler()
		{
			return new TransientMessageHandler<T>(messageService, processMessageFn, processExceptionFn);
		}
	}
}