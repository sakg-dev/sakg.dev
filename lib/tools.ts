export const personalityToNumber = (arr: string[], delay: number): (number | string)[] => {
    const newArr = []
    for (let i = 0; i < arr.length; i++) newArr.push(arr[i], delay)
    return newArr
}

export const shuffleArr = (arr: string[]): string[] => {
    let currentIndex = arr.length;

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }

    return arr
}
