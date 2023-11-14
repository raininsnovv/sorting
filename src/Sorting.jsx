import React, { useState, useEffect } from 'react';
import './App.css';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [sorting, setSorting] = useState(false);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        const newArray = [];
        for (let i = 0; i < 50; i++) {
            newArray.push(randomIntFromInterval(5, 500));
        }
        setArray(newArray);
        setSorting(false);
    };

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const swap = async (i, j) => {
        await new Promise((resolve) =>
            setTimeout(() => {
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                setArray([...array]);
                resolve();
            }, 20)
        );
    };

    const bubbleSort = async () => {
        setSorting(true);
        const arrayBars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                arrayBars[j].style.backgroundColor = 'red';
                arrayBars[j + 1].style.backgroundColor = 'red';

                if (array[j] > array[j + 1]) {
                    await swap(j, j + 1);
                }

                arrayBars[j].style.backgroundColor = 'blue';
                arrayBars[j + 1].style.backgroundColor = 'blue';
            }

            arrayBars[array.length - i - 1].style.backgroundColor = 'green';
        }

        arrayBars[0].style.backgroundColor = 'green';
        setSorting(false);
    };

    const selectionSort = async () => {
        setSorting(true);
        const arrayBars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < array.length - 1; i++) {
            let minIndex = i;
            arrayBars[i].style.backgroundColor = 'red';

            for (let j = i + 1; j < array.length; j++) {
                arrayBars[j].style.backgroundColor = 'red';

                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }

                arrayBars[j].style.backgroundColor = 'blue';
            }

            await swap(i, minIndex);

            arrayBars[i].style.backgroundColor = 'green';
        }

        setSorting(false);
    };

    const insertionSort = async () => {
        setSorting(true);
        const arrayBars = document.getElementsByClassName('array-bar');

        for (let i = 1; i < array.length; i++) {
            let key = array[i];
            let j = i - 1;

            arrayBars[i].style.backgroundColor = 'red';

            while (j >= 0 && array[j] > key) {
                arrayBars[j].style.backgroundColor = 'red';

                await new Promise((resolve) =>
                    setTimeout(() => {
                        array[j + 1] = array[j];
                        setArray([...array]);
                        resolve();
                    }, 100)
                );

                arrayBars[j].style.backgroundColor = 'blue';
                j--;
            }

            array[j + 1] = key;
            setArray([...array]);

            for (let k = 0; k <= i; k++) {
                arrayBars[k].style.backgroundColor = 'green';
            }
        }

        setSorting(false);
    };

    return (
        <div className="sorting-visualizer">
            <div className="array-container">
                {array.map((value, index) => (
                    <div
                        className="array-bar"
                        key={index}
                        style={{ height: `${value}px` }}
                    ></div>
                ))}
            </div>
            <div className="controls">
                <button onClick={resetArray} disabled={sorting}>
                    Generate New Array
                </button>
                <button onClick={bubbleSort} disabled={sorting}>
                    Bubble Sort
                </button>
                <button onClick={selectionSort} disabled={sorting}>
                    Selection Sort
                </button>
                <button onClick={insertionSort} disabled={sorting}>
                    Insertion Sort
                </button>
            </div>
        </div>
    );
};

export default SortingVisualizer;
