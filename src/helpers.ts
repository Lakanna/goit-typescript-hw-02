import axios from "axios";

  
export default async function getPhotos<DataType>(
  value: string,
  page: number = 1
): Promise<DataType> {
  const URL = "https://api.unsplash.com/search/photos";
  const params = {
    client_id: "CdjgVXS8Gvc-erCPUMkWL554IwcLueiwHparrTjhEjo",
    query: value,
    per_page: 15,
    page,
  };

   const {data} = await axios.get(URL, { params });
  
  return data;
}
