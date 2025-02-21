export interface ValuationReq {
    fromAddress: string
    toAddress: string
    vechicleType: "CAR" | "TRUCK" | "BIKE"
}