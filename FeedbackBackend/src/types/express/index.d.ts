import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string,any>,
      client?: Record<string,any>
    }
  }
}