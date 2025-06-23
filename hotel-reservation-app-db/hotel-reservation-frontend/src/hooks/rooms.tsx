import { useState } from "react";
import { AxiosResponse } from "axios";
import { RoomType } from "../types/generated";
import { performRequestWithRetry } from "../api/retry";
import { apiUrl } from "../api/config";
import { configs } from "../api/configs";

//port * as oauth from 'axios-oauth-client';
//port axios from 'axios';

export function useGetRooms() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  /*
  const getClientCredentials = oauth.clientCredentials(
    axios.create(),
    "https://bfe41d90-923c-472f-b7d5-13d13da073ad-dev.e1-us-east-azure.choreosts.dev/oauth2/token",
    "IblRACLcYrGU6HAbh20ySpRT93d1",
    "KGCVAnKSzEluG1Rpf98CGbDpwr2N"
  );
  */
  
  const fetchRooms = async (
    checkIn: string,
    checkOut: string,
    guestCapacity: number,
  ): Promise<void> => {
    setLoading(true);

    // Obtener token de acceso
   //onst auth = await getClientCredentials('');
   //onst accessToken = auth.access_token;

    const options = {
      method: "GET",
      params: {
        checkinDate: checkIn,
        checkoutDate: checkOut,
        guestCapacity,
        choreoApiKey_33: configs.choreoApiKey,
        accessToken: "ccessToken2"
      },
      headers: {
        'Choreo-API-044': `${configs.choreoApiKey}`
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
