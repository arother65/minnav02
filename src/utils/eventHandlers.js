 //* drag&drop handling

  export async function fnOnDrop(event) {
    event.preventDefault()

    // console.log(playGround)
    console.log('dragSourceId', dragSourceId)

    // mark actual row/col-combination in playGround as USED 
    console.log('got ID: ', event.currentTarget.id)
    let id = ''
    id = event.currentTarget.id
    let splittedID = id.split('-')
    let rowId = splittedID[0]
    let colId = splittedID[1]

    // check if this row-col in playGround is already in use
    const cell = playGround[`row${rowId}`][`col${colId}`]
    console.log(cell)

    // check if row is already full
    const row = playGround[`row${rowId}`]
    console.log(row)

    if (cell.used === false) {
      cell.used = true

      // add new node
      let data = event.dataTransfer.getData("text/plain")
      console.log(data);
      event.target.appendChild(document.getElementById(data))

      // color the cell in use
      let className = event.currentTarget.className
      event.currentTarget.className = className + ' bg-success'

      // mark as used
      setPlayground(playGround)

      if (row.col0.used === true &&
        row.col1.used === true &&
        row.col2.used === true &&
        row.col3.used === true
      ) {
        console.log('row full! ID: ', rowId)
        event.stopPropagation()
        return
      }

    } else {
      // cell was already used 
      event.stopPropagation()
      return
    }
  }  // fnOnDrop(event) 

  export async function fnDragStart(event) {
    console.log('fnDragStart', event.target.id)
    //? write actualCoin to global memory
    setDragSourceId(event.target.id)

    event.currentTarget.style.opacity = "0.25"

    event.dataTransfer.setData("text/plain", event.target.id)  // text/html || text/plain
  }  // fnDragStart()

  export async function fnAllowDrop(event) {
    event.preventDefault()

    // console.log('fnAllowDrop', event)
    event.dataTransfer.effectAllowed = 'none'
    event.dataTransfer.dropEffect = 'copy'  // move
  }  // fnAllowDrop() / event onDragOver