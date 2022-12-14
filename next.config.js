// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    REACT_APP_NODE_ENV: "STAGING",
    REACT_APP_STAGING_URL: "https://api.bazara.co/api/v1/staging",
    REACT_APP_STAGING_URL_V2: "https://api.bazara.co/api/v1/staging",
    REACT_APP_STAGING_UPLOAD_URL: "https://prod.bazara.co/upload-microservice/v1/upload/img",
    REACT_APP_STAGING_PAY_STACK_TEST: "pk_test_84d450ead211f32c1d444c98dd6c7fcfd27f897c",
    REACT_APP_STAGING_VERIFICATION: "sk_live_8f334a99611a4cf0245c8e4f1bbc3fddb1861d80",

    REACT_APP_DEV_URL: "https://api.bazara.co/api/v1/dev",
    REACT_APP_DEV_URL_V2: "https://api.bazara.co/api/v2/dev",
    REACT_APP_DEV_UPLOAD_URL: "https://prod.bazara.co/upload-microservice/v1/upload/img",
    REACT_APP_DEV_PAY_STACK_TEST: "pk_test_84d450ead211f32c1d444c98dd6c7fcfd27f897c",
    REACT_APP_DEV_VERIFICATION: "sk_live_8f334a99611a4cf0245c8e4f1bbc3fddb1861d80",

    REACT_APP_PRODUCTION_URL:  "https://prod.bazara.co/api/v1/prod",
    REACT_APP_PRODUCTION_URL_V2: "https://prod.bazara.co/api/v1/prod",
    REACT_APP_PRODUCTION_UPLOAD_URL: "https://prod.bazara.co/upload-microservice/v1/upload/img",
    REACT_APP_PRODUCTION_PAY_STACK_TEST: "pk_live_673d282a2ea6f32939b9b27b162e20f03eff65fd",
    REACT_APP_PRODUCTION_VERIFICATION: "sk_live_8f334a99611a4cf0245c8e4f1bbc3fddb1861d80",
  }
}

module.exports = nextConfig

