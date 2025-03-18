import express, { NextFunction, Request, Response } from "express";
import { ValuationReq, ValuationResp } from "../types/valuation.type";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const LOCATION_SERVICE_URL = process.env.LOCATION_SERVICE_URL;

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

const decimalNumberFormat = (val: number) => {
  return Math.round(val * 100) / 100;
};

router.post(
  "/calculate",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let { from_address, to_address, vehicle_type }: ValuationReq = req.body;

    const response = await axios.post(LOCATION_SERVICE_URL + "/matrix", {
      fromAddress: from_address,
      toAddress: to_address,
    });
    if (!response) {
      res.status(500).send({ err: "unable to get message." });
    }

    const distance = response.data.distanceKm;
    let price;
    let commission;

    if (vehicle_type === "BIKE") {
      price = BIKE_PRICE;
      commission = RIDER_BIKE_COMMISSION;
    } else if (vehicle_type === "CAR") {
      price = CAR_PRICE;
      commission = RIDER_CAR_COMMISSION;
    } else if (vehicle_type === "TRUCK") {
      price = TRUCK_PRICE;
      commission = RIDER_TRUCK_COMMISSION;
    } else {
      res.status(400).send({ err: "Vechicle type is not valid!" });
    }

    const cost: number = decimalNumberFormat(calcTotalCost(price, distance));
    const rider_commission: number = decimalNumberFormat(
      calcRiderCommission(commission, distance)
    );
    const tax = decimalNumberFormat(cost * 0.15);

    res.status(200).send({
      pricing_details: {
        cost,
        rider_commission,
        tax,
        total_cost: cost + tax,
      },
      distance: response.data.distanceKm,
      time: response.data.durationMinutes,
    } as ValuationResp);
  }
);

export default router;
