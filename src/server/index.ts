import { Elysia } from "elysia";
import { failureRoute } from "./routes/transaction/failure";
import { successRoute } from "./routes/transaction/success";

new Elysia().use(failureRoute).use(successRoute).listen(8080);
