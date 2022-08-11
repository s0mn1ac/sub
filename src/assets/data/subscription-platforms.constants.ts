/* Models */
import { SubscriptionPlatform } from 'src/app/shared/models/subscription-platform.model';

/* Enums */
import { PlanTypeEnum } from 'src/app/shared/enums/plan-type.enum';

export const SUBSCRIPTION_PLATFORMS: SubscriptionPlatform[] = [
    {
        id: 100000001,
        name: 'netflix',
        logo: 'logo-netflix',
        color: '#E50914',
        textColor: 'white',
        theme: 'red',
        plans: [
            {
                id: 200000001,
                name: 'basic',
                price: 7.99,
                isDefault: true,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000002,
                name: 'standard',
                price: 12.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000003,
                name: 'premium',
                price: 17.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000004,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    {
        id: 100000002,
        name: 'amazonPrime',
        logo: 'logo-amazon-prime',
        color: '#00A8E1',
        textColor: 'white',
        theme: 'cyan',
        plans: [
            {
                id: 200000005,
                name: 'yearly',
                price: 36,
                isDefault: true,
                type: PlanTypeEnum.yearly
            },
            {
                id: 200000006,
                name: 'monthly',
                price: 3.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000007,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    // {
    //     id: 100000003,
    //     name: 'amazonPrime',
    //     logo: 'logo-amazon-prime',
    //     color: '#00A8E1',
    //     textColor: 'white',
    //     theme: 'cyan',
    //     plans: [
    //         {
    //             id: 200000008,
    //             name: 'yearly',
    //             price: 36,
    //             isDefault: true,
    //             type: PlanTypeEnum.yearly
    //         },
    //         {
    //             id: 200000009,
    //             name: 'monthly',
    //             price: 3.99,
    //             isDefault: false,
    //             type: PlanTypeEnum.monthly
    //         },
    //         {
    //             id: 200000010,
    //             name: 'other',
    //             price: 0,
    //             isDefault: false,
    //             type: PlanTypeEnum.monthly
    //         }
    //     ]
    // },
    {
        id: 100000004,
        name: 'hboMax',
        logo: 'logo-hbo-max',
        color: '#490CB0',
        textColor: 'white',
        theme: 'violet',
        plans: [
            {
                id: 200000011,
                name: 'monthly',
                price: 8.99,
                isDefault: true,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000012,
                name: 'yearly',
                price: 69.99,
                isDefault: false,
                type: PlanTypeEnum.yearly
            },
            {
                id: 200000013,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    {
        id: 100000005,
        name: 'disneyPlus',
        logo: 'logo-disney',
        color: '#0063E5',
        textColor: 'white',
        theme: 'blue',
        plans: [
            {
                id: 200000014,
                name: 'monthly',
                price: 8.99,
                isDefault: true,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000015,
                name: 'yearly',
                price: 89.90,
                isDefault: false,
                type: PlanTypeEnum.yearly
            },
            {
                id: 200000016,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    {
        id: 100000006,
        name: 'youtubePremium',
        logo: 'logo-youtube',
        color: '#FF0000',
        textColor: 'white',
        theme: 'red',
        plans: [
            {
                id: 200000017,
                name: 'basic',
                price: 11.99,
                isDefault: true,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000018,
                name: 'family',
                price: 17.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000019,
                name: 'student',
                price: 6.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000020,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    {
        id: 100000007,
        name: 'xboxGamePass',
        logo: 'logo-xbox',
        color: '#FF0000',
        textColor: 'white',
        theme: 'green',
        plans: [
            {
                id: 200000021,
                name: 'pc',
                price: 9.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000022,
                name: 'console',
                price: 9.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000023,
                name: 'ultimate',
                price: 12.99,
                isDefault: true,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000024,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    {
        id: 199999999,
        name: 'other',
        logo: 'card-outline',
        color: '#5260ff',
        textColor: 'white',
        theme: 'violet',
        plans: [
            {
                id: 299999999,
                name: 'other',
                price: 0,
                isDefault: true,
                type: PlanTypeEnum.monthly
            }
        ]
    }
];

export const DEFAULT_SUBSCRIPTION_PLATFORM_ID: number = 199999999;
