export class ProdMaster {
    ProdMasterID: number;
    DocEntry: string;
    DocNum: string;
    ItemCode: string;
    ItemName: string;
    PlannedQty: number;
    CompletedQty: number;
    MachineNo: string;
    CardName: string;
    PackingNo: string;
    ProdDate: Date;
    IsPosted: boolean;
    PostDate: Date;
    IsApproved: boolean;
    CreatedBy: number;
}

export class ProdDetail {
    ProdDetailID: number;
    Line_No: number;
    ProdMasterID: number;
    BatchNo: string;
    Quantity: number;
    IsPosted: boolean;
}

export class SAPCompany {
    SAPCompanyID: number;
    SAPLicenseServerName: string;
    SAPServerName: string;
    SAPUserName: string;
    SAPUserPassword: string;
    SQLdbName: string;
    SQLUserName: string;
    SQLUserPassword: string;
    SQLServerVersion: string;
}

/*
public class SAPCompany {
        [Key]
        public int SAPCompanyID { get; set; }
        [Required]
        [StringLength(50)]
        public string SAPLicenseServerName { get; set; }
        [Required]
        [StringLength(50)]
        public string SAPdbName { get; set; }
        [Required]
        [StringLength(50)]
        public string SAPdbUserName { get; set; }
        [Required]
        [StringLength(100)]
        public string SAPdbPassWord { get; set; }
        [Required]
        [StringLength(50)]
        public string SQLServerVersion { get; set; }
    }
    public class ProdMaster {
        public int ProdMasterID { get; set; }
        public string DocEntry { get; set; }
        public string DocNum { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public decimal PlannedQty { get; set; }
        public string MachineNo { get; set; }
        public string CardCode { get; set; }
        public string CardName { get; set; }
        public string PackingNo { get; set; }
        public DateTime ProdDate { get; set; }
        public DateTime PostDate { get; set; }
        public bool IsApproved { get; set; }
        public int CreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
    }

    public class ProdDetail {
        public int ProdDetailID { get; set; }
        public int Line_No { get; set; }
        public int ProdMasterID { get; set; }
        public string BatchNo { get; set; }
        public decimal Quantity { get; set; }
        public DateTime PostDate { get; set; }
    }
*/
