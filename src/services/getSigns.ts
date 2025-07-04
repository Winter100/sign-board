interface ItemType {
  id: string;
  writer: string;
  message: string;
  image_url: string;
  created_at: string;
  avatar: string;
}

interface getSingsApiType {
  item: ItemType[];
  hasNextPage: boolean;
  nextCursor: string;
}

const limit = 10;
const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const getSigns = async ({ pageParam }: { pageParam?: string }): Promise<getSingsApiType> => {
  try {
    const url = pageParam
      ? `${base_url}/api/v1/signs?limit=${limit}&lastId=${encodeURIComponent(pageParam)}`
      : `${base_url}/api/v1/signs?limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("");
    }

    const data: getSingsApiType = await response.json();

    return data;
  } catch (e) {
    console.error(e);
    throw new Error("서명 정보를 얻어오지 못했습니다.");
  }
};
