export interface Options {}

// generic get request
export const get = async (url: string, options?: Options) => {
  return coreFetch(url, options);
};

// generic post request
export const post = async (url: string, payload: any, options?: Options) => {
  return coreFetch(url, options, "post", payload);
};

// generic put request
export const put = async (url: string, payload: any, options?: Options) => {
  return coreFetch(url, options, "put", payload);
};

// generic delete request
export const remove = async (url: string, id: string, options?: Options) => {
  url = url + "/" + id;
  return coreFetch(url, options, "delete");
};

const coreFetch = async (
  url: string,
  options?: Options,
  method: string = "get",
  body?: any
) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const init = { headers };

  if (method === "post" || method === "put") {
    Object.assign(init, { body, method, headers });
  }

  return new Promise(async (resolve, reject) => {
    let response;
    if (options) {
      response = await fetch(url, { headers });
    } else {
      response = await fetch(url, init);
    }
    if (response.ok) {
      resolve(response);
    } else {
      reject(response.status);
    }
  });
};
