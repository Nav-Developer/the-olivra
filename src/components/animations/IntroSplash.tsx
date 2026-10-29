"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { gsap } from "@/lib/gsap";

const VIDEO_SRC = "/videos/chef.mp4";
const DURATION_MS = 4500;

export default function IntroSplash() {
  const [show, setShow] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);

  const close = () => {
    if (closing.current || !overlayRef.current) return;
    closing.current = true;
    gsap.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
      onComplete: () => setShow(false),
    });
  };

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(close, DURATION_MS);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <Box
      ref={overlayRef}
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        // bgcolor: "#0f0d0c",
        bgcolor: "primary.main",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <Box
        component="video"
        src={VIDEO_SRC}
        autoPlay
        muted
        playsInline
        onEnded={close}
        sx={{
          width: { xs: "80vw", sm: 420 },
          maxHeight: "60vh",
          objectFit: "cover",
          borderRadius: 4,
        }}
      />

      <Typography
        variant="h4"
        sx={{ fontFamily: "var(--font-playfair)", textAlign: "center" }}
      >
        Broffles Chef
      </Typography>

      <Button
        onClick={close}
        color="inherit"
        sx={{ position: "absolute", top: 16, right: 16, opacity: 0.7 }}
      >
        Skip
      </Button>
    </Box>
  );
}
