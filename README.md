# Wordle Solver

This is my first major frontend project created using React/Tailwind/WebAssembly.

This project uses a similar algorithm that 3blue1brown uses.

## Credits

- Some of the Wasm code is taken from [Roget](https://github.com/jonhoo/roget).
- Some of the code for the grid and keyboard design is taken from [Reactle](https://github.com/cwackerfuss/react-wordle).

## Build

### Running in production with a Docker container

1. Build image.

```sh
docker build -t wsol:prod .
```

2. Run container on port 8080.

```sh
docker run -d -p 8080:80 wsol:prod
```

### Running locally with a development build

1. Build Wasm module (optional as the Wasm module is already included in the repo). Take note that [Rust](https://rustup.rs/), the `wasm32-unknown-unknown` target (installed via rustup), and [`wasm-pack`](https://github.com/rustwasm/wasm-pack/) needs to be installed.

```sh
npm run build:wasm
```

2. Build React project and run the app on localhost.

```sh
npm run start
```
