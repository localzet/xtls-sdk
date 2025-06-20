// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.7
//   protoc               v5.28.3
// source: app/reverse/config.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from '@bufbuild/protobuf/wire';
import { messageTypeRegistry } from '../../typeRegistry';

export const protobufPackage = 'xray.app.reverse';

export interface Control {
    $type: 'xray.app.reverse.Control';
    state: Control_State;
    random: Uint8Array;
}

export enum Control_State {
    ACTIVE = 0,
    DRAIN = 1,
    UNRECOGNIZED = -1,
}

export function control_StateFromJSON(object: any): Control_State {
    switch (object) {
        case 0:
        case 'ACTIVE':
            return Control_State.ACTIVE;
        case 1:
        case 'DRAIN':
            return Control_State.DRAIN;
        case -1:
        case 'UNRECOGNIZED':
        default:
            return Control_State.UNRECOGNIZED;
    }
}

export function control_StateToJSON(object: Control_State): string {
    switch (object) {
        case Control_State.ACTIVE:
            return 'ACTIVE';
        case Control_State.DRAIN:
            return 'DRAIN';
        case Control_State.UNRECOGNIZED:
        default:
            return 'UNRECOGNIZED';
    }
}

export interface BridgeConfig {
    $type: 'xray.app.reverse.BridgeConfig';
    tag: string;
    domain: string;
}

export interface PortalConfig {
    $type: 'xray.app.reverse.PortalConfig';
    tag: string;
    domain: string;
}

export interface Config {
    $type: 'xray.app.reverse.Config';
    bridgeConfig: BridgeConfig[];
    portalConfig: PortalConfig[];
}

function createBaseControl(): Control {
    return { $type: 'xray.app.reverse.Control', state: 0, random: new Uint8Array(0) };
}

export const Control: MessageFns<Control, 'xray.app.reverse.Control'> = {
    $type: 'xray.app.reverse.Control' as const,

    encode(message: Control, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.state !== 0) {
            writer.uint32(8).int32(message.state);
        }
        if (message.random.length !== 0) {
            writer.uint32(794).bytes(message.random);
        }
        return writer;
    },

    decode(input: BinaryReader | Uint8Array, length?: number): Control {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseControl();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 8) {
                        break;
                    }

                    message.state = reader.int32() as any;
                    continue;
                }
                case 99: {
                    if (tag !== 794) {
                        break;
                    }

                    message.random = reader.bytes();
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

    fromJSON(object: any): Control {
        return {
            $type: Control.$type,
            state: isSet(object.state) ? control_StateFromJSON(object.state) : 0,
            random: isSet(object.random) ? bytesFromBase64(object.random) : new Uint8Array(0),
        };
    },

    toJSON(message: Control): unknown {
        const obj: any = {};
        if (message.state !== 0) {
            obj.state = control_StateToJSON(message.state);
        }
        if (message.random.length !== 0) {
            obj.random = base64FromBytes(message.random);
        }
        return obj;
    },

    create(base?: DeepPartial<Control>): Control {
        return Control.fromPartial(base ?? {});
    },
    fromPartial(object: DeepPartial<Control>): Control {
        const message = createBaseControl();
        message.state = object.state ?? 0;
        message.random = object.random ?? new Uint8Array(0);
        return message;
    },
};

messageTypeRegistry.set(Control.$type, Control);

function createBaseBridgeConfig(): BridgeConfig {
    return { $type: 'xray.app.reverse.BridgeConfig', tag: '', domain: '' };
}

export const BridgeConfig: MessageFns<BridgeConfig, 'xray.app.reverse.BridgeConfig'> = {
    $type: 'xray.app.reverse.BridgeConfig' as const,

    encode(message: BridgeConfig, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.tag !== '') {
            writer.uint32(10).string(message.tag);
        }
        if (message.domain !== '') {
            writer.uint32(18).string(message.domain);
        }
        return writer;
    },

    decode(input: BinaryReader | Uint8Array, length?: number): BridgeConfig {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseBridgeConfig();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }

                    message.tag = reader.string();
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }

                    message.domain = reader.string();
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

    fromJSON(object: any): BridgeConfig {
        return {
            $type: BridgeConfig.$type,
            tag: isSet(object.tag) ? globalThis.String(object.tag) : '',
            domain: isSet(object.domain) ? globalThis.String(object.domain) : '',
        };
    },

    toJSON(message: BridgeConfig): unknown {
        const obj: any = {};
        if (message.tag !== '') {
            obj.tag = message.tag;
        }
        if (message.domain !== '') {
            obj.domain = message.domain;
        }
        return obj;
    },

    create(base?: DeepPartial<BridgeConfig>): BridgeConfig {
        return BridgeConfig.fromPartial(base ?? {});
    },
    fromPartial(object: DeepPartial<BridgeConfig>): BridgeConfig {
        const message = createBaseBridgeConfig();
        message.tag = object.tag ?? '';
        message.domain = object.domain ?? '';
        return message;
    },
};

messageTypeRegistry.set(BridgeConfig.$type, BridgeConfig);

function createBasePortalConfig(): PortalConfig {
    return { $type: 'xray.app.reverse.PortalConfig', tag: '', domain: '' };
}

export const PortalConfig: MessageFns<PortalConfig, 'xray.app.reverse.PortalConfig'> = {
    $type: 'xray.app.reverse.PortalConfig' as const,

    encode(message: PortalConfig, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        if (message.tag !== '') {
            writer.uint32(10).string(message.tag);
        }
        if (message.domain !== '') {
            writer.uint32(18).string(message.domain);
        }
        return writer;
    },

    decode(input: BinaryReader | Uint8Array, length?: number): PortalConfig {
        const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePortalConfig();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }

                    message.tag = reader.string();
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }

                    message.domain = reader.string();
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

    fromJSON(object: any): PortalConfig {
        return {
            $type: PortalConfig.$type,
            tag: isSet(object.tag) ? globalThis.String(object.tag) : '',
            domain: isSet(object.domain) ? globalThis.String(object.domain) : '',
        };
    },

    toJSON(message: PortalConfig): unknown {
        const obj: any = {};
        if (message.tag !== '') {
            obj.tag = message.tag;
        }
        if (message.domain !== '') {
            obj.domain = message.domain;
        }
        return obj;
    },

    create(base?: DeepPartial<PortalConfig>): PortalConfig {
        return PortalConfig.fromPartial(base ?? {});
    },
    fromPartial(object: DeepPartial<PortalConfig>): PortalConfig {
        const message = createBasePortalConfig();
        message.tag = object.tag ?? '';
        message.domain = object.domain ?? '';
        return message;
    },
};

messageTypeRegistry.set(PortalConfig.$type, PortalConfig);

function createBaseConfig(): Config {
    return { $type: 'xray.app.reverse.Config', bridgeConfig: [], portalConfig: [] };
}

export const Config: MessageFns<Config, 'xray.app.reverse.Config'> = {
    $type: 'xray.app.reverse.Config' as const,

    encode(message: Config, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
        for (const v of message.bridgeConfig) {
            BridgeConfig.encode(v!, writer.uint32(10).fork()).join();
        }
        for (const v of message.portalConfig) {
            PortalConfig.encode(v!, writer.uint32(18).fork()).join();
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

                    message.bridgeConfig.push(BridgeConfig.decode(reader, reader.uint32()));
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }

                    message.portalConfig.push(PortalConfig.decode(reader, reader.uint32()));
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
            bridgeConfig: globalThis.Array.isArray(object?.bridgeConfig)
                ? object.bridgeConfig.map((e: any) => BridgeConfig.fromJSON(e))
                : [],
            portalConfig: globalThis.Array.isArray(object?.portalConfig)
                ? object.portalConfig.map((e: any) => PortalConfig.fromJSON(e))
                : [],
        };
    },

    toJSON(message: Config): unknown {
        const obj: any = {};
        if (message.bridgeConfig?.length) {
            obj.bridgeConfig = message.bridgeConfig.map((e) => BridgeConfig.toJSON(e));
        }
        if (message.portalConfig?.length) {
            obj.portalConfig = message.portalConfig.map((e) => PortalConfig.toJSON(e));
        }
        return obj;
    },

    create(base?: DeepPartial<Config>): Config {
        return Config.fromPartial(base ?? {});
    },
    fromPartial(object: DeepPartial<Config>): Config {
        const message = createBaseConfig();
        message.bridgeConfig = object.bridgeConfig?.map((e) => BridgeConfig.fromPartial(e)) || [];
        message.portalConfig = object.portalConfig?.map((e) => PortalConfig.fromPartial(e)) || [];
        return message;
    },
};

messageTypeRegistry.set(Config.$type, Config);

function bytesFromBase64(b64: string): Uint8Array {
    if ((globalThis as any).Buffer) {
        return Uint8Array.from(globalThis.Buffer.from(b64, 'base64'));
    } else {
        const bin = globalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}

function base64FromBytes(arr: Uint8Array): string {
    if ((globalThis as any).Buffer) {
        return globalThis.Buffer.from(arr).toString('base64');
    } else {
        const bin: string[] = [];
        arr.forEach((byte) => {
            bin.push(globalThis.String.fromCharCode(byte));
        });
        return globalThis.btoa(bin.join(''));
    }
}

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
