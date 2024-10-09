//Sidebar Imports to display yhe icons
import {
  UilEstate,
  // UilClipboardAlt,
  // UilDiary,
  UilShoppingBag,
  UilChat,
  UilUsdSquare,
  UilEnvelope,
} from "@iconscout/react-unicons";

import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    path: "/",
  },
  // {
  //   icon: UilClipboardAlt,
  //   heading: "Envíos",
  //   path: "/appordenes",
  // },
  // {
  //   icon: UilDiary,
  //   heading: "Historial de ventas",
  //   path: "/appventas",
  // },
  {
    icon: UilEnvelope,
    heading: "Productos",
    path: "/viewproducts",
  },
  {
    icon: UilShoppingBag,
    heading: "Nuevo Producto",
    path: "/newprodcut",
  },
  {
    icon: UilShoppingBag,
    heading: "Editar Producto",
    path: "/editproduct",
  },
  {
    icon: UilEnvelope,
    heading: "Posts",
    path: "/viewposts",
  },
  {
    icon: UilChat,
    heading: "Nuevo Posts",
    path: "/newpost",
  },
  {
    icon: UilChat,
    heading: "Editar Posts",
    path: "/editposts",
  },
];

export const CardsData = [
  {
    title: "Ventas",
    color: {
      backGround: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
      boxShadow: "0 10px 20px 0px #f6d365",
    },
    barValue: 70,
    value: "70,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Ventas",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
  },

  {
    title: "Ordenes",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #f5576c 100%)",
      boxShadow: "0 10px 20px 0px #e0c6f5",
    },
    barValue: 30,
    value: "30,970",
    png: UilShoppingBag,
    series: [
      {
        name: "Productos",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
  },

  {
    title: "Comunidades",
    color: {
      backGround: "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
      boxShadow: "0 10px 20px 0px #b490ca",
    },
    barValue: 50,
    value: "50,970",
    png: UilChat,
    series: [
      {
        name: "Comunidades",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
