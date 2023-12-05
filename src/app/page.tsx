"use client";
import { useState, useMemo } from "react";
import AppLayout from "@/layout/AppLayout";
import TextEditor from "@/tools/editor/TextEditor";
import type { Color, ColorPickerProps } from "antd/es/color-picker";

export default function Home() {
  const [color, setColor] = useState<Color | string | any>("rgb(255, 0, 255)");
  const [formatRgb, setFormatRgb] = useState<ColorPickerProps["format"]>("rgb");

  const rgbString = useMemo(
    () => (typeof color === "string" ? color : color.toRgbString()),
    [color]
  );

  const linearGradient = useMemo(
    () => `linear-gradient(to right, ${rgbString}, ${rgbString})`,
    [rgbString]
  );

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
