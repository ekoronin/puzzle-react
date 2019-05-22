// fischer-yates shuffle algorithm
//does not modify original array
export const shuffle = (array) => {
    const shuffled = [...array];

    shuffled.forEach((_, index, array) => {
        const random = Math.floor(Math.random() * index);
        [array[random], array[index]] = [array[index], array[random]];
    })

    return shuffled;
}

// In general, for a given grid of width N, we can find out check if a N*N – 1
// puzzle is solvable or not by following below simple rules : 
// - If N is odd, then
// puzzle instance is solvable if number of inversions is even in the input
// state. 
// -If N is even, puzzle instance is solvable 
// -- if the blank is on an even
// row counting from the bottom (second-last, fourth-last, etc.) and number of
// inversions is odd. 
// -- the blank is on an odd row counting from the bottom (last,
// third-last, fifth-last, etc.) and number of inversions is even. 
// -For all other cases, the puzzle instance is not solvable.
const solvable = (dimension, numbers) => {
    const inversions = numbers.map((number, index) => numbers
                                    .slice(index + 1)
                                    .reduce((inversions, nextNumber) => inversions + Number(nextNumber && nextNumber < number), 0))
                        .reduce((acc, inv) => acc + inv, 0);

    if (dimension % 2 === 0) {
        const blankIndex = numbers.findIndex(number => number === 0);
        const rowFromBottom = dimension - Math.floor(blankIndex / dimension);

        return (inversions % 2 === 1 && rowFromBottom % 2 === 0) || (inversions % 2 === 0 && rowFromBottom % 2 === 1)
    } else {
        return inversions % 2 === 0;
    }
}

//shuffles the provided array of keys to check for solvability of the puzzle
//the rules are in utils/solvable
export const shuffleWithInversions = (dimension, array) => {
    let newArray = [...array];
    do {
      newArray = shuffle(newArray);
    } while (solvable(dimension, newArray))
    
    return newArray;
  }

//format time from seconds to HH:mm:ss
export const formatTime = seconds => {
    const hour = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds - hour * 3600) / 60)).padStart(2, '0');
    const sec = String(seconds - (hour * 3600) - (minutes * 60)).padStart(2, '0');
    return `${hour}:${minutes}:${sec}`;
}