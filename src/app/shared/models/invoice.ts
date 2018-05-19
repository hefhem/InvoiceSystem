export class Invoice {
    invoiceID = 0;
    invoiceNumber: string;
    invoiceDate: string;
    customerName: string;
    invoiceTotal = 0;
    schoolTermID: number;
    schoolSessionID: number;
    studentClassID: number;
    discount = 0;
    status: string;
    invoiceTotalBeforeDiscount = 0;
    createdByID: number;
}

export class InvoiceDetail {
    invoiceID: number;
    itemID: number;
    itemName: string;
    Qty: number;
    unitPrice: number;
    lineTotal = 0;
    createdByID: number;
}

export class PriceList {
    priceID = 0;
    priceDesc = '';
    schoolSessionID = '';
    studentClassID = '';
    schoolTermID = '';
    itemID = '';
    unitPrice = 0;
    createdByID: number;
  }

  export class Item {
      itemID = 0;
      itemName: string;
      createdByID: number;
  }

  export class StudentClass {
      studentClassID = 0;
      studentClassName: string;
      createdByID: number;
  }

  export class SchoolSession {
      schoolSessionID = 0;
      schoolSessionName: string;
      createdByID: number;
  }

  export class SchoolTerm {
      schoolTermID = 0;
      schoolTermName: string;
      createdByID: number;
  }
