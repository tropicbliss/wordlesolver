use std::env;
use std::fs::File;
use std::io::{BufWriter, Write};
use std::path::Path;

const DICTIONARY: &str = include_str!("dictionary.txt");

fn main() {
    let mut words = Vec::from_iter(DICTIONARY.lines().map(|line| {
        line.split_once(' ')
            .expect("every line is word + space + frequency")
    }));
    let path = Path::new(&env::var("OUT_DIR").unwrap()).join("dictionary.rs");
    let mut file = BufWriter::new(File::create(&path).expect("could not create file in OUT_DIR"));
    let mut builder = phf_codegen::OrderedMap::new();
    words.sort_unstable_by_key(|(_, count)| {
        std::cmp::Reverse(count.parse::<usize>().expect("every count is a number"))
    });
    for (word, count) in words {
        builder.entry(word, count);
    }
    write!(
        &mut file,
        "static WORDS: phf::OrderedMap<&'static str, usize> = {}",
        builder.build()
    )
    .unwrap();
    writeln!(&mut file, ";").unwrap();
}
