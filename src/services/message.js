import { messageRepository } from '../repositories';
import { toCursorHash } from '../utils/cursorHash';
import pubSub, { EVENTS } from '../subscription';

const getMessages = async ({ cursor, limit }) => {
  const result = await messageRepository
    .getMessages({ cursor, limit });

  const { rows: messages, count } = result;
  const endCursor = toCursorHash(
    messages[messages.length-1].created_at.toString(),
  );
  const hasNextPage = count > limit;

  return { edges: messages, pageInfo: { hasNextPage, endCursor } };
};

const createMessage = async payload => {
  const message = await messageRepository
    .createMessage(payload);

  pubSub.publish(EVENTS.MESSAGE.CREATED, {
    messageCreated: { message },
  });

  return message;
};

export default { getMessages, createMessage };
