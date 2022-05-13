import express, { Request, Response } from "express";

export const userRouter = express.Router();

userRouter.get("/", (req: Request, res: Response) => {

    const { userName } = req.session

    console.log("hello " + userName)
    if (userName) {
        console.log(`user "${userName}" already has session`);
        return res.status(200).send(userName)
    }
    else {
        console.log("not yet logged in");
        return res.status(200).send("no user")
    }


})