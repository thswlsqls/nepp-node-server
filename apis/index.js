import axios from 'axios';

export const naverAxios = axios.create({
  baseURL: 'https://openapi.naver.com',
  headers: {
    'X-Naver-Client-Id': 'U4b_2gGcfz5MKhCYNabD',
    'X-Naver-Client-Secret': 'Mg4U85AoDL',
  },
});
