import { useEffect, useState } from "react";
import Visualizer from "./visualizer"
import Settings from "./settings"


function generateRandomList() {
  const numbers = [...Array(64).keys()].map((n) => (n + 5) * 5);
  const randomList = [];

  while (numbers.length) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const randomNumber = numbers.splice(randomIndex, 1)[0];
    randomList.push(randomNumber);
  }
  return randomList;
}


export default function Body() {

  const [settings, setSettings] = useState({
    algorithm: "BubbleSort",
    delay: 100,
    run: false,
  });

  const [list, setList] = useState(generateRandomList());

  const [borderColor, setBorderColor] = useState("border-light");

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  async function bubbleSort(list, delay) {
    let swapped = true;
    let upperBound = list.length - 1;
  
    while (swapped) {
      swapped = false;
      for (let i = 0; i < upperBound; i++) {
        if (list[i] > list[i + 1]) {
          const temp = list[i];
          list[i] = list[i + 1];
          list[i + 1] = temp;
          swapped = true;
        }
        setList([...list]);
        await sleep(delay);
      }
      upperBound--;
    }
    setBorderColor("border-light");
  }
  async function selectionSort(list, delay) {
    for (let i = 0; i < list.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < list.length; j++) {
        if (list[minIndex] > list[j])
          minIndex = j;
      }
      if (minIndex !== i) {
        const temp = list[i];
        list[i] = list[minIndex];
        list[minIndex] = temp;
        setList([...list]);
        await sleep(delay);
      }
    }
    setBorderColor("border-light");
  }
  async function insertionSort(list, delay) {
    for (let i = 1; i < list.length; i++) {
      let key = list[i];
      let j = i - 1;
      while (j >= 0 && list[j] > key) {
        list[j + 1] = list[j];
        j--;
        setList([...list]);
        await sleep(delay);
      }
      list[j + 1] = key;
      setList([...list]);
      await sleep(delay);
    }
    setBorderColor("border-light");
  }

  useEffect(() => {
    if (settings.run) {
      setBorderColor("border-danger");
      switch (settings.algorithm) {
        case "BubbleSort":
          bubbleSort(list, settings.delay);
          break;
        case "SelectionSort":
          selectionSort(list, settings.delay);
          break;
        case "InsertionSort":
          insertionSort(list, settings.delay);
          break;
        default:
          break;
      }
    }
  }, [settings]);

  return (
    <div className="text-light py-5">
      <div className="container-lg">
        <Visualizer list={list} borderColor={borderColor} />
        <Settings setSettings={setSettings} resetList={() => {setList(generateRandomList())}} />
      </div>
    </div>
  );
}
