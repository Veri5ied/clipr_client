"use client";
import { useState, useEffect, useCallback } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { FiMinus } from "react-icons/fi";
import { IoIosSquareOutline, IoMdClose } from "react-icons/io";
import { languages } from "@codemirror/language-data";

const TextEditor = () => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [osType, setOsType] = useState<string>("mac");
  const [language, setLanguage] = useState<string>("javascript");
  const [languageSupport, setLanguageSupport] = useState<any>(null);

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
        console.log(loadedlang);
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
            backgroundColor: "#1e1e1e",
          },
          ".cm-activeLine": {
            backgroundColor: "#1e1e1e",
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
    <div className="texteditor__container">
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
  );
};

export default TextEditor;
