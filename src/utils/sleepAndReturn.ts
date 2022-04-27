
const sleepAndReturn = async (timeout: number, value: any): Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value)
        }, timeout)
    })
}

export default sleepAndReturn
