import { postSignsSchema, PostSignsType } from "./schema/sign-schema";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const postSign = async (formData: FormData): Promise<PostSignsType> => {
  try {
    const response = await fetch(`${base_url}/api/v1/signs`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data: PostSignsType = await response.json();

    const parsedData = postSignsSchema.parse(data);

    return parsedData;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      throw new Error(e.message);
    }

    console.error(e);
    throw new Error("예상치 못한 오류가 발생했습니다.");
  }
};
