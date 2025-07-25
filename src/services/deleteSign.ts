import { deleteSignSchema, DeleteSignType } from "./schema/sign-schema";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const deleteSign = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}): Promise<DeleteSignType> => {
  try {
    const response = await fetch(`${base_url}/api/v1/signs/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data: DeleteSignType = await response.json();

    const parsedData = deleteSignSchema.parse(data);

    return parsedData;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      throw new Error(e.message);
    }
    throw new Error("삭제에 실패했습니다.");
  }
};
