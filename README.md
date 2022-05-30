# Wordle Solver

This is my first major frontend project created using React/Tailwind/WebAssembly. Apologies for any spaghetti code and my poor frontend design skills. This project should be feature complete though it should be noted that I took a few shortcuts to make this project easier for myself to develop.

This project uses a similar algorithm that 3blue1brown uses.

## Credits

- Some of the WebAssembly code is taken from [Roget](https://github.com/jonhoo/roget).
- Some of the code for the grid and keyboard design is taken from [Reactle](https://github.com/cwackerfuss/react-wordle).

## Build

1. Build WASM module (optional as this WASM module is already included in this repo). Take note that `wasm-pack`(https://github.com/rustwasm/wasm-pack) needs to be installed.

```sh
npm run build:wasm
```

2. Build React project.

```sh
npm run build
```

Alternatively, you can run this project on `localhost`.

```sh
npm run start
```
