import { NextFunction, Request, Response } from "express";

type AsyncControllerType = ( //defines how a controller should look like
    req:Request,
    res:Response,
    next:NextFunction
)=> Promise<any>;

export const asyncHandler =
  (controller: AsyncControllerType): AsyncControllerType =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    } 
  };