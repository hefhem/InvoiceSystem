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
    priceListID = 0;
    priceDescription = '';
    schoolSessionID = 0;
    studentClassID = 0;
    schoolTermID = 0;
    itemID = 0;
    unitPrice = 0;
    createdByID: number;
  }

  export class PriceListView {
    PriceListID: number;
    PriceDescription: string;
    SchoolSessionID: number;
    SchoolSessionName: string;
    StudentClassID: number;
    StudentClassName: string;
    SchoolTermID: number;
    SchoolTermName: string;
    ItemID: number;
    ItemName: string;
    UnitPrice: number;
    CreatedByID: number;
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
      isActive: string;
      schoolSessionName: string;
      createdByID: number;
  }

  export class SchoolTerm {
      schoolTermID = 0;
      schoolTermName: string;
      createdByID: number;
  }
