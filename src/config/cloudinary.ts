import cloudinary from 'cloudinary'

cloudinary.v2.config({
  cloud_name: 'danc87qnb',
  api_key: '822923864656457',
  api_secret: 'D_IWLuI_lVq541K-v674xbt6pTY', 
});
export async function handleUpload(file: string) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
    folder: "resumeAi"
  });
  return res;
}