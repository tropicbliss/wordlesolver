mod algorithm;
mod helper;
mod utils;

use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn compute(state: &str, hard_mode: bool) -> JsValue {
    let history = helper::get_guesses(state);
    let data = algorithm::guess(&history, !hard_mode);
    serde_wasm_bindgen::to_value(&data).unwrap()
}
