import { useState } from "react";
import { AxiosResponse } from "axios";
import {
  Reservation,
  ReservationRequest,
  UpdateReservationRequest,
  Token
} from "../types/generated";
import { performRequestWithRetry } from "../api/retry";
import { apiUrl } from "../api/config";
import axios from 'axios';


export function useReserveRoom() {
  const [reservation, setReservation] = useState<Reservation>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const reserveRoom = async (request: ReservationRequest): Promise<void> => {
    setLoading(true);

    const tokenResponse = await axios(`${apiUrl}/token`);
    const { access_token, token_type, expires_in } = await (tokenResponse as AxiosResponse<Token>).data;
    console.dir(access_token)
    console.dir(token_type)
    console.dir(expires_in)

    const options = {
      method: "POST",
      data: request,
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    };
    try {
      const response = await performRequestWithRetry(
        `${apiUrl}/`,
        options
      );
      setReservation((response as AxiosResponse<Reservation>).data);
    } catch (e: any) {
      setError(e);
    }
    setLoading(false);
  };

  return { reservation, loading, error, reserveRoom };
}

export function useGetReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const fetchReservations = async (userId: string): Promise<void> => {
    setLoading(true);

    const tokenResponse = await axios(`${apiUrl}/token`);
    const { access_token, token_type, expires_in } = await (tokenResponse as AxiosResponse<Token>).data;
    console.dir(access_token)
    console.dir(token_type)
    console.dir(expires_in)

    const options = {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    };
    try {
      const response = await performRequestWithRetry(
        `${apiUrl}/users/${userId}`,
        options
      );
      setReservations((response as AxiosResponse<Reservation[]>).data);
    } catch (e: any) {
      setError(e);
    }
    setLoading(false);
  };

  return { reservations, loading, error, fetchReservations };
}

export function useDeleteReservation() {
  const [deleted, setDeleted] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<Error>();

  const deleteReservation = async (id: number): Promise<void> => {
    setDeleting(true);

    const tokenResponse = await axios(`${apiUrl}/token`);
    const { access_token, token_type, expires_in } = await (tokenResponse as AxiosResponse<Token>).data;
    console.dir(access_token)
    console.dir(token_type)
    console.dir(expires_in)

    const options = {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    };
    try {
      const response = await performRequestWithRetry(
        `${apiUrl}/${id}`,
        options
      );
      setDeleted(true);
    } catch (e: any) {
      setError(e);
    }
    setDeleting(false);
  };

  return { deleted, deleting, error, deleteReservation };
}

export function useUpdateReservation() {
  const [updated, setUpdated] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<Error>();

  const updateReservation = async (
    id: number,
    updateRequest: UpdateReservationRequest
  ): Promise<void> => {
    setUpdating(true);

    const tokenResponse = await axios(`${apiUrl}/token`);
    const { access_token, token_type, expires_in } = await (tokenResponse as AxiosResponse<Token>).data;
    console.dir(access_token)
    console.dir(token_type)
    console.dir(expires_in)

    const options = {
      method: "PUT",
      data: updateRequest,
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    };
    try {
      await performRequestWithRetry(`${apiUrl}/${id}`, options);
      setUpdated(true);
    } catch (e: any) {
      setError(e);
    }
    setUpdating(false);
  };

  return { updated, updating, error, updateReservation };
}
