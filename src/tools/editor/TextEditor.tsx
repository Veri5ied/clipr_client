"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { FiMinus } from "react-icons/fi";
import { IoIosSquareOutline, IoMdClose } from "react-icons/io";
import { languages } from "@codemirror/language-data";
import type { Color, ColorPickerProps } from "antd/es/color-picker";
import { ColorPicker, Select } from "antd";
import { themeArray } from "@/app/themes";
import { FaApple, FaWindows } from "react-icons/fa";

import {
  tomorrow,
  solarizedLight,
  smoothy,
  rosePineDawn,
  noctisLilac,
  espresso,
  dracula,
  cobalt,
  coolGlow,
  clouds,
  boysAndGirls,
  barf,
  bespin,
  birdsOfParadise,
  ayuLight,
  amy,
} from "thememirror";

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
  const [theme, setTheme] = useState<any>("dracula");
  const [themeSupport, setThemeSupport] = useState<any>(null);

  const editorView = useRef<EditorView | null>(null);
  const editorContent = useRef<string>("");

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  const codesample = `const traverseTree = node => node && (traverseTree(node.left),
traverseTree(node.right));
  
const root = { value: 5, left: { value: 3, left: { value: 1 }, right: { value: 4 } }, right: { value: 7 } };
traverseTree(root);
`;

  //switch themes
  useEffect(() => {
    switch (theme) {
      case "tomorrow":
        setThemeSupport(tomorrow);
        break;
      case "solarizedLight":
        setThemeSupport(solarizedLight);
        break;
      case "smoothy":
        setThemeSupport(smoothy);
        break;
      case "rosePineDawn":
        setThemeSupport(rosePineDawn);
        break;
      case "noctisLilac":
        setThemeSupport(noctisLilac);
        break;
      case "espresso":
        setThemeSupport(espresso);
        break;
      case "dracula":
        setThemeSupport(dracula);
        break;
      case "cobalt":
        setThemeSupport(cobalt);
        break;
      case "coolGlow":
        setThemeSupport(coolGlow);
        break;
      case "clouds":
        setThemeSupport(clouds);
        break;
      case "boysAndGirls":
        setThemeSupport(boysAndGirls);
        break;
      case "barf":
        setThemeSupport(barf);
        break;
      case "bespin":
        setThemeSupport(bespin);
        break;
      case "birdsOfParadise":
        setThemeSupport(birdsOfParadise);
        break;
      case "ayuLight":
        setThemeSupport(ayuLight);
        break;
      case "amy":
        setThemeSupport(amy);
        break;
      default:
        setThemeSupport(dracula);
        break;
    }
  }, [theme]);

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
      doc: editorContent.current || codesample,
      extensions: [
        basicSetup,
        ...languageExtensions,
        themeSupport,
        EditorView.lineWrapping,
        EditorView.baseTheme({
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

    editorView.current = new EditorView({
      state,
      parent: element,
    });

    view = editorView.current;

    return () => {
      view?.destroy();
    };
  }, [codesample, element, languageSupport, theme, themeSupport]);

  const handleThemeChange = (value: any) => {
    if (editorView.current) {
      editorContent.current = editorView.current.state.doc.toString();
    }
    setTheme(value);
  };

  const handleImageDownload = () => {};

  return (
    <>
      <div className="texteditor__panel-container">
        <div className="texteditor-panel-item">
          <h4>Background:</h4>
          <ColorPicker
            format={formatRgb}
            value={color}
            onChange={setColor}
            onFormatChange={setFormatRgb}
            arrow={false}
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
        <div className="texteditor-panel-item">
          <h4>Language:</h4>
          <Select
            showSearch
            className="texteditor__select"
            placeholder="Search to Select"
            optionFilterProp="children"
            value={
              languages &&
              languages
                .map((lang) => lang.name)
                .find(
                  (lang) =>
                    lang?.toLocaleLowerCase() === language?.toLocaleLowerCase()
                )
            }
            virtual={false}
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={
              languages &&
              languages.map((lang) => ({
                label: lang.name,
                value: lang.name,
              }))
            }
            onChange={(value) => setLanguage(value)}
          />
        </div>
        <div className="texteditor-panel-item">
          <h4>Editor Theme:</h4>
          <Select
            showSearch
            className="texteditor__select"
            placeholder="Search to Select"
            optionFilterProp="children"
            virtual={false}
            value={theme}
            options={themeArray.map((tim, index) => ({
              label: tim.label,
              value: tim.value,
              key: `${tim.key}-${index}`,
            }))}
            onChange={(value) => handleThemeChange(value)}
          />
        </div>
        <div className="texteditor-panel-item">
          <h4>Platform:</h4>
          <div
            className="platform__item"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <FaApple
              size={23}
              onClick={() => setOsType("mac")}
              style={{
                color: osType === "mac" ? "#fff" : "#000",
                cursor: "pointer",
              }}
            />
            <FaWindows
              size={23}
              onClick={() => setOsType("windows")}
              style={{
                color: osType === "windows" ? "#fff" : "#000",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div className="texteditor-panel-item">
          <h4>Export As PNG</h4>
          <button onClick={handleImageDownload}>Download</button>
        </div>
      </div>
      {rgbString && (
        <div
          className="texteditor__container"
          style={{
            backgroundColor: rgbString,
            minHeight: "90px",
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
                  <FiMinus
                    size={18}
                    color={
                      theme === "tomorrow" ||
                      theme === "solarizedLight" ||
                      theme === "smoothy" ||
                      theme === "rosePineDawn" ||
                      theme === "noctisLilac" ||
                      theme === "espresso" ||
                      theme === "dracula" ||
                      theme === "cobalt" ||
                      theme === "coolGlow" ||
                      theme === "clouds" ||
                      theme === "bespin" ||
                      theme === "birdsOfParadise" ||
                      theme === "ayuLight" ||
                      theme === "amy"
                        ? "#000"
                        : "#fff"
                    }
                  />
                </div>
                <div className="windows-minimize">
                  <IoIosSquareOutline
                    size={18}
                    color={
                      theme === "tomorrow" ||
                      theme === "solarizedLight" ||
                      theme === "smoothy" ||
                      theme === "rosePineDawn" ||
                      theme === "noctisLilac" ||
                      theme === "espresso" ||
                      theme === "dracula" ||
                      theme === "cobalt" ||
                      theme === "coolGlow" ||
                      theme === "clouds" ||
                      theme === "bespin" ||
                      theme === "birdsOfParadise" ||
                      theme === "ayuLight" ||
                      theme === "amy"
                        ? "#000"
                        : "#fff"
                    }
                  />
                </div>
                <div className="windows-expand">
                  <IoMdClose
                    size={18}
                    color={
                      theme === "tomorrow" ||
                      theme === "solarizedLight" ||
                      theme === "smoothy" ||
                      theme === "rosePineDawn" ||
                      theme === "noctisLilac" ||
                      theme === "espresso" ||
                      theme === "dracula" ||
                      theme === "cobalt" ||
                      theme === "coolGlow" ||
                      theme === "clouds" ||
                      theme === "bespin" ||
                      theme === "birdsOfParadise" ||
                      theme === "ayuLight" ||
                      theme === "amy"
                        ? "#000"
                        : "#fff"
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TextEditor;
