import cap1 from "../assets/Students/CW1.png"
import cap2 from "../assets/Students/CW2.png"
import cap3 from "../assets/Students/CW3.png"

// import hoodie1 from "../assets/Students/HW1.png"
// import hoodie2 from "../assets/Students/HW2.png"
// import hoodie3 from "../assets/Students/HW3.png"

import tshirt1 from "../assets/Students/TB1.png"
import tshirt2 from "../assets/Students/TB2.png"
import tshirt4 from "../assets/Students/TW1.png"
import tshirt3 from "../assets/Students/TW2.png"


var Items =
{
    Tshirts: [
        {
            id: 1101,
            images: [tshirt1],
            name: "Tshirt - Regular (Black)",
            price: 499,
            description: "Regular Fit | Cotton | Machine Wash | Black",
            stock: 10,
            quantity: 1,


        },
        {
            id: 1102,
            images: [tshirt2],
            name: "Tshirt - Regular (Black)",
            price: 499,
            description: "Regular Fit | Cotton | Machine Wash | Black",
            stock: 10,
            quantity: 1,


        },
        {
            id: 1103,
            images: [tshirt3],
            name: "Tshirt - Regular (White)",
            price: 499,
            description: "Regular Fit | Cotton | Machine Wash | White",
            stock: 10,
            quantity: 1,


        },
        {
            id: 1104,
            images: [tshirt4],
            name: "Tshirt - Regular (White)",
            price: 499,
            description: "Regular Fit | Cotton | Machine Wash | White",
            stock: 10,
            quantity: 1,


        },


    ],
    // Hoodies: [
    //     {
    //         id: 1201,
    //         images: [hoodie1],
    //         name: "Hoodie 1",
    //         price: 500,
    //         description: "lorem ipsum dolor sit amet, consectetur adipiscing elit in, sed diam nonumy eirm elementum et dolor",
    //         stock: 10,
    // quantity:1,


    //     },
    //     {
    //         id: 1202,
    //         images: [hoodie2],
    //         name: "Hoodie 2",
    //         price: 500,
    //         description: "lorem ipsum dolor sit amet, consectetur adipiscing elit in, sed diam nonumy eirm elementum et dolor",
    //         stock: 10,
    // quantity:1,


    //     },
    //     {
    //         id: 1203,
    //         images: [hoodie3],
    //         name: "Hoodie 3",
    //         price: 500,
    //         description: "lorem ipsum dolor sit amet, consectetur adipiscing elit in, sed diam nonumy eirm elementum et dolor",
    //         stock: 10,
    // quantity:1,


    //     },
    // ],
    Caps: [
        {
            id: 1301,
            images: [cap1],
            name: "Cap - Basic",
            price: 199,
            description: "Fit for all size | Cotton | White | Machine Wash",
            stock: 10,
            quantity: 1,


        },
        {
            id: 1302,
            images: [cap2],
            name: "Cap - Regular",
            price: 199,
            description: "Fit for all size | Cotton | White | Machine Wash",
            stock: 10,
            quantity: 1,


        },
        {
            id: 1303,
            images: [cap3],
            name: "Cap - Regular",
            price: 199,
            description: "Fit for all size | Cotton | White | Machine Wash",
            stock: 10,
            quantity: 1,


        },
    ],
    Combos: [
        {
            id: 1403,
            images: [tshirt3, cap1],
            name: "Combo (Tshirt + Cap)",
            price: 649,
            description: "Best Fit | Cotton | White | Machine Wash | Discounted Price",
            stock: 10,
            quantity: 1,

        },

    ],

};

export default Items;