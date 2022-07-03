import init, { compute } from "wasm-lib";

onmessage = async (e) => {
  const data = e.data;
  if (data === null) {
    await init();
    postMessage(null);
    return;
  }
  const result = compute(data.state, data.isHardMode);
  postMessage(result);
};
