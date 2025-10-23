interface LoginSuccessResponse {
  success: true;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      username: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

async function loginApi(dataRequest: {
  username: string;
  password: string;
}): Promise<LoginSuccessResponse> {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: dataRequest.username, password: dataRequest.password }),
  });
  const data = await response.json();
  console.log(data);
  return data;
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

export { loginApi, fakeCallAPIRegister, fakeCallAPICheckEmail };
