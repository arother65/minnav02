//

//
export default function IterateEncryptedArr({ data, setReadableString }) {

    // const displayData = new DataView(data).setInt16(0, 256, true /* littleEndian */)
    const displayData = new DataView(data)

    let returnString = ''
    let returnStringWithSpaces = ''
    for (let i = 0; i < displayData.byteLength; i++) {
        returnString = returnString + displayData.getUint8(i).toString()
        returnStringWithSpaces = returnStringWithSpaces + displayData.getUint8(i).toString() + ' '
    }

    setReadableString(returnString)
    return (returnString)
}  // IterateEncryptedArr()