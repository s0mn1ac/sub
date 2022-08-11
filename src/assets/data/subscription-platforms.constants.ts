/* Models */
import { SubscriptionPlatform } from 'src/app/shared/models/subscription-platform.model';

/* Enums */
import { PlanTypeEnum } from 'src/app/shared/enums/plan-type.enum';

export const SUBSCRIPTION_PLATFORMS: SubscriptionPlatform[] = [
    {
        id: 100000001,
        name: 'netflix',
        logo: 'logo-netflix',
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
        id: 100000008,
        name: 'appleTvPlus',
        logo: 'logo-apple-tv',
        textColor: 'white',
        theme: 'black',
        plans: [
            {
                id: 200000025,
                name: 'monthly',
                price: 4.99,
                isDefault: true,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000026,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    {
        id: 100000009,
        name: 'appleOne',
        logo: 'logo-apple',
        textColor: 'white',
        theme: 'black',
        plans: [
            {
                id: 200000027,
                name: 'individual',
                price: 14.95,
                isDefault: true,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000028,
                name: 'family',
                price: 19.95,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000029,
                name: 'premium',
                price: 28.95,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000030,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    {
        id: 100000010,
        name: 'crunchyroll',
        logo: 'logo-crunchyroll',
        textColor: 'white',
        theme: 'orange',
        plans: [
            {
                id: 200000031,
                name: 'fan',
                price: 14.95,
                isDefault: true,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000032,
                name: 'megaFanMonthly',
                price: 6.49,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000033,
                name: 'megaFanYearly',
                price: 64.99,
                isDefault: false,
                type: PlanTypeEnum.yearly
            },
            {
                id: 200000034,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    {
        id: 100000011,
        name: 'playstationPlus',
        logo: 'logo-playstation',
        textColor: 'white',
        theme: 'blue',
        plans: [
            {
                id: 200000035,
                name: 'essential',
                price: 8.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000036,
                name: 'extra',
                price: 13.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000037,
                name: 'premium',
                price: 16.99,
                isDefault: true,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000038,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    {
        id: 100000012,
        name: 'nintendoSwitchOnline',
        logo: 'logo-nintendo-switch',
        textColor: 'white',
        theme: 'red',
        plans: [
            {
                id: 200000039,
                name: 'individual',
                price: 19.99,
                isDefault: true,
                type: PlanTypeEnum.yearly
            },
            {
                id: 200000040,
                name: 'expansionPackIndividual',
                price: 39.99,
                isDefault: false,
                type: PlanTypeEnum.yearly
            },
            {
                id: 200000041,
                name: 'family',
                price: 34.99,
                isDefault: true,
                type: PlanTypeEnum.yearly
            },
            {
                id: 200000042,
                name: 'expansionPackFamily',
                price: 69.99,
                isDefault: true,
                type: PlanTypeEnum.yearly
            },
            {
                id: 200000043,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    {
        id: 100000013,
        name: 'appleFitnessPlus',
        logo: 'logo-apple-fitness',
        textColor: 'white',
        theme: 'green',
        plans: [
            {
                id: 200000044,
                name: 'monthly',
                price: 9.99,
                isDefault: true,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000045,
                name: 'yearly',
                price: 79.99,
                isDefault: false,
                type: PlanTypeEnum.yearly
            },
            {
                id: 200000046,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    {
        id: 100000014,
        name: 'iCloudPlus',
        logo: 'logo-icloud',
        textColor: 'white',
        theme: 'blue',
        plans: [
            {
                id: 200000047,
                name: '50GB',
                price: 0.99,
                isDefault: true,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000048,
                name: '200GB',
                price: 2.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000049,
                name: '2TB',
                price: 9.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000050,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    {
        id: 100000015,
        name: 'appleMusic',
        logo: 'logo-apple-music',
        textColor: 'white',
        theme: 'red',
        plans: [
            {
                id: 200000051,
                name: 'voice',
                price: 4.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000052,
                name: 'student',
                price: 5.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000053,
                name: 'individual',
                price: 9.99,
                isDefault: true,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000054,
                name: 'family',
                price: 14.99,
                isDefault: false,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000055,
                name: 'other',
                price: 0,
                isDefault: false,
                type: PlanTypeEnum.monthly
            }
        ]
    },
    {
        id: 100000016,
        name: 'appleArcade',
        logo: 'logo-apple-arcade',
        textColor: 'white',
        theme: 'orange',
        plans: [
            {
                id: 200000056,
                name: 'monthly',
                price: 4.99,
                isDefault: true,
                type: PlanTypeEnum.monthly
            },
            {
                id: 200000057,
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
