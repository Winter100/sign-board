interface PostResponseSignType {
  message: string;
}
const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const postSign = async (formData: FormData): Promise<PostResponseSignType> => {
  try {
    const response = await fetch(`${base_url}/api/v1/signs`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data: PostResponseSignType = await response.json();

    return data;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      throw new Error(e.message);
    }

    console.error(e);
    throw new Error("예상치 못한 오류가 발생했습니다.");
  }
};
