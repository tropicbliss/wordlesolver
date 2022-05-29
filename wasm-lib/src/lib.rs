mod algorithm;
mod helper;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize)]
struct Result {
    guess: &'static str,
    count: usize,
}

#[wasm_bindgen]
pub fn compute(state: &str, hard_mode: bool) -> JsValue {
    let history = helper::get_guesses(state);
    let data = algorithm::Algorithm::guess(&history, !hard_mode);
    let result = data.map(|r| Result {
        guess: r.guess,
        count: r.count,
    });
    JsValue::from_serde(&result).unwrap()
}
