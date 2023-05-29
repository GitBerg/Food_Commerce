import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { SnackData } from "./interfaces/SnackData";
import { CustomerData } from "./interfaces/CustomerData";
import { PaymentData } from "./interfaces/PaymentData";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
})

app.get("/snacks", async (req: Request, res: Response) => {
    const { snack } = req.query

    if (!snack) return res.status(400).send({ message: "Snack is required" })

    const snacks = await prisma.snack.findMany({
        where: {
            snack: {
                equals: snack as string
            }
        }
    })

    res.send(snacks)
})

app.get("/orders/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    const order = await prisma.order.findUnique({
        where: {
            id: Number(id)
        },
    })

    if(!order) return res.status(400).send({ message: "Order not found" })

    res.send(order)
})

interface CheckoutRequest extends Request {
    body: {
        cart: SnackData[],
        customer: CustomerData,
        payment: PaymentData
    }
}

app.post("/checkout", async (req: CheckoutRequest, res: Response) => {
    const { cart, customer, payment } = req.body;


})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})