# Wordle Solver

This is my first frontend project created using React/Tailwind with a backend written in Rust (I could have went with WebAssembly but I could not get it to work with React for some reason so it will depend on a backend server for now). Apologies for any spaghetti code and my poor frontend design skills. The backend will be open-sourced at a later date.

This project uses a similar algorithm that 3blue1brown uses.

## Why must the starting word be "tares"?

Unfortunately to minimise the load placed on the backend server, starting with the word 'tares' is imperative. Maybe in the future when I manage to integrate WASM into this project will I remove this restriction.

## Credits

- Some of the backend code is taken from [Roget](https://github.com/jonhoo/roget).
- Some of the code for the grid design is taken from [Reactle](https://github.com/cwackerfuss/react-wordle).
