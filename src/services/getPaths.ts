import { pathsSchema, PathsType } from "./schema/sign-schema";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const getPaths = async (id: string): Promise<PathsType> => {
  try {
    const response = await fetch(`${base_url}/api/v1/signs/${id}/paths`);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const data: PathsType = await response.json();

    const parsedData = pathsSchema.parse(data);

    return parsedData;
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      throw new Error(e.message);
    }

    throw new Error("Paths 정보를 얻어오지 못했습니다.");
  }
};
