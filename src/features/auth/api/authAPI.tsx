function fakeFunctionLogin(email: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(email);
    }, 3000);
  });
}

async function fakeCallAPILogin(email: string) {
  const result = await fakeFunctionLogin(email);
  // console.log(result);
  return result as string;
}

function fakeFunctionRegister(email: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(email);
    }, 3000);
  });
}

async function fakeCallAPIRegister(email: string) {
  const result = await fakeFunctionRegister(email);
  console.log(result);
  return result as string;
}

function fakeFunctionCheckEmail(email: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email == 'giacmot18@gmail.com' || email == 'chatgptedu21@baret.pro') {
        resolve('Email already exists');
      } else {
        resolve('Email is ok!');
      }
    }, 3000);
  });
}

async function fakeCallAPICheckEmail(email: string) {
  const result = await fakeFunctionCheckEmail(email);
  console.log(result);
  return result;
}

export { fakeCallAPILogin, fakeCallAPIRegister, fakeCallAPICheckEmail };
