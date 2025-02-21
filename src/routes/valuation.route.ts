import express, { NextFunction, Request, Response } from "express";
import { ValuationReq } from "../types/valuationReq.type";
import axios from "axios";

const router = express.Router();
// const LOCATION_SERVICE_URL =
process.env.LOCATION_SERVICE_URL || "localhost:3002";
const BIKE_PRICE = 8;
const CAR_PRICE = 14;
const TRUCK_PRICE = 20;

const RIDER_BIKE_COMMISSION = 2;
const RIDER_CAR_COMMISSION = 5;
const RIDER_TRUCK_COMMISSION = 10;

const calcTotalCost = (price: number, distance: number) => {
  return distance * price;
};

const calcRiderCommission = (commission: number, distance: number) => {
  return commission * distance;
};

router.post(
  "/calcValuation",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let { fromAddress, toAddress, vechicleType }: ValuationReq = req.body;

    const response = await axios.post(
      "http://localhost:3001/api/location/route",
      {
        fromAddress,
        toAddress,
      }
    );
    if (!response) {
      res.status(500).send({ err: "unable to get message." });
    }
    const distance = 10;
    let price;
    let commission;

    if (vechicleType === "BIKE") {
      price = BIKE_PRICE;
      commission = RIDER_BIKE_COMMISSION;
    } else if (vechicleType === "CAR") {
      price = CAR_PRICE;
      commission = RIDER_CAR_COMMISSION;
    } else if (vechicleType === "TRUCK") {
      price = TRUCK_PRICE;
      commission = RIDER_TRUCK_COMMISSION;
    } else {
      res.status(400).send({ err: "Vechicle type is not valid!" });
    }

    const cost: number = calcTotalCost(price, distance);
    const rider_commission: number = calcRiderCommission(commission, distance);
    const tax = cost * 0.15;

    res.status(200).send({ cost, rider_commission, tax, ...response.data });
  }
);

export default router;
