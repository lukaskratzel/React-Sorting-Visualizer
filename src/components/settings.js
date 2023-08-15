

export default function Settings({ setSettings, resetList }) {

  const handleRun = () => {
    const delay = document.getElementById("delayTime").value;
    const algorithm = document.getElementById("algorithmSelector").value;

    setSettings({
      delay : delay ? Number(delay) : 100,
      algorithm : algorithm,
      run: true,
    });
  }

  return (
    <div className="row justify-content-center">
      <select
        name="algorithm"
        id="algorithmSelector"
        className="m-2 col-auto bg-dark text-light border-light rounded"
      >
        <option value="BubbleSort">BubbleSort</option>
        <option value="SelectionSort">SelectionSort</option>
        <option value="InsertionSort">InsertionSort</option>
        <option value="QuickSort">QuickSort</option>
        <option value="MergeSort">MergeSort</option>
      </select>

      <input
        type="text"
        name="input"
        placeholder="Delay Time (ms)"
        id="delayTime"
        className="m-2 col-auto bg-dark text-light border border-light rounded"
      />

      <button onClick={handleRun} className="btn btn-outline-light m-2 px-4 col-auto">Run</button>

      <button onClick={resetList} className="btn btn-outline-light m-2 px-4 col-auto"><svg id="Layer_1" width="24px" height="24px"  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 118.04 122.88"><path fill="rgb(248,249,250)" d="M16.08,59.26A8,8,0,0,1,0,59.26a59,59,0,0,1,97.13-45V8a8,8,0,1,1,16.08,0V33.35a8,8,0,0,1-8,8L80.82,43.62a8,8,0,1,1-1.44-15.95l8-.73A43,43,0,0,0,16.08,59.26Zm22.77,19.6a8,8,0,0,1,1.44,16l-10.08.91A42.95,42.95,0,0,0,102,63.86a8,8,0,0,1,16.08,0A59,59,0,0,1,22.3,110v4.18a8,8,0,0,1-16.08,0V89.14h0a8,8,0,0,1,7.29-8l25.31-2.3Z"/></svg></button>
    </div>
  )
}