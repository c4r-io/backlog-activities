"use client";
import React, { useEffect, useRef } from "react";
import TopCardUi from "./cards/TopCardUi.jsx";
import CodeMirror from "@uiw/react-codemirror";
import { createTheme } from "@uiw/codemirror-themes";
import { abcdef, xcodeDark } from "@uiw/codemirror-themes-all";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { tags as t } from "@lezer/highlight";
import { UiDataContext } from "../contextapi/UiDataProvider.jsx";
import { authorDaashboardApi } from "../utils/apibase.js";
import { toast } from "react-toastify";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdClear,
} from "react-icons/md";
import axios from "axios";
import ScrollToBottom from 'react-scroll-to-bottom';

const myTheme = createTheme({
  theme: "light",
  settings: {
    background: "#242525",
    backgroundImage: "",
    foreground: "#ffffff",
    caret: "#fff",
    selection: "#036dd626",
    selectionMatch: "#036dd626",
    lineHighlight: "#8a91991a",
    gutterBackground: "#854ABE6f",
    gutterForeground: "#fff",
  },
  styles: [
    { tag: t.comment, color: "#858585" },
    { tag: t.variableName, color: "#ffffff" },
    { tag: [t.string, t.special(t.brace)], color: "#a4a4a4" },
    { tag: t.number, color: "#907b9a" },
    { tag: t.bool, color: "#A46932" },
    { tag: t.null, color: "#A46932" },
    { tag: t.keyword, color: "#854ABE" },
    { tag: t.operator, color: "#A46932" },
    { tag: t.className, color: "#DD8B3C" },
    { tag: t.definition(t.typeName), color: "#A46932" },
    { tag: t.typeName, color: "#A46932" },
    { tag: t.angleBracket, color: "#A46932" },
    { tag: t.paren, color: "#fff" },
    { tag: t.brace, color: "#fff" },
    { tag: t.squareBracket, color: "#fff" },
    { tag: t.tagName, color: "#A46932" },
    { tag: t.attributeName, color: "#532688" },
    { tag: [t.function(t.variableName)], color: "#DD8B3C" },
  ],
});
// const extensions = [python()];
const extensions = [loadLanguage("python")];
const demoCode = `

# Python code demo
# This is an example
class Math:
    @staticmethod
    def fib(n: int):
        """Fibonacci series up to n."""
        a, b = 0, 1
        while a < n:
            yield a
            a, b = b, a + b
result = sum(Math.fib(42))
print("The answer is {}".format(result))

`;
const seabornDemoCode = `
import seaborn as sns
import matplotlib.pyplot as plt

url = 'https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv' # based on [Data repository for seaborn examples](https://github.com/mwaskom/seaborn-data)
from pyodide.http import open_url
import pandas
df = pandas.read_csv(open_url(url))

# create a seaborn plot
sns.set(style="darkgrid")
ax = sns.scatterplot(x="total_bill", y="tip", data=df)

plt.show()

`;
export default function MainView() {
  let pyodide = useRef(null);
  let pyodideLoaded = useRef(null);

  const [code, setCode] = React.useState("");
  const [isCodeExecuting, setIsCodeExecuting] = React.useState(false);
  const [isCodeFormating, setIsCodeFormating] = React.useState(false);
  const [isIssueSubmitting, setIsIssueSubmitting] = React.useState(false);
  const [isIssueSubmitted, setIsIssueSubmitted] = React.useState(false);
  const [packagesLoading, setPackagesLoading] = React.useState(false);
  const [issueDiscription, setIssueDiscription] = React.useState(null);
  const [issueAttachment, setIssueAttachment] = React.useState(null);
  const [executedCodeOutput, setExecutedCodeOutput] = React.useState([]);
  const [executedCodeImageOutput, setExecutedCodeImageOutput] = React.useState([]);
  const [executedCodeErrorOutput, setExecutedCodeErrorOutput] = React.useState(null);
  const [expandBottomSection, setExpandBottomSection] = React.useState(true);
  const handleExpandBottomSection = () => {
    setExpandBottomSection(!expandBottomSection);
  };

  const { uiData, dispatchUiData } = React.useContext(UiDataContext);

  async function getReadyPyodide() {
    if (pyodideLoaded.current == true) {
      pyodide.current = await loadPyodide();
      await pyodide.current.loadPackage("micropip");
      await pyodide.current.loadPackage("sympy");
      const micropip = pyodide.current.pyimport("micropip");
      await micropip.install("matplotlib");
      await micropip.install("numpy");
      await micropip.install("autopep8");
      // await micropip.install("rpy2");
      await micropip.install("seaborn"); // dynamic loads not working in pyodide
      await micropip.install("pandas");
      await micropip.install("datasets");
      await micropip.install("sympy");
      await micropip.install("sklearn"); // showing problem
      await micropip.install("scikit-learn"); // showing problem
      await micropip.install("scipy"); // showing problem
      // sympy,sklearn, scipy
    }
  }
  // useEffect(() => {
  //   if (pyodide.current == null) {
  //     const script = document.createElement("script");
  //     script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
  //     script.type = "text/javascript";
  //     document.head.appendChild(script);
  //     pyodideLoaded.current = true;
  //     console.log("pyodide script added");
  //   }
  //   if (pyodideLoaded.current == true) {
  //     console.log("pyodide loaded");

  //   }
  // }, [pyodideLoaded.current]);
  const handleOnChange = (e) => {
    setCode(e);
  };
  async function getUiData() {
    const config = {
      method: "get",
      url: "/api/pythonExecutorUi",
    };
    try {
      const response = await authorDaashboardApi.request(config);
      dispatchUiData({
        type: "getUiData",
        payload: response.data.pythonExecutorUis[0],
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  const pltshow = `
import json
from io import BytesIO
buf = BytesIO()
plt.savefig(buf, format="svg")
buf.seek(0)
output = {}
output["type"] = "image"
output["content"] = buf.read().decode("utf-8")
print(json.dumps(output))`;
  const pep8FromatEer = `
import autopep8

code = """
{codestring}
"""
print(autopep8.fix_code(code))`;

  function preparedCodeForPep8() {
    return pep8FromatEer.replaceAll("{codestring}", code);
  }
  const pythonExecutorApi = axios.create({
    baseURL: "https://em8ez2rypi.execute-api.us-east-2.amazonaws.com",
  });
  const runCode = async (apiCallCount = 1) => {
    if (code == "") {
      toast.error("Please enter code to execute");
      return;
    }
    const nc = code.replaceAll("plt.show()", pltshow);
    // const nc2 = nc.replaceAll(/print\((.*?)\)/g, "$1");
    console.log(nc);
    setIsCodeExecuting(true);
    try {
      const config = {
        method: "post",
        url: "default",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          code: `print('New Code Running...')\n${nc}`,
        }
      }
      const response = await pythonExecutorApi.request(config);
      if (response.data?.body) {
        const output = JSON.parse(response.data?.body)?.output;
        const error = JSON.parse(response.data?.body)?.error;
        const op = []
        const imagesList = []
        if (output) {
          for (const [key, value] of Object.entries(output)) {
            if (value != 'New Code Running...') {
              try {
                const data = JSON.parse(value)
                if (data.type == "image") {
                  imagesList.push(data.content)
                }
              } catch (e) {
                if (!value.includes("Matplotlib created a temporary cache directory at")) {
                  op.push(value)
                }
              }

            }
          }
          setExecutedCodeImageOutput(imagesList)
          setExecutedCodeOutput(op);
        }
        if (error) {
          setExecutedCodeErrorOutput("Error: " + error);
        }
        // console.log(op)
      } else if (response.data?.errorMessage) {
        setExecutedCodeErrorOutput(response.data?.body);
      }
      setIsCodeExecuting(false);
      setExpandBottomSection(true);
    } catch (error) {
      if (apiCallCount <= 3) {
        setTimeout(() => {
          console.log("running count", apiCallCount);
          runCode(apiCallCount + 1);
        }, 5000 * apiCallCount);
      } else {
        setExecutedCodeOutput({
          output: null,
          error: error,
        });
        setIsCodeExecuting(false);
      }
      // getReadyPyodide()
      console.error(error);
    }
  };
  const formatCodeWithPep8 = async (apiCallCount = 1) => {
    if (code == "") {
      toast.error("Please enter code to execute");
      return;
    }
    const fc = preparedCodeForPep8();

    setIsCodeFormating(true);
    try {

      const config = {
        method: "post",
        url: "default",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          code: `print('New Code Running...')\n${fc}`,
        }
      }
      const response = await pythonExecutorApi.request(config);

      const output = JSON.parse(response.data?.body)?.output;
      let op = ""
      for (const [key, value] of Object.entries(output)) {
        if (value != 'New Code Running...') {
          op += "\n" + value
        }
      }
      setCode(op);
      setIsCodeFormating(false);
    } catch (error) {
      if (apiCallCount <= 3) {
        setTimeout(() => {
          console.log("running count", apiCallCount);
          formatCodeWithPep8(apiCallCount + 1);
        }, 5000 * apiCallCount);
      } else {
        setExecutedCodeOutput({ error: error });
        setIsCodeFormating(false);
      }
      // getReadyPyodide()
      console.error(error);
    }
  };
  const createSamplePythonExecutorIssueList = async () => {
    if (issueDiscription == null) {
      toast.error("Please enter issue description", {
        position: "top-center",
      });
      return;
    }
    const config = {
      method: "post",
      url: "api/pythonExecutorIssueList",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: {
        description: issueDiscription,
        attachment: issueAttachment,
      },
    };
    setIsIssueSubmitting(true);
    try {
      const response = await authorDaashboardApi.request(config);
      console.log(response.data);
      setIsIssueSubmitting(false);
      toast.success("Your Issue Submitted Successfully!", {
        position: "top-center",
      });
      setIssueDiscription(null);
      setIssueAttachment(null);
    } catch (error) {
      if (error?.response?.status == 401) {
        toast.error(error.response.data.message + ". Login to try again.", {
          position: "top-center",
        });
        router.push("/");
      } else {
        toast.error(error.message, {
          position: "top-center",
        });
      }
      console.error(error);
      setIsIssueSubmitting(false);
    }
  };
  useEffect(() => {
    if (!uiData.uiContentss) {
      getUiData();
    }
  });
  const pc = `
  str = "Hello World"
  print(str)
  `;
  return (
    <div className="annotation">
      {/* <div className="bg-black text-white">{JSON.stringify(uiData)}</div> */}
      <TopCardUi />
      <div className="ps-4 pe-14 widget">
        <div className="mx-3 p-1 pb-0 border-x-2 space-y-3 border-ui-violet rounded-xl bg-[#171819] text-white">
          <div className="p-3 pb-0 mt-3">
            <CodeMirror
              value={code}
              onChange={(e) => {
                handleOnChange(e);
              }}
              height="400px"
              theme={myTheme}
              extensions={extensions}
            />
          </div>
          <div className="px-3 pt-0 flex justify-between buttons -m-2">
            <div className="passive w-1/2 m-2">
              <button
                className={`${isCodeFormating ? "clicked" : "unclicked"
                  } py-2 px-3 w-full`}
                onClick={() => formatCodeWithPep8()}
              >
                PEP8
              </button>
            </div>
            <div className="progressive w-1/2 m-2">
              <button
                className={`${isCodeExecuting ? "clicked" : "unclicked"
                  } py-2 px-3 w-full`}
                onClick={() => runCode()}
              >
                {isCodeExecuting ? "Executing" : "Execute"}
              </button>
            </div>
          </div>
          {expandBottomSection && executedCodeOutput && (
            <div className="px-3 space-y-3">
              <div className="divider w-full"></div>
              <div className="relative group">
                <button
                  className="absolute top-0 right-0 text-white group-hover:block hidden"
                  onClick={() => {
                    setExecutedCodeOutput(null);
                  }}
                >
                  <MdClear />
                </button>
                <div
                  className="px-2 py-1 codeoutput-bg text-white"
                  id="codeoutput-bg"
                > {
                    executedCodeImageOutput?.map((op, index) => {
                      return (
                        <div key={index} dangerouslySetInnerHTML={{ __html: op }}></div>)
                    })
                  }
                  {executedCodeOutput && executedCodeOutput.length !== 0 && (
                    <ScrollToBottom className="w-full h-[400px]">
                      {executedCodeOutput?.map((op, index) => {
                        return (
                          <div key={index}>
                            <p>{op}</p>
                          </div>
                        )
                      })}
                    </ScrollToBottom>
                  )}
                  {executedCodeErrorOutput && (
                    <ScrollToBottom className="w-full h-[400px]">

                      <div className="text-red-500">
                        {executedCodeErrorOutput.split("\n").map((op, index) => {
                          return <p>{executedCodeErrorOutput}</p>
                        })
                        }
                      </div>

                    </ScrollToBottom>
                  )}
                </div>
              </div>
            </div>
          )}
          {!expandBottomSection && (
            <div className="px-3 space-y-3">
              <div className="divider w-full"></div>
              <div className="h-64 codeoutput-bg">
                <textarea
                  className="h-full w-full m-0 px-2 py-1 codeoutput-bg text-white"
                  type="textarea"
                  placeholder="Describe your issue here"
                  value={issueDiscription || ""}
                  onChange={(e) => {
                    setIssueDiscription(e.target.value);
                  }}
                />
              </div>
              <div className="mt-0 buttons w-full h-20 relative">
                <label
                  className="opacity-0 w-full h-20 absolute"
                  htmlFor="issueFile"
                >
                  Attach Schreenshot {issueAttachment?.name}
                </label>
                <input
                  className="opacity-0 w-full h-20 absolute"
                  id="issueFile"
                  type="file"
                  placeholder="Describe your issue here"
                  onInput={(e) => {
                    setIssueAttachment(e.target.files[0]);
                  }}
                />
                <div className="passive">
                  <button
                    className={`${issueAttachment ? "clicked" : "unclicked"
                      } py-2 px-3 w-full h-20`}
                  >
                    {issueAttachment ? "Attached Again" : "Attach Schreenshot"}
                  </button>
                </div>
              </div>
              <div className=" buttons w-full h-12">
                <div className="progressive">
                  <button
                    className={`${isIssueSubmitting
                      ? "clicked pointer-events-none"
                      : "unclicked"
                      } py-2 px-3 w-full h-12`}
                    onClick={createSamplePythonExecutorIssueList}
                  >
                    {isIssueSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="pb-2"></div>
        </div>
        {/* expansion btn */}
        <div className="mx-6 expando">
          <button
            className="px-2 w-full flex justify-between items-center bg-ui-violet text"
            onClick={() => handleExpandBottomSection()}
          >
            <div className="w-[30px] flex justify-center text-lg">
              {expandBottomSection ? (
                <MdKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowUp />
              )}
            </div>
            <p className="text-center text-[10px]">
              {expandBottomSection ? "Running Into Issue" : "Close"}
            </p>
            <div className="w-[30px] flex justify-center text-lg">
              {expandBottomSection ? (
                <MdKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowUp />
              )}
            </div>
          </button>
        </div>
        {/* {runningIssueStatus (
        )} */}
      </div>
    </div>
  );
}
