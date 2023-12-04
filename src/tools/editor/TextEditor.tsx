"use client";
import { useState, useEffect, useCallback } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { FiMinus } from "react-icons/fi";
import { IoIosSquareOutline, IoMdClose } from "react-icons/io";

const TextEditor = () => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [osType, setOsType] = useState<string>("mac");

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  useEffect(() => {
    let view: EditorView;

    if (!element) return;

    const state = EditorState.create({
      doc: "const a = 1;",
      extensions: [basicSetup, javascript()],
    });

    view = new EditorView({
      state,

      parent: element,
    });

    return () => {
      view?.destroy();
    };
  }, [element]);

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
