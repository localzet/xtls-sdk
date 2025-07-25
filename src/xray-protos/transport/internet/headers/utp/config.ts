// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.7
//   protoc               v5.28.3
// source: transport/internet/headers/utp/config.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from '@bufbuild/protobuf/wire';
import { messageTypeRegistry } from '../../../../typeRegistry';

export const protobufPackage = 'xray.transport.internet.headers.utp';

export interface Config {
    $type: 'xray.transport.internet.headers.utp.Config';
    version: number;
}

function createBaseConfig(): Config {
    return { $type: 'xray.transport.internet.headers.utp.Config', version: 0 };
}

export const Config: MessageFns<Config, 'xray.transport.internet.headers.utp.Config'> = {
    $type: 'xray.transport.internet.headers.utp.Config' as const,

    encode(message: Config, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.version !== 0) {
            writer.uint32(8).uint32(message.version);
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
                    if (tag !== 8) {
                        break;
                    }

                    message.version = reader.uint32();
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
        return { $type: Config.$type, version: isSet(object.version) ? globalThis.Number(object.version) : 0 };
    },

    toJSON(message: Config): unknown {
        const obj: any = {};
        if (message.version !== 0) {
            obj.version = Math.round(message.version);
        }
        return obj;
    },

    create(base?: DeepPartial<Config>): Config {
        return Config.fromPartial(base ?? {});
    },
    fromPartial(object: DeepPartial<Config>): Config {
        const message = createBaseConfig();
        message.version = object.version ?? 0;
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
