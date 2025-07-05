import { deleteSign } from "@/services/deleteSign";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMutation = (handleClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete", "sign"],
    mutationFn: deleteSign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sign", "list"] });
      handleClose();
    },
  });
};
