import React from "react";
import SignUploadDialog from "../sign/sign-upload-dialog";
import Image from "next/image";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white py-2">
      <nav className="mx-auto h-full max-w-3xl">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center">
            <Image src="/images/s-logo.png" width={80} height={50} alt="logo" />
            <div className="font-poppins text-sm">
              <p className="font-semibold tracking-tight text-gray-900">Signatures</p>
              <p className="text-xs">서명을 담아 응원하기</p>
            </div>
          </div>
          <div>
            <SignUploadDialog />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
