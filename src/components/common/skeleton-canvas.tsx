import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const SkeletonCanvas = () => {
  return (
    <div className="flex flex-col gap-10">
      <Card className="gap-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="relative flex size-8 shrink-0 overflow-hidden rounded-full" />

            <div className="flex flex-col gap-0.5">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-32" />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-8 w-10" />
              <Skeleton className="h-8 w-10" />
              <Skeleton className="h-8 w-10" />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border bg-gray-50 p-4">
            <Skeleton className="h-40 w-full" />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <div className="w-full pt-3">
            <Skeleton className="h-3.5 w-full max-w-40" />
          </div>

          <div className="flex w-full items-center gap-2">
            <Skeleton className="h-5 w-14" />
            <Skeleton className="h-5 w-14" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SkeletonCanvas;
