import { Component, OnInit } from '@angular/core';
import { ProdMaster, ProdDetail, PostProductionReceipt, ProductionOrderModel } from '../shared/models/production';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HandleAPIService } from '../shared/services/handle-api.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-receipt-prod',
  templateUrl: './receipt-prod.component.html',
  styleUrls: ['./receipt-prod.component.css']
})
export class ReceiptProdComponent implements OnInit {
  prodMaster: ProdMaster = new ProdMaster();
  prodDetail: ProdDetail = new ProdDetail();
  prodDetails: ProdDetail[] = [];
  postProd: PostProductionReceipt = new PostProductionReceipt();
  prodOrderModel: ProductionOrderModel = new ProductionOrderModel();
  AutoBatch = '';
  AutoQty = null;
  qtyValid = false;
  formValid = false;
  isPostable = false;
  OpenQty = 0;

  elementType = 'svg';
  value = 'someValue12340987';
  format = 'CODE128';
  lineColor = '#000000';
  width = 2;
  height = 100;
  displayValue = true;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;

  closeResult: string;
  bc_weight: number;
  bc_batchno: string;
  currentDate: number;
  prodDate;
  spincls = '';
  constructor(
    private modalService: NgbModal,
    private handleAPI: HandleAPIService,
    private toastr: ToastrService,
    private auth: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    this.prodMaster.TotalQty = 0;
    this.currentDate = Date.now();
  }
  getOrderDetails() {
    // console.log('hello');
    this.auth.loading = true;
    this.spincls = 'fa-spin';
    // tslint:disable-next-line:triple-equals
    if (this.prodMaster.DocNum != '') {
      this.handleAPI.get('api/GetSAPPR/' + this.prodMaster.DocNum)
        .subscribe( (data: any) => {
          // console.log(data);
            this.prodMaster.CardName = data.CardName;
            this.prodMaster.ItemCode = data.ItemCode;
            this.prodMaster.DocEntry = data.DocEntry;
            this.prodMaster.ItemName = data.ItemName;
            this.prodMaster.PlannedQty = data.PlannedQty;
            this.prodMaster.CompletedQty = data.CompltQty;
            this.prodMaster.MachineNo = data.MachineNo;
            this.OpenQty = this.prodMaster.PlannedQty - this.prodMaster.CompletedQty;
            this.auth.loading = false;
            this.spincls = '';
          },
          error => {
            if (typeof error === 'string') {
              this.toastr.warning(error, 'Oops! An error occurred');
            } else {
              this.toastr.warning('Please check the console.', 'Oops! An error occurred');
            }
          }
      );
    } else {
      this.auth.loading = false;
      this.spincls = '';
    }
  }
  setDate() {
    this.prodMaster.ProdDate = new Date(this.prodDate.year + '-' + this.prodDate.month + '-' + this.prodDate.day);
  }
  onAddBatch() {
    this.setDate();
    // tslint:disable-next-line:triple-equals
    if (this.prodMaster.DocNum == null || this.prodMaster.DocNum.trim() == '') {
      this.toastr.warning('Order number is required.', 'Validation Error!');
      return;
    }
    if (this.prodMaster.ProdDate == null) {
      this.toastr.warning('Date is required.', 'Validation Error!');
      return;
    }
    this.prodDetail.BatchNo = this.generateBatchNo();
    this.prodDetail.Quantity = this.AutoQty;
    this.prodDetails.push(this.prodDetail);
    this.prodMaster.TotalQty += this.AutoQty;
    this.prodDetail = new ProdDetail();
    this.AutoBatch = '';
    this.AutoQty = null;
    this.qtyValid = false;
    this.setDate();
    // tslint:disable-next-line:triple-equals
    if (this.prodMaster.DocNum.trim() != '' && this.prodMaster.ProdDate != null) {
      this.formValid = true;
    }
  }
  onRemoveBatch(item: ProdDetail) {
    const i = this.prodDetails.indexOf(item);

    if (i !== -1) {
      this.prodDetails.splice(i, 1);
      this.prodMaster.TotalQty = this.prodMaster.TotalQty - item.Quantity;
    }
    if (this.prodDetails.length < 1) {
      this.formValid = false;
      this.prodMaster.TotalQty = 0;
    }
  }
  open(content, idt: ProdDetail) {
    this.value = idt.BatchNo;
    this.bc_batchno = this.value;
    this.bc_weight = idt.Quantity;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openSAPCred(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop: 'static'});
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  printRecord(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <link rel="stylesheet" href="./assets/css/bootstrap.min.css">
          <link rel="stylesheet" href="./assets/css/fontawesome-all.css">
        </head>
        <body onload="window.print();window.close()" style="margin:10%,20%,0,20%;">
        <div class="row">
        <div class="col-md-3">
        </div>
        <div class="col-md-6">
        ${printContents}
        </div>
        <div class="col-md-3">
        </div>
        </div>
        </body>
      </html>`
    );
    popupWin.document.close();
  }
  generateBatchNo() {
    let timestamp = '';
    const now = new Date();

    timestamp = now.getFullYear().toString(); // 2011
    timestamp += (now.getMonth() < 9 ? '0' : '') + now.getMonth().toString(); // JS months are 0-based, so +1 and pad with 0's
    timestamp += (now.getDate() < 10 ? '0' : '') + now.getDate().toString(); // pad with a 0
    timestamp += (now.getHours() < 10 ? '0' : '') + now.getHours().toString();
    timestamp += (now.getMinutes() < 10 ? '0' : '') + now.getMinutes().toString();
    timestamp += now.getMilliseconds().toString().substr(1, 2);
    // tslint:disable-next-line:max-line-length
    // timestamp += (parseInt(now.getMilliseconds().toString().substr(1, 2)) < 10 ? '0' : '') + now.getMilliseconds().toString().substr(1, 2);
    return timestamp;
  }
  makeQtyValid() {
    if (this.AutoQty > 0) {
      this.qtyValid = true;
    } else {
      this.qtyValid = false;
    }
  }
  // onSubmit(form?: NgForm) {
  //   // if (this.invoice.discount < 0) {
  //   //   this.toastr.error('Discount must be a positive value!');
  //   //   return;
  //   // }
  //   // this.handleAPI.create(this.invoiceFull, this.endpoint)
  //   //   .subscribe( (data: any) => {
  //   //       this.toastr.success('Invoice created!', 'Success');
  //   //       this.invID = data;
  //   //       console.log(data);
  //   //       this.print = true;
  //   //       this.formReady = false;
  //   //       this.resetForm();
  //   //     },
  //   //     error => {
  //   //       if (typeof error === 'string') {
  //   //         this.toastr.warning(error, 'Oops! An error occurred');
  //   //       } else {
  //   //         this.toastr.warning('Please check the console.', 'Oops! An error occurred');
  //   //       }
  //   //     }
  //   //   );
  // }
}
