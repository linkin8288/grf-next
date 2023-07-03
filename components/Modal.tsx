"use client";

// By clicking outside and the close button will both close the black modal background.

import { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Modal({ children }: { children: ReactNode }) {
  // When the overlay is clicked, it checks if the click target is the overlay itself and 
  // then triggers the onDismiss function to navigate the user back to the home page.
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {    
    router.push("/");
  }, [router]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target === overlay.current) && onDismiss) {
      onDismiss();
    }
  }, [onDismiss, overlay]);

  return (
    // This modal CSS is the whole screen black color background overlay,
    // While clicking the close button, it close this div modal.
    // modal_wrapper is the white backgorund on the top of black color backgroud.
    // the wrapper div is the container of children inside create-project folder.
    <div ref={overlay} className="modal" onClick={(e) => handleClick(e)}>
      <button type="button" onClick={onDismiss} className="absolute top-4 right-8">
        <Image src="/close.svg" width={17} height={17} alt="close" />
      </button>

      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
}
