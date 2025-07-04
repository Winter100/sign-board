import { deleteSign } from "@/services/deleteSign";
import { useMutation } from "@tanstack/react-query";

export const useDeleteMutation = () => {
  return useMutation({
    mutationKey: ["delete", "sign"],
    mutationFn: deleteSign,
  });
};
