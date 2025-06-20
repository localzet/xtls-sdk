import { Channel, createClient } from 'nice-grpc';
import { RoutingServiceClient, RoutingServiceDefinition } from '../xray-protos/app/router/command/command';
import createTypedMessage from '../common/utils/create-typed-message/create-typed-message';
import { ISdkResponse } from '../common/types/sdk-response';
import { CIDR, Config, GeoIP } from '../xray-protos/app/router/config';
import { IAddSourceIpRule, IRemoveRuleByRuleTag } from './interfaces';
import { AddSourceIpRuleResponseModel } from './models';
import { ROUTER_ERRORS } from '../common/errors/router/router.errors';
import { RemoveRuleByRuleTagResponseModel } from './models/remove-rule-by-rule-tag';
import ipaddr from 'ipaddr.js';

/**
 * Service for managing routing rules in XRAY/XTLS
 * RoutingService is required (enable on XRay Config) to add/remove routing rules.
 */
export class RouterService {
    private readonly client: RoutingServiceClient;

    /**
     * Creates an instance of RouterService
     * @param channel - The gRPC channel to use for communication
     */
    constructor(private readonly channel: Channel) {
        this.client = createClient(RoutingServiceDefinition, channel);
    }

    /**
     * Adds a new routing rule based on source IP address
     * @param dto - Data transfer object containing rule configuration
     * @param dto.ruleTag - Unique identifier for the rule
     * @param dto.outbound - Outbound tag to route matched traffic
     * @param dto.ip - Source IP address to match
     * @param dto.append - Whether to append the rule or replace existing rules
     * @returns Promise resolving to response indicating success or failure
     */
    public async addSrcIpRule(
        dto: IAddSourceIpRule,
    ): Promise<ISdkResponse<AddSourceIpRuleResponseModel>> {
        try {
            const ip = ipaddr.parse(dto.ip);
            const prefix = ip.kind() === 'ipv6' ? 128 : 32;

            await this.client.addRule({
                config: createTypedMessage(Config, {
                    rule: [
                        {
                            ruleTag: dto.ruleTag,
                            tag: dto.outbound,
                            sourceGeoip: [
                                GeoIP.fromPartial({
                                    cidr: [
                                        CIDR.fromPartial({
                                            ip: new Uint8Array(ip.toByteArray()),
                                            prefix,
                                        }),
                                    ],
                                }),
                            ],
                        },
                    ],
                }),
                shouldAppend: dto.append,
            });

            return {
                isOk: true,
                data: new AddSourceIpRuleResponseModel(true),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                isOk: false,
                ...ROUTER_ERRORS.ADD_SOURCE_IP_RULE_ERROR(message),
            };
        }
    }

    /**
     * Removes a routing rule by its tag
     * @param dto - Data transfer object containing rule tag
     * @param dto.ruleTag - Tag of the rule to remove
     * @returns Promise resolving to response indicating success or failure
     */
    public async removeRuleByRuleTag(
        dto: IRemoveRuleByRuleTag,
    ): Promise<ISdkResponse<RemoveRuleByRuleTagResponseModel>> {
        try {
            await this.client.removeRule({
                ruleTag: dto.ruleTag,
            });

            return {
                isOk: true,
                data: new RemoveRuleByRuleTagResponseModel(true),
            };
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            return {
                isOk: false,
                ...ROUTER_ERRORS.REMOVE_RULE_BY_RULE_TAG_ERROR(message),
            };
        }
    }
}
