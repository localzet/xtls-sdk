import { MessageFns, TypedMessage } from '../../../xray-protos/common/serial/typed_message';

function createTypedMessage<T extends MessageFns<unknown, string>>(
    proto: T,
    data: Parameters<T['create']>[0],
): TypedMessage {
    return TypedMessage.create({
        type: proto.$type,
        value: proto.encode(proto.create(data)).finish(),
    });
}

export default createTypedMessage;
