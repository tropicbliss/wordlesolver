use std::env;
use std::fs::File;
use std::io::{BufWriter, Write};
use std::path::Path;

const DICTIONARY: &str = include_str!("dictionary.txt");
const ANSWERS: &str = include_str!("answers.txt");

fn main() {
    println!("cargo:rerun-if-changed=dictionary.txt");
    println!("cargo:rerun-if-changed=answers.txt");
    let mut words = Vec::from_iter(DICTIONARY.lines().map(|line| {
        line.split_once(' ')
            .expect("every line is word + space + frequency")
    }));
    let answers = Vec::from_iter(ANSWERS.lines());
    let path = Path::new(&env::var("OUT_DIR").unwrap()).join("dictionary.rs");
    let mut file = BufWriter::new(File::create(&path).expect("could not create file in OUT_DIR"));
    let mut builder = phf_codegen::OrderedMap::new();
    words.sort_unstable_by_key(|(_, count)| {
        std::cmp::Reverse(count.parse::<usize>().expect("every count is a number"))
    });
    for (word, count) in words {
        let is_easy = answers.contains(&word);
        let data = format!("({}, {})", count, is_easy);
        builder.entry(word, &data);
    }
    write!(
        &mut file,
        "static WORDS: phf::OrderedMap<&'static str, (usize, bool)> = {}",
        builder.build()
    )
    .unwrap();
    writeln!(&mut file, ";").unwrap();
}
