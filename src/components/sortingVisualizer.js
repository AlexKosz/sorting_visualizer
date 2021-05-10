import React, { Component } from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations } from '../Algorithms/sortingAlgos'
import { getBubbleSortAnimations } from '../Algorithms/sortingAlgos'
import { getQuickSortAnimations } from '../Algorithms/sortingAlgos';

const NumOfBars = 50;
const Speed = 20;      //higher = slower
const PrimaryColor = '#1CE';       //main color
const SecondaryColor = '#F00B42';           //current being compared


class SortingVisualizer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NumOfBars; i++) {
            array.push(Math.floor(Math.random() * 300) + 1);
        }
        this.setState({ array });
    }


    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            console.log(arrayBars)



            const [barOneIdx, barTwoIdx] = animations[i];
            if (barTwoIdx == (barOneIdx + 1) || barTwoIdx == (barOneIdx - 1)) {
                const barOneStyle = arrayBars[barOneIdx] ? arrayBars[barOneIdx].style : {};
                const barTwoStyle = arrayBars[barTwoIdx] ? arrayBars[barTwoIdx].style : {};
                const color = i % 2 === 0 ? SecondaryColor : PrimaryColor;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * Speed);
            }



            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * Speed);
            }
        }
    }


    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                console.log(barOneIdx);
                console.log(barTwoIdx);
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SecondaryColor : PrimaryColor;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * Speed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * Speed);
            }
        }
    }

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        this.animateArrayUpdate(animations);
    }

    animateArrayUpdate(animations) {
        animations.forEach(([comparison, swapped], index) => {
            setTimeout(() => {
                if (!swapped) {
                    if (comparison.length === 2) {
                        const [i, j] = comparison;
                        this.animateArrayAccess(i);
                        this.animateArrayAccess(j);
                    } else {
                        const [i] = comparison;
                        this.animateArrayAccess(i);
                    }
                } else {

                    let newArr = (prevArr) => {
                        const [k, newValue] = comparison;
                        const newArr = [...prevArr];
                        newArr[k] = newValue;
                        return newArr;
                    }
                    let newArray = newArr(this.state.array)
                    this.setState(function (state, array) {
                        return {
                            array: newArray
                        };
                    })
                }
            }, index * Speed);
        });
        setTimeout(() => {

        }, animations.length * Speed);
    }

    animateArrayAccess(index) {
        const arrayBars = document.getElementsByClassName('array-bar');
        console.log(arrayBars)
        const arrayBarStyle = arrayBars[index].style;
        setTimeout(() => {
            arrayBarStyle.backgroundColor = SecondaryColor;
        }, Speed);
        setTimeout(() => {
            arrayBarStyle.backgroundColor = PrimaryColor;
        }, Speed * 2);
    }




    render() {
        const { array } = this.state;
        return (
            <div>
                <div className="nav">
                    <h1>Sorting Visualizer!</h1>
                    <button onClick={() => this.resetArray()}>Reset Array</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: PrimaryColor,
                                height: `${value}px`,
                            }}></div>
                    ))}
                </div>
            </div>


        );
    }

}

export default SortingVisualizer;