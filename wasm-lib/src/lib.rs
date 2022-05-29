mod algorithm;
mod helper;
mod utils;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

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
