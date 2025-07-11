import { useState } from "react";
import { AxiosResponse } from "axios";
import { RoomType, Token } from "../types/generated";

import { performRequestWithRetry } from "../api/retry";
import { apiUrl } from "../api/config";

//import * as oauth from 'axios-oauth-client';
import axios from 'axios';

export function useGetRooms() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  
  const fetchRooms = async (
    checkIn: string,
    checkOut: string,
    guestCapacity: number,
  ): Promise<void> => {
    setLoading(true);

    // Obtener token de acceso
   //const auth = await getClientCredentials('');
   //const accessToken = auth.access_token;

    const tokenResponse = await axios(`${apiUrl}/token`);
    const { access_token, token_type, expires_in } = await (tokenResponse as AxiosResponse<Token>).data;
    console.dir(access_token)
    console.dir(token_type)
    console.dir(expires_in)

    const options = {
      method: "GET",
      params: {
        checkinDate: checkIn,
        checkoutDate: checkOut,
        guestCapacity
      },
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    };

    try {
      const response = await performRequestWithRetry(
        `${apiUrl}/roomTypes`,
        options
      );
      const roomList = (response as AxiosResponse<RoomType[]>).data;
      setRooms(roomList);
    } catch (e: any) {
      setError(e);
    }
    setLoading(false);
  };

  return { rooms, loading, error, fetchRooms };
}
