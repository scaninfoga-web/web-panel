'use server';
import axios, { AxiosError } from 'axios';

export async function ServerActions(apiUrl: string, body: Object) {
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzNTEyMjQ4LCJpYXQiOjE3NTI2NDgyNDgsImp0aSI6ImY3MWU3NzIyNmMyYzQ4ODk4ZmMwMjAyOTQxYzExYjNkIiwiZW1haWwiOiJhc2hpc2h0aXdhcmlzZXJ2ZXJAZ21haWwuY29tIn0.9pa4shzZ3T8tpVOUCSFJpoqb382ureXcOGtR-qdPA4Q';
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${apiUrl}`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error?.response);
    }
  }
}
