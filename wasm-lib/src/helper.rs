pub struct Guess {
    pub word: String,
    pub mask: [Correctness; 5],
}

impl Guess {
    pub fn matches(&self, word: &str) -> bool {
        let mut used = [false; 5];
        for (i, (a, g)) in word.bytes().zip(self.word.bytes()).enumerate() {
            if a == g {
                if self.mask[i] != Correctness::Correct {
                    return false;
                }
                used[i] = true;
            } else if self.mask[i] == Correctness::Correct {
                return false;
            }
        }
        for (g, e) in self.word.bytes().zip(self.mask.iter()) {
            if *e == Correctness::Correct {
                continue;
            }
            if Correctness::is_misplaced(g, word, &mut used) != (*e == Correctness::Misplaced) {
                return false;
            }
        }
        true
    }
}

pub fn get_guesses(state: &str) -> Vec<Guess> {
    let guesses = state.split(',');
    guesses
        .into_iter()
        .map(|guess| {
            let mut guess_data = guess.split(':');
            let word = guess_data
                .next()
                .expect("word segment not found")
                .to_string();
            let raw_mask = guess_data
                .next()
                .expect("mask segment not found")
                .as_bytes();
            let mut mask = [Correctness::Correct; 5];
            for (idx, l) in raw_mask.iter().enumerate() {
                let correctness = match l {
                    b'1' => Correctness::Wrong,
                    b'2' => Correctness::Misplaced,
                    b'3' => Correctness::Correct,
                    _ => unimplemented!("invalid mask character"),
                };
                mask[idx] = correctness;
            }
            Guess { word, mask }
        })
        .collect()
}

pub fn enumerate_mask(c: &[Correctness; 5]) -> usize {
    c.iter().fold(0, |acc, c| {
        acc * 3
            + match c {
                Correctness::Correct => 0,
                Correctness::Misplaced => 1,
                Correctness::Wrong => 2,
            }
    })
}

pub const MAX_MASK_ENUM: usize = 3 * 3 * 3 * 3 * 3;

#[derive(Clone, PartialEq, Copy)]
pub enum Correctness {
    /// Green
    Correct,
    /// Yellow
    Misplaced,
    /// Grey
    Wrong,
}

impl Correctness {
    pub fn compute(answer: &str, guess: &str) -> [Self; 5] {
        let mut c = [Correctness::Wrong; 5];
        let answer_bytes = answer.as_bytes();
        let guess_bytes = guess.as_bytes();
        let mut misplaced = [0u8; (b'z' - b'a' + 1) as usize];
        for ((&answer, &guess), c) in answer_bytes.iter().zip(guess_bytes).zip(c.iter_mut()) {
            if answer == guess {
                *c = Correctness::Correct;
            } else {
                misplaced[(answer - b'a') as usize] += 1;
            }
        }
        for (&guess, c) in guess_bytes.iter().zip(c.iter_mut()) {
            if *c == Correctness::Wrong && misplaced[(guess - b'a') as usize] > 0 {
                *c = Correctness::Misplaced;
                misplaced[(guess - b'a') as usize] -= 1;
            }
        }
        c
    }

    fn is_misplaced(letter: u8, answer: &str, used: &mut [bool; 5]) -> bool {
        answer.bytes().enumerate().any(|(i, a)| {
            if a == letter && !used[i] {
                used[i] = true;
                return true;
            }
            false
        })
    }
}
