import cloudbase from "@cloudbase/js-sdk";

const env = import.meta.env.VITE_CLOUDBASE_ENV_ID ?? "tx-base-cloud-0giy45il8f83ce7e";
const region = import.meta.env.VITE_CLOUDBASE_REGION ?? "ap-shanghai";
export const cloudbaseAccessKey = import.meta.env.VITE_CLOUDBASE_ACCESS_KEY ?? "";

export const cloudbaseApp = cloudbase.init({
  env,
  region,
  ...(cloudbaseAccessKey ? { accessKey: cloudbaseAccessKey } : {}),
});

export const cloudbaseAuth = cloudbaseApp.auth();
export const cloudbaseDatabase = cloudbaseApp.database();
