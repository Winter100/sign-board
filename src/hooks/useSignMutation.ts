import { postSign } from "@/services/postSign";
import { PostSignsType } from "@/services/schema/sign-schema";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

export const useSignMutation = (
  handleClose: () => void
): UseMutationResult<PostSignsType, Error, FormData> => {
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
