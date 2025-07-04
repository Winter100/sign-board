import { postSign } from "@/services/postSign";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSignMutation = (handleClose: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["post", "signs"],
    mutationFn: postSign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sign", "list"] });
      handleClose();
    },
  });
};
