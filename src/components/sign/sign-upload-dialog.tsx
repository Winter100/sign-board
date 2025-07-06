"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PenTool } from "lucide-react";
import SignUploadForm from "./sign-upload-form";
import { useState } from "react";

const SignUploadDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex cursor-pointer items-center gap-2">
          <PenTool />
          서명하기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenTool />새 서명 작성하기
          </DialogTitle>
          <DialogDescription>누군가를 응원하고 서명을 남겨보세요!</DialogDescription>
        </DialogHeader>

        <SignUploadForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};
export default SignUploadDialog;
