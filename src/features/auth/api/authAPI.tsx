function fakeFunctionLogin(email: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(email);
    }, 3000);
  });
}

async function fakecallAPILogin(email: string) {
  const result = await fakeFunctionLogin(email);
  console.log(result);
  return result as string;
}

export default fakecallAPILogin;
