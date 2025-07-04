const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const deleteSign = async ({ id, password }: { id: string; password: string }) => {
  try {
    console.log(password);
    const response = await fetch(`${base_url}/api/v1/signs/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      throw new Error("");
    }

    const data = await response.json();

    return data;
  } catch (e) {
    console.error(e);
    throw new Error("삭제에 실패했습니다.");
  }
};
