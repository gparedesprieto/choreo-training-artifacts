import { useState } from "react";
import { AxiosResponse } from "axios";
import { RoomType } from "../types/generated";
import { performRequestWithRetry } from "../api/retry";
import { apiUrl } from "../api/config";
import { configs } from "../api/configs";

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

    const tokenResponse = await axios(`${apiUrl}/token123`);
    const { access_token } = await tokenResponse.data;


    const options = {
      method: "GET",
      params: {
        checkinDate: checkIn,
        checkoutDate: checkOut,
        guestCapacity,
        choreoApiKey_11: configs.choreoApiKey,
        serviceUrl: configs.serviceUrl,
        consumerKey: configs.consumerKey,
        consumerSecret: configs.consumerSecret,
        tokenUrl: configs.tokenUrl,
        choreoApiKey : configs.choreoApiKey,
        accessToken: access_token
      },
      headers: {
        //'Authorization': `Bearer ${accessToken}`,
        'Choreo-API-Key': `${configs.choreoApiKey}`
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
