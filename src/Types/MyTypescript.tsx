import React from "react"

export type MyState = {
    products: {
        Name: string,
        Description: string,
        Price: string,
        Tags: string,
        Stocks: string
    }[]
    placeOrder: {
        Customer_Name: string,
        Customer_Address: string,
        Zip: string,
        Product: string,
        Quantity: string
    }[]
    settings: {
        Default_Price: string,
        Default_Stocks: string,
        Default_zip_code: string,
        Default_Title: string
    }

}

export type MyPlaceOrder = {
    Customer_Name: string,
    Customer_Address: string,
    Zip?: string,
    Product: string,
    Quantity: string
}

export type MyProducts = {
    Name: string,
    Description: string,
    Price?: string,
    Tags: string,
    Stocks?: string
}

export type Mysettings = {
    Default_Price: string,
    Default_Stocks: string,
    Default_zip_code: string,
    Default_Title: string
}

export type MyListProducts = {
    table: Mysettings | MyProducts[] | MyPlaceOrder[]
    state: MyState
    objKey: 'products' | 'placeOrder' | 'settings'
    setState: React.Dispatch<React.SetStateAction<MyState>>
}