import axios from "axios";
import { useRouter } from "next/router";

import config from "../../config/config"



export const postAuthRequest = (url: string, payload) => {
  return axios.post(config.databaseUrl + url, payload,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
}

export const getRequest = (url: string) => {
  return axios.get(config.databaseUrl2 + url,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
}

export const specialGetRequest = (url: string) => {
  return axios.get(config.databaseUrl + url,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
}


export const specialPostRequest = (url: string, id: string) => {

  return axios.post(config.databaseUrl2 + url,
    {
      params: {
        productId: id,
      },
    },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
}


export const postRequest = (url: string, payload) => {
  return axios.post(config.databaseUrl2 + url, payload, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
}


export const uploadImageFunc = (payload) => {
  return axios.post(config.databaseUpload, payload, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
}


export const bankVerification = (payload) => {
  return axios.get(`https://api.paystack.co/bank/resolve?account_number=${payload.bankAccount}&bank_code=${payload.bankCode}`, {
    headers: {
      authorization: `Bearer ${config.secretOrKey}`,
  },
  })
}


