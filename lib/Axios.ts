'use client';
import { RootState } from '@/redux/store';
import axios from 'axios';
import { useSelector } from 'react-redux';

const token = useSelector((state: RootState) => state.user.token);
export class CustomAxios {
  static async get(url: string) {
    let res = await axios.get(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  }
  static async post(url: string) {
    let res = await axios.post(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    return res.data;
  }
}
