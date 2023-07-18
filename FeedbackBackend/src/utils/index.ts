export function areContiguousIntegersStartingFromOne(numbers: number[]): boolean {
    if (numbers.length === 0) {
        return false;
    }

    const sortedNumbers = numbers.slice().sort((a, b) => a - b);

    if (sortedNumbers[0] !== 1) {
        return false;
    }

    for (let i = 1; i < sortedNumbers.length; i++) {
        if (sortedNumbers[i] - sortedNumbers[i - 1] !== 1) {
            return false;
        }
    }

    return true;
}