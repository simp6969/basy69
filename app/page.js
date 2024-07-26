"use client";

import { useState } from "react";
import { isBase64 } from "is-base64";

export default function HomePage() {
  const [pageState, setPageState] = useState({
    renderImage: false,
    base64: "",
    continue: false,
    errorPopUp: false,
  });
  function handleBase64(e) {
    if (e.target.value) {
      setPageState({ ...pageState, base64: e.target.value, continue: true });
    }
  }
  function handlePageRender() {
    if (pageState.continue) {
      if (isBase64(pageState.base64, { allowMime: true })) {
        setPageState({ ...pageState, renderImage: true });
      } else {
        setPageState({ ...pageState, errorPopUp: true });
        setTimeout(() => {
          setPageState({ ...pageState, errorPopUp: false });
        }, 2000);
      }
    }
  }
  console.log(pageState);
  return (
    <div className="duration-500 w-[200vw] h-[100vh] flex">
      {pageState.errorPopUp ? (
        <div className="errorPopup">Invalid base64 string</div>
      ) : null}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          alignItems: "center",
          flexDirection: "column",
        }}
        className={pageState.renderImage ? "hidePage1" : "showPage1"}
      >
        <h1 className="text-[#FAC9B8] text-[40px] font-bold">
          Powerful Base64 to Image Converter
        </h1>
        <div className="flex duration-300 items-center h-[69px] ">
          <input
            spellCheck="false"
            type="text"
            onChange={handleBase64}
            className="w-[350px] duration-[600ms] h-[69px] rounded-[20px] bg-[#FAC9B8] p-[20px]  text-[#212121]"
            placeholder="Enter base64 string"
          ></input>
          <button
            className={
              pageState.continue
                ? "continueButton"
                : "w-[60px] h-[60px] hover:cursor-default"
            }
            onClick={handlePageRender}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#212121"
              viewBox="0 0 448 512"
              height={40}
              width={40}
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </button>
        </div>
      </div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className={pageState.renderImage ? "showPage1" : "hidePage1"}
      >
        <img
          className="rounded-[20px] max-w-[1000px] max-h-[700px]"
          src={pageState.base64}
        />
        <button
          className="continueButton"
          onClick={() =>
            setPageState({
              renderImage: false,
              base64: "",
              continue: false,
              errorPopUp: false,
            })
          }
        >
          go back
        </button>
      </div>
    </div>
  );
}
