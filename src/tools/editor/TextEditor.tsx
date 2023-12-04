"use client";
import { useState, useEffect, useCallback } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";

const TextEditor = () => {
  const [element, setElement] = useState<HTMLElement | null>(null);

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
      <div ref={ref} className="texteditor__panel"></div>
    </div>
  );
};

export default TextEditor;
