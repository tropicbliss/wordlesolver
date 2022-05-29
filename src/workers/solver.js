import init, { compute } from "wasm-lib";

onmessage = (e) => {
  init().then(() => {
    const data = e.data;
    const result = compute(data.state, data.isHardMode);
    postMessage(result);
  });
};
