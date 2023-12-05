"use client";
import { useState, useMemo, useLayoutEffect, useEffect } from "react";
import AppLayout from "@/layout/AppLayout";
import TextEditor from "@/tools/editor/TextEditor";
import type { Color, ColorPickerProps } from "antd/es/color-picker";

export default function Home() {
  const [color, setColor] = useState<Color | string | any>("");
  const [formatRgb, setFormatRgb] = useState<ColorPickerProps["format"]>("rgb");

  const rgbString = useMemo(
    () => (typeof color === "string" ? color : color.toRgbString()),
    [color]
  );

  const linearGradient = useMemo(
    () => `linear-gradient(to right, ${rgbString}, ${rgbString})`,
    [rgbString]
  );

  const colorArray = useMemo(
    () => [
      "#F5222D",
      "#FA8C16",
      "#FADB14",
      "#8BBB11",
      "#52C41A",
      "#13A8A8",
      "#1677FF",
      "#2F54EB",
      "#722ED1",
      "#EB2F96",
      "#F5222D4D",
      "#FA8C164D",
      "#FADB144D",
      "#8BBB114D",
      "#52C41A4D",
      "#13A8A84D",
      "#1677FF4D",
      "#2F54EB4D",
      "#722ED14D",
      "#EB2F964D",
    ],
    []
  );

  useEffect(() => {
    const randomColors = () => {
      const randomColor =
        colorArray[Math.floor(Math.random() * colorArray.length)];
      setColor(randomColor);
    };

    randomColors();
  }, [colorArray]);

  return (
    <AppLayout>
      <div className="landingpage">
        <div className="landingpage__conatiner App__container">
          <h1>
            Craft and showcase{" "}
            <span
              style={{
                backgroundImage: linearGradient,
              }}
            >
              stunning source codes
            </span>{" "}
            visually.
          </h1>
          <p>
            Clipr caters to developers, educators, content creators, and tech
            enthusiasts seeking an elegant way to showcase their code snippets
            visually.
          </p>
        </div>
        <div className="landingpage__texteditor App__container">
          <TextEditor
            color={color}
            setColor={setColor}
            formatRgb={formatRgb}
            setFormatRgb={setFormatRgb}
            rgbString={rgbString}
          />
        </div>
      </div>
    </AppLayout>
  );
}
