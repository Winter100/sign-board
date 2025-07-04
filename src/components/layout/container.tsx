import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

const Container = ({ children, className }: ComponentProps<"div">) => {
  return (
    <div className={cn("rounded-md border bg-white p-2", className)}>
      {children}
    </div>
  );
};

export default Container;
