import cap1 from "../assets/Alumni/CW1.png"
import cap2 from "../assets/Alumni/CW2.png"

import hoodie1 from "../assets/Alumni/HB.png"
import hoodie2 from "../assets/Alumni/HB1.png"
import hoodie3 from "../assets/Alumni/HB2.png"
import hoodie4 from "../assets/Alumni/HW1.png"
import hoodie5 from "../assets/Alumni/HW2.png"

import tshirt1 from "../assets/Alumni/TB1.png"
import tshirt2 from "../assets/Alumni/TB2.png"
import tshirt3 from "../assets/Alumni/TB3.png"
import tshirt4 from "../assets/Alumni/TW1.png"
import tshirt5 from "../assets/Alumni/TW2.png"
import tshirt6 from "../assets/Alumni/TW3.png"
import tshirt7 from "../assets/Alumni/TB4.png"
import tshirt8 from "../assets/Alumni/TW4.png"


var Items =
{
    Tshirts: [
        {
            id: 2101,
            images: [tshirt1],
            name: "Tshirt - Premium (Black)",
            price: 699,
            description: "Regular Fit | Cotton | Machine Wash | Black",
            stock: 10,
            quantity: 1,

        },
        {
            id: 2102,
            images: [tshirt2],
            name: "Tshirt - Regular (Black)",
            price: 649,
            description: "Regular Fit | Cotton | Machine Wash | Black",
            stock: 10,
            quantity: 1,


        },
        {
            id: 2103,
            images: [tshirt3],
            name: "Tshirt - Basic (Black)",
            price: 599,
            description: "Regular Fit | Cotton | Machine Wash | Black",
            stock: 10,
            quantity: 1,


        },
        {
            id: 2104,
            images: [tshirt4],
            name: "Tshirt - Regular (White)",
            price: 649,
            description: "Regular Fit | Cotton | Machine Wash | White",
            stock: 10,
            quantity: 1,


        },
        {
            id: 2105,
            images: [tshirt5],
            name: "Tshirt - Premium (White)",
            price: 699,
            description: "Regular Fit | Cotton | Machine Wash | White",
            stock: 10,
            quantity: 1,


        },
        {
            id: 2106,
            images: [tshirt6],
            name: "Tshirt - Basic (White)",
            price: 599,
            description: "Regular Fit | Cotton | Machine Wash | White",
            stock: 10,
            quantity: 1,

        },
        {
            id: 2107,
            images: [tshirt7],
            name: "Tshirt - Custom (Black)",
            price: 699,
            description: "Regular Fit | Cotton | Machine Wash | White",
            stock: 10,
            quantity: 1,

        },
        {
            id: 2108,
            images: [tshirt8],
            name: "Tshirt - Custom (White)",
            price: 699,
            description: "Regular Fit | Cotton | Machine Wash | White",
            stock: 10,
            quantity: 1,

        },


    ],
    Hoodies: [
        {
            id: 2201,
            images: [hoodie1],
            name: "Hoodie - Alumni Block",
            price: 999,
            description: "Regular Fit | Cotton | Machine Wash | Black",
            stock: 10,
            quantity: 1,


        },
        {
            id: 2202,
            images: [hoodie2],
            name: "Hoodie - Alumni",
            price: 949,
            description: "Regular Fit | Cotton | Machine Wash | Black",
            stock: 10,
            quantity: 1,


        },
        {
            id: 2203,
            images: [hoodie3],
            name: "Hoodie - Plain",
            price: 899,
            description: "Regular Fit | Cotton | Machine Wash | Black",
            stock: 10,
            quantity: 1,


        },
        {
            id: 2204,
            images: [hoodie4],
            name: "Hoodie - Alumni",
            price: 949,
            description: "Regular Fit | Cotton | Machine Wash | White",
            stock: 10,
            quantity: 1,


        },
        {
            id: 2205,
            images: [hoodie5],
            name: "Hoodie - Alumni Block",
            price: 999,
            description: "Regular Fit | Cotton | Machine Wash | White",
            stock: 10,
            quantity: 1,


        },
    ],
    Caps: [
        {
            id: 2301,
            images: [cap1],
            name: "Cap - Basic",
            price: 199,
            description: "Fit for all size | Cotton | White | Machine Wash",
            stock: 10,
            quantity: 1,


        },
        {
            id: 2302,
            images: [cap2],
            name: "Cap - Regular",
            price: 199,
            description: "Fit for all size | Cotton | White | Machine Wash",
            stock: 10,
            quantity: 1,


        },

    ],
    Combos: [
        {
            id: 2401,
            images: [tshirt1, hoodie1],
            name: "Combo (Tshirt + Hoodie)",
            price: 1499,
            description: "Regular Fit | Cotton | Machine Wash | Discounted Price",
            stock: 10,
            quantity: 1,



        },
        {
            id: 2402,
            images: [hoodie1, cap1],
            name: "Combo (Cap + Hoodie)",
            price: 1099,
            description: "Regular Fit | Cotton | Machine Wash | Discounted Price",
            stock: 10,
            quantity: 1,


        },
        {
            id: 2403,
            images: [tshirt3, cap1],
            name: "Combo (Tshirt + Cap)",
            price: 799,
            description: "Regular Fit | Cotton | Machine Wash | Discounted Price",
            stock: 10,
            quantity: 1,

        },

    ],

};

export default Items;