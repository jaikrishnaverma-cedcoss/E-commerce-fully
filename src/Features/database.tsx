import { dataHubType } from "../Types/types";

export const initialState:dataHubType = {
  panelView: {
    // var name database
    sidebarElements: [
      {
        ul: "Add Product",
        icons: "bi bi-menu-button-wide",
        li: ["Alerts", "Accordian", "Badges", "Buttons", "Cards"],
      },
      {
        ul: "List Products",
        icons: "bi bi-menu-button-wide",
        li: ["Alerts", "Accordian", "Badges", "Buttons", "Cards"],
      },
      {
        ul: "Place Order",
        icons: "bi bi-journal-text",
        li: ["Alerts", "Accordian", "Badges", "Buttons", "Cards"],
      },
      {
        ul: "List Order",
        icons: "bi bi-menu-button-wide",
        li: ["Alerts", "Accordian", "Badges", "Buttons", "Cards"],
      },
      {
        ul: "Add Setting",
        icons: "bi bi-bar-chart",
        li: ["Alerts", "Accordian", "Badges", "Buttons", "Cards"],
      },
      {
        ul: "List Setting",
        icons: "bi bi-menu-button-wide",
        li: ["Alerts", "Accordian", "Badges", "Buttons", "Cards"],
      },
    ],
    forms: {
      product: [
        { name: "Name", type: "text", required: true },
        { name: "Description", type: "textarea", required: true },
        { name: "Price", type: "number" },
        { name: "Tags", type: "text", required: true },
        { name: "Stocks", type: "text" },
      ],
      order: [
        { name: "Customer_Name", type: "text", required: true },
        { name: "Customer_Address", type: "textarea", required: true },
        { name: "Zip", type: "number", required: false },
        { name: "Product", type: "select", data: [], required: true },
        { name: "Quantity", type: "number", required: true },
      ]
    },
  },

  products: [
    {
      Name: "6565 | 65656",
      Description: "656",
      Price: 565,
      Tags: "65656",
      Stocks: 565,
    },
  ],
  placeOrders: [
    {
      Customer_Name: "4564654",
      Customer_Address: "64564565466",
      Zip: "546543",
      Product: "6565",
      Quantity: 5465,
    },
  ],
  users:[
  {  
    userId: '1',
    name: 'jai verma',
    email: 'jai@gmail.com',
    password: '2222'
  }
  ]

};
