export type dataHubType = {
  panelView: panelViewType;
  products: productsType[];
  placeOrders: placeOrderType[];
  users: userTypes[];
};

export type panelViewType = {
  sidebarElements: sidebarElementsType[];
  forms: formsType;
};

export type sidebarElementsType = {
  ul: string;
  icons: string;
  li: string[];
};

export type formsType = {
  product: formDataType[];
  order: formDataType[];
};

export type formDataType = {
  name: string;
  type: string;
  data?: string[];
  required?: boolean;
};

export type productsType = {
  Name: string;
  Description: string;
  Price: number;
  Tags: string;
  Stocks: number;
};

export type placeOrderType = {
  Customer_Name: string;
  Customer_Address: string;
  Zip: string;
  Product: string;
  Quantity: number;
};

export type userTypes = {
  userId: string;
  name: string;
  email: string;
  password: string;
};
