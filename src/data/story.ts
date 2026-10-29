import assets from "@/assets";
import type { StaticImageData } from "next/image";

export type Chapter = {
  tag: string;
  title: string;
  text: string;
  image?: StaticImageData;
  aspect?: "wide" | "tall";
  stats?: { value: number; suffix: string; label: string }[];
};

export const chapters: Chapter[] = [
  {
    tag: "The Beginning",
    title: "Four friends. One crazy idea.",
    text: "We were four friends with one iron and a lot of hunger.",
    image: assets.images.founders,
    aspect: "wide",
  },
  {
    tag: "The First Outlet",
    title: "The taste of good friendship.",
    text: "Our first counter opened with balloons, nervous smiles and a sign with our own faces on it. [Add where and when.]",
    image: assets.images.first_store,
    aspect: "tall",
  },
  {
    tag: "The Growth",
    title: "From one iron to a movement.",
    text: "What started between friends is now a franchise people trust across India.",
    stats: [
      { value: 30, suffix: "+", label: "Outlets" },
      { value: 7, suffix: "", label: "States" },
      { value: 33, suffix: "K+", label: "Community" },
    ],
  },
];
