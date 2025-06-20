// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.7
//   protoc               v5.28.3
// source: transport/internet/grpc/config.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from '@bufbuild/protobuf/wire';
import { messageTypeRegistry } from '../../../typeRegistry';

export const protobufPackage = 'xray.transport.internet.grpc.encoding';

export interface Config {
    $type: 'xray.transport.internet.grpc.encoding.Config';
    authority: string;
    serviceName: string;
    multiMode: boolean;
    idleTimeout: number;
    healthCheckTimeout: number;
    permitWithoutStream: boolean;
    initialWindowsSize: number;
    userAgent: string;
}

function createBaseConfig(): Config {
    return {
        $type: 'xray.transport.internet.grpc.encoding.Config',
        authority: '',
        serviceName: '',
        multiMode: false,
        idleTimeout: 0,
        healthCheckTimeout: 0,
        permitWithoutStream: false,
        initialWindowsSize: 0,
        userAgent: '',
    };
}

export const Config: MessageFns<Config, 'xray.transport.internet.grpc.encoding.Config'> = {
    $type: 'xray.transport.internet.grpc.encoding.Config' as const,

    encode(message: Config, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.authority !== '') {
            writer.uint32(10).string(message.authority);
        }
        if (message.serviceName !== '') {
            writer.uint32(18).string(message.serviceName);
        }
        if (message.multiMode !== false) {
            writer.uint32(24).bool(message.multiMode);
        }
        if (message.idleTimeout !== 0) {
            writer.uint32(32).int32(message.idleTimeout);
        }
        if (message.healthCheckTimeout !== 0) {
            writer.uint32(40).int32(message.healthCheckTimeout);
        }
        if (message.permitWithoutStream !== false) {
            writer.uint32(48).bool(message.permitWithoutStream);
        }
        if (message.initialWindowsSize !== 0) {
            writer.uint32(56).int32(message.initialWindowsSize);
        }
        if (message.userAgent !== '') {
            writer.uint32(66).string(message.userAgent);
        }
        return writer;
    },

    decode(input: BinaryReader | Uint8Array, length?: number): Config {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseConfig();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }

                    message.authority = reader.string();
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }

                    message.serviceName = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 24) {
                        break;
                    }

                    message.multiMode = reader.bool();
                    continue;
                }
                case 4: {
                    if (tag !== 32) {
                        break;
                    }

                    message.idleTimeout = reader.int32();
                    continue;
                }
                case 5: {
                    if (tag !== 40) {
                        break;
                    }

                    message.healthCheckTimeout = reader.int32();
                    continue;
                }
                case 6: {
                    if (tag !== 48) {
                        break;
                    }

                    message.permitWithoutStream = reader.bool();
                    continue;
                }
                case 7: {
                    if (tag !== 56) {
                        break;
                    }

                    message.initialWindowsSize = reader.int32();
                    continue;
                }
                case 8: {
                    if (tag !== 66) {
                        break;
                    }

                    message.userAgent = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },

    fromJSON(object: any): Config {
        return {
            $type: Config.$type,
            authority: isSet(object.authority) ? globalThis.String(object.authority) : '',
            serviceName: isSet(object.serviceName) ? globalThis.String(object.serviceName) : '',
            multiMode: isSet(object.multiMode) ? globalThis.Boolean(object.multiMode) : false,
            idleTimeout: isSet(object.idleTimeout) ? globalThis.Number(object.idleTimeout) : 0,
            healthCheckTimeout: isSet(object.healthCheckTimeout) ? globalThis.Number(object.healthCheckTimeout) : 0,
            permitWithoutStream: isSet(object.permitWithoutStream) ? globalThis.Boolean(object.permitWithoutStream) : false,
            initialWindowsSize: isSet(object.initialWindowsSize) ? globalThis.Number(object.initialWindowsSize) : 0,
            userAgent: isSet(object.userAgent) ? globalThis.String(object.userAgent) : '',
        };
    },

    toJSON(message: Config): unknown {
        const obj: any = {};
        if (message.authority !== '') {
            obj.authority = message.authority;
        }
        if (message.serviceName !== '') {
            obj.serviceName = message.serviceName;
        }
        if (message.multiMode !== false) {
            obj.multiMode = message.multiMode;
        }
        if (message.idleTimeout !== 0) {
            obj.idleTimeout = Math.round(message.idleTimeout);
        }
        if (message.healthCheckTimeout !== 0) {
            obj.healthCheckTimeout = Math.round(message.healthCheckTimeout);
        }
        if (message.permitWithoutStream !== false) {
            obj.permitWithoutStream = message.permitWithoutStream;
        }
        if (message.initialWindowsSize !== 0) {
            obj.initialWindowsSize = Math.round(message.initialWindowsSize);
        }
        if (message.userAgent !== '') {
            obj.userAgent = message.userAgent;
        }
        return obj;
    },

    create(base?: DeepPartial<Config>): Config {
        return Config.fromPartial(base ?? {});
    },
    fromPartial(object: DeepPartial<Config>): Config {
        const message = createBaseConfig();
        message.authority = object.authority ?? '';
        message.serviceName = object.serviceName ?? '';
        message.multiMode = object.multiMode ?? false;
        message.idleTimeout = object.idleTimeout ?? 0;
        message.healthCheckTimeout = object.healthCheckTimeout ?? 0;
        message.permitWithoutStream = object.permitWithoutStream ?? false;
        message.initialWindowsSize = object.initialWindowsSize ?? 0;
        message.userAgent = object.userAgent ?? '';
        return message;
    },
};

messageTypeRegistry.set(Config.$type, Config);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
    : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
        : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
            : T extends {} ? { [K in Exclude<keyof T, '$type'>]?: DeepPartial<T[K]> }
                : Partial<T>;

function isSet(value: any): boolean {
    return value !== null && value !== undefined;
}

export interface MessageFns<T, V extends string> {
    readonly $type: V;

    encode(message: T, writer?: BinaryWriter): BinaryWriter;

    decode(input: BinaryReader | Uint8Array, length?: number): T;

    fromJSON(object: any): T;

    toJSON(message: T): unknown;

    create(base?: DeepPartial<T>): T;

    fromPartial(object: DeepPartial<T>): T;
}
