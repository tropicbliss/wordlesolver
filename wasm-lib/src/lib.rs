mod algorithm;
mod helper;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[derive(Serialize, Deserialize)]
struct Outcome {
    guess: &'static str,
    count: usize,
}

#[wasm_bindgen]
pub fn compute(state: &str, blocked: JsValue, hard_mode: bool) -> JsValue {
    let blocked: Vec<String> = blocked.into_serde().unwrap();
    let history = helper::get_guesses(state);
    let data = algorithm::Algorithm::guess(&history, &blocked, !hard_mode);
    let result = data.map(|r| Outcome {
        guess: r.guess,
        count: r.count,
    });
    JsValue::from_serde(&result).unwrap()
}
