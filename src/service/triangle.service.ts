"use server";
import { ApiService } from "./api.service";

export async function calculateTriangle(request: {
  width: number;
  height: number;
  base: number;
}) {
  const response = await ApiService("/triangle", {
    method: "POST",
    body: request,
    requiresAuth: false,
  });

  return response;
}
