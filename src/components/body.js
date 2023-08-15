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
      setBorderColor("border-light");
    }
  }
  async function quickSort(list, delay) {
    const stack = [];
    stack.push({l : 0, r : list.length - 1});
    while (stack.length !== 0) {
      const {l, r} = stack.pop();
      if (l >= r) continue;
      const pivot = list[r];
      let i = l - 1;
      let j = r;
      do {
        do {i++} while (list[i] < pivot);
        do {j--} while (j >= l && list[j] > pivot);
        if (i < j) {
          const temp = list[i];
          list[i] = list[j];
          list[j] = temp;
          setList([...list]);
          await sleep(delay);
        }
      } while (i < j);
      const temp = list[i];
      list[i] = list[r];
      list[r] = temp;
      stack.push({l : i + 1, r : r});
      stack.push({l : l, r : i - 1});
      setList([...list]);
      await sleep(delay);
    }    
    setBorderColor("border-light");
  }
  async function mergeSort(list, helper, delay) {
    const sortStack = [];
    const mergeStack = [];
    sortStack.push({l : 0, r : list.length - 1});
    while (sortStack.length !== 0) {
      const {l, r} = sortStack.pop();
      if (l >= r) continue;
      mergeStack.push({l : l, r : r});
      const middle = Math.floor((l + r) / 2);
      sortStack.push({l : l, r : middle});
      sortStack.push({l : middle + 1, r : r});
    }
    while (mergeStack.length !== 0) {
      const {l, r} = mergeStack.pop();
      await merge(list, l, Math.floor((l + r) / 2), r, helper, delay);
    }
    setBorderColor("border-light");
  }
  async function merge(list, l, m, r, helper, delay) {
    let indexL = l;
    let indexR = m + 1;
    let length = r - l  + 1;
    for (let i = 0; i < length; i++) {
      if (indexL > m) {
        helper[i] = list[indexR++];
      } else if (indexR > r) {
        helper[i] = list[indexL++];
      } else if (list[indexL] <= list[indexR]) {
        helper[i] = list[indexL++];
      } else {
        helper[i] = list[indexR++];
      }
    }
    //copy back
    for (let i = 0; i < length; i++) {
      list[l + i] = helper[i];
    }
    setList([...list]);
    await sleep(delay);
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
        case "QuickSort":
          quickSort(list, settings.delay);
          break;
        case "MergeSort":
          mergeSort(list, new Array(list.length), settings.delay);
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
        <Settings setSettings={setSettings} resetList={() => setList(generateRandomList())} />
      </div>
    </div>
  );
}
