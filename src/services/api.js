const BASE_URL = 'https://vpic.nhtsa.dot.gov/api';

export async function decodeVin(vin) {
  const cleanVin = vin.trim().toUpperCase();
  const response = await fetch(`${BASE_URL}/vehicles/decodevin/${cleanVin}?format=json`);
  if (!response.ok) {
    throw new Error(`Failed to decode VIN: ${response.statusText}`);
  }
  return response.json();
}

export async function getVariablesList() {
  const response = await fetch(`${BASE_URL}/vehicles/getvehiclevariablelist?format=json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch variables: ${response.statusText}`);
  }
  return response.json();
}
