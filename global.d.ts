declare namespace NSCompute {

    type Zone = {
        zoneName: string,
        zoneState: {
            available: boolean
        }
    }

    type Instance = {
        id: string,
        name: string,
        status: string,
    }

    type InstanceDetail = {

        addresses: {
            macAddress: string,
            ipAddress: string,
            version: number,
            floatingIpAddress: string
        }[],
        availabilityZone: string,
        flavor: {
            id: string,
            name: string,
            cpu: number,
            ram: number,
        },
        status: string,
        id: string,
        name: string,
        image: string,
        metadata: {
            [key: string]: string,
        },
        keyName: string,
        volumes: {
            root: {
                size: number,
                type: string,
            },
            attachments: {
                id: string,
                name: string,
                size: number,
                type: string,
            }[]
        },
        securityGroups: {
            name: string,
        }[],
        launchedAt: string,
        createdAt: string,
        updatedAt: string,
    };

    type InstanceCreate = {
        name: string,
        image: string,
        flavor: string,
        networks?: {
            id: string
            subnetId: string
        }[],
        availabilityZone: string,
        keyName: string,
        count: number,
        volume: {
            size: number,
            type: string,
        },
        securityGroups: {
            name: string
        }[]
    }

}

declare namespace NSNetwork {

    type SecurityGroupRule = {
        direction: string,
        ethertype: string,
        id: string,
        portRangeMax?: number,
        portRangeMin?: number,
        protocol?: string,
        remoteGroupId?: string,
        remoteIpPrefix?: string,
        securityGroupId: string,
        description: string
    }

    type SecurityGroup = {
        description: string,
        id: string,
        name: string,
        securityGroupRules: SecurityGroupRule[]
    }

}