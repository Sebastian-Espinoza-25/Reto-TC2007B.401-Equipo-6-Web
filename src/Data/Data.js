//Sidebar Imports to display yhe icons

import {
    UilEstate,
    UilClipboardAlt,
    UilDiary,
    UilShoppingBag,
    UilChat,
    UilUsdSquare,
} from '@iconscout/react-unicons'

export const SidebarData = [
    {
        icon : UilEstate,
        heading : 'Dashboard',
    },
    {
        icon : UilClipboardAlt,
        heading : 'Ordenes',
    },
    {
        icon : UilDiary,
        heading : 'Historial de ventas',
    },
    {
        icon : UilShoppingBag,
        heading : 'Productos',
    },
    {
        icon : UilChat,
        heading : 'Comunidades',
    }
];


export const CardsData = [
    {
        title: 'Ventas',
        color: {
            backGround: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
            boxShadow: "0 10px 20px 0px #f6d365",
        },
        barValue: 70,
        value: "70,970",
        png: UilUsdSquare,
        series: [
            {
                name: 'Ventas',
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            },
        ],
    },

    {
        title: 'Ordenes',
        color: {
            backGround: "linear-gradient(180deg, #bb67ff 0%, #f5576c 100%)",
            boxShadow: "0 10px 20px 0px #e0c6f5",
        },
        barValue: 30,
        value: "30,970",
        png: UilShoppingBag,
        series: [
            {
                name: 'Productos',
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            },
        ],
    },

    {
        title: 'Comunidades',
        color: {
            backGround: "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
            boxShadow: "0 10px 20px 0px #b490ca",
        },
        barValue: 50,
        value: "50,970",
        png: UilChat,
        series: [
            {
                name: 'Comunidades',
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            },
        ],
    },
];