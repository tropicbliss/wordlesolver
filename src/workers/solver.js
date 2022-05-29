import init, { compute } from "wasm-lib";

let wasm;

onmessage = async (e) => {
  if (!wasm) {
    wasm = await init();
    console.log("hi");
  }
  const data = e.data;
  const result = compute(data.state, data.isHardMode);
  postMessage(result);
};
