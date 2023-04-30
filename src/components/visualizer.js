export default function Visualizer({ list, borderColor }) {

  return (
    <div className={`border border-2 ${borderColor} rounded-4 p-3 py-5`}>
      {
        list.map((number, index) => (
          <div key={index} className="border border-light rounded d-inline-block" style={{height: `${number}px`, width: "1.5625%"}}></div>
        ))
      }
    </div>
  )
}