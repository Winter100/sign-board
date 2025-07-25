import { deleteSign } from "@/services/deleteSign";
import { DeleteSignType } from "@/services/schema/sign-schema";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

export const useDeleteMutation = (
  handleClose: () => void
): UseMutationResult<DeleteSignType, Error, { id: string; password: string }> => {
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
