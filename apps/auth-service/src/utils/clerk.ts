import { createClerkClient } from "@clerk/express";

console.log(process.env.CLERK_SECRET_KEY)

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});
console.log(clerkClient)

export default clerkClient;