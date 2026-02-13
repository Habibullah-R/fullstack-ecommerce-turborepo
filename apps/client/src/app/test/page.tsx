import { auth } from "@clerk/nextjs/server";

const page = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const resProduct = await fetch("http://localhost:8000/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const productData = await resProduct.json();
  console.log(productData);

  
  const resOrder = await fetch("http://localhost:8001/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const orderData = await resOrder.json();
  console.log(orderData);

  
  const resPayment = await fetch("http://localhost:8002/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const paymentData = await resPayment.json();
  console.log(paymentData);

  return <div></div>;
};

export default page;
