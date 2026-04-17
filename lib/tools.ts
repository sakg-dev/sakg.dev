export const personalityToNumber = (arr: string[], delay: number): (number | string)[] => {
    const newArr = []
    for (let i = 0; i < arr.length; i++) newArr.push(arr[i], delay)
    return newArr
}