const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const getPaths = async (id: string) => {
  const response = await fetch(`${base_url}/api/v1/signs/${id}/paths`);

  if (!response.ok) {
    throw new Error("Failed to fetch paths");
  }

  const data = await response.json();

  return data;
};
