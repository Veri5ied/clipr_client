"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { FiMinus } from "react-icons/fi";
import { IoIosSquareOutline, IoMdClose } from "react-icons/io";
import { languages } from "@codemirror/language-data";
import type { Color, ColorPickerProps } from "antd/es/color-picker";
import { ColorPicker, theme } from "antd";

interface TextEditorProps {
  color: Color | string | any;
  setColor: (value: Color | string | any) => void;
  formatRgb: ColorPickerProps["format"];
  setFormatRgb: (value: ColorPickerProps["format"]) => void;
  rgbString: string;
}

const TextEditor = ({
  color,
  setColor,
  formatRgb,
  setFormatRgb,
  rgbString,
}: TextEditorProps) => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [osType, setOsType] = useState<string>("mac");
  const [language, setLanguage] = useState<string>("javascript");
  const [languageSupport, setLanguageSupport] = useState<any>(null);

  useEffect(() => {
    const os = navigator.platform;
    if (os.includes("Mac")) {
      setOsType("mac");
    } else if (os.includes("Win")) {
      setOsType("windows");
    }
  }, []);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  const codesample = `const traverseTree = node => node && (traverseTree(node.left),
traverseTree(node.right));
  
const root = { value: 5, left: { value: 3, left: { value: 1 }, right: { value: 4 } }, right: { value: 7 } };
traverseTree(root);
`;

  //get the language data
  useEffect(() => {
    const languageSetup = async () => {
      const languageData =
        languages &&
        languages?.find(
          (lang) =>
            lang?.name?.toLocaleLowerCase() === language?.toLocaleLowerCase()
        );

      if (languageData) {
        const loadedlang = await languageData?.load();
        setLanguageSupport(loadedlang);
      }
    };

    languageSetup();
  }, [language]);

  useEffect(() => {
    let view: EditorView;
    if (!element || !languageSupport) return;

    let languageExtensions = [];
    if (languageSupport && Array.isArray(languageSupport.extension)) {
      languageExtensions = languageSupport.extension;
    }

    const state = EditorState.create({
      doc: codesample,
      extensions: [
        basicSetup,
        ...languageExtensions,
        EditorView.lineWrapping,
        EditorView.baseTheme({
          "&": {
            fontSize: "16px",
            fontFamily: "Clash Display",
            lineHeight: "24px",
            color: "#fff",
          },
          ".cm-scroller": {
            overflow: "hidden !important",
          },
          ".cm-content": {
            overflow: "hidden !important",
          },
          ".cm-gutters": {
            backgroundColor: "#1e1e1e",
            border: "none",
          },
          ".cm-line": {
            backgroundColor: "unset",
          },
          ".cm-activeLine": {
            backgroundColor: "unset",
          },
          ".cm-selectionBackground": {
            backgroundColor: "#1e1e1e",
          },
          ".cm-cursor": {
            borderLeft: "2px solid #fff",
          },
        }),
      ],
    });

    view = new EditorView({
      state,
      parent: element,
    });

    return () => {
      view?.destroy();
    };
  }, [codesample, element, languageSupport]);

  return (
    <>
      <div className="texteditor__panel-container">
        <ColorPicker
          format={formatRgb}
          value={color}
          onChange={setColor}
          onFormatChange={setFormatRgb}
          presets={[
            {
              label: <label>Quick Picks</label>,
              colors: [
                "#000000",
                "#000000E0",
                "#000000A6",
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
            },
          ]}
        />
      </div>
      <div
        className="texteditor__container"
        style={{
          backgroundColor: rgbString,
        }}
      >
        <div ref={ref} className="texteditor__panel">
          {osType === "mac" && (
            <div className="texteditor__macbar">
              <div className="mac-close"></div>
              <div className="mac-minimize"></div>
              <div className="mac-expand"></div>
            </div>
          )}
          {osType === "windows" && (
            <div className="texteditor__windowsbar">
              <div className="windows-close">
                <FiMinus size={18} />
              </div>
              <div className="windows-minimize">
                <IoIosSquareOutline size={18} />
              </div>
              <div className="windows-expand">
                <IoMdClose size={18} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TextEditor;
