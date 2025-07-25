import { infiniteSignSchema, InfiniteSignType } from "./schema/sign-schema";

const limit = 10;
const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const getSigns = async ({
  pageParam,
}: {
  pageParam?: string;
}): Promise<InfiniteSignType> => {
  try {
    const url = pageParam
      ? `${base_url}/api/v1/signs?limit=${limit}&lastId=${encodeURIComponent(pageParam)}`
      : `${base_url}/api/v1/signs?limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data: InfiniteSignType = await response.json();

    const parsedData = infiniteSignSchema.parse(data);

    return parsedData;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      throw new Error(e.message);
    }
    throw new Error("서명 정보를 얻어오지 못했습니다.");
  }
};
