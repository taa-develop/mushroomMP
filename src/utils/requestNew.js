import Taro from "@tarojs/taro";

function getStorage(key) {
  return Taro.getStorage({ key })
    .then(res => res.data)
    .catch(() => "");
}

export default async function fetch(options) {
  const {
    url = "https://api.yiquanxinhe.com/graphql",
    payload,
    method = "GET"
  } = options;

  const token = await getStorage("token");

  const header = {
    authorization: `Bearer ${token}`
  };

  return Taro.request({
    url,
    method,
    data: {
      query: payload
    },
    header
  })
    .then(res => {
      const { data } = res.data;
      return data;
    })
    .catch(err => {
      console.log("err: ", err);
    });
}
