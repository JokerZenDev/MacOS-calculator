import React, { useState } from "react"
import "./App.css"

function App() {
	const [buffer, setBuffer] = useState("0")
	const [result, setResult] = useState(0)
	const [operator, setOperator] = useState("")
	const [isNewOperation, setIsNewOperation] = useState(true)

	const handleNumber = (number: string) => {
		setIsNewOperation(false)
		if (buffer === "0" || isNewOperation) {
			if (number !== ".") setBuffer(`${number}`)
			if (number === ".") setBuffer(`0${number}`)
		} else if (number !== "." || !buffer.includes(".")) {
			setBuffer((prev) => {
				if (prev.length > 7) return prev
				return `${prev}${number}`
			})
		}
	}

	const handleSign = (sign: string) => {
		if (isNewOperation) {
			setOperator(sign)
			return
		}

		setIsNewOperation(true)

		handleLastOperatoration()

		if (sign === "=") {
			return
		}

		setOperator(sign)
	}

	const handleLastOperatoration = () => {
		let resultOperation = Number(buffer)

		if (!isNewOperation && operator !== "") {
			if (operator === "+")
				resultOperation = Number(result) + Number(buffer)
			if (operator === "-")
				resultOperation = Number(result) - Number(buffer)
			if (operator === "*")
				resultOperation = Number(result) * Number(buffer)
			if (operator === "/")
				resultOperation = Number(result) / Number(buffer)
			setBuffer(`${resultOperation}`)
		}
		setResult(resultOperation)
	}

	const reset = () => {
		setBuffer("0")
		setResult(0)
		setOperator("")
		setIsNewOperation(true)
	}

	const handleChangeSign = () => {
		setResult((prev) => -prev)
		setBuffer((prev) => `${-Number(prev)}`)
	}

	const handlePercent = () => {
		setResult((prev) => prev / 100)
		setBuffer((prev) => `${Number(prev) / 100}`)
	}

	return (
		<div className='App'>
			<div className='calculator'>
				<div className='navigation'>
					<span className='close'></span>
					<span className='minimize'></span>
					<span className='fullscreen'></span>
				</div>
				<div className='buffer'>{buffer}</div>
				<div className='buttons'>
					<div className='left-side'>
						<div className='operators'>
							<button onClick={() => reset()}>C</button>
							<button onClick={() => handleChangeSign()}>
								+/-
							</button>
							<button onClick={() => handlePercent()}>%</button>
						</div>
						<div className='numbers'>
							<div className='row'>
								<button onClick={() => handleNumber("7")}>
									7
								</button>
								<button onClick={() => handleNumber("8")}>
									8
								</button>
								<button onClick={() => handleNumber("9")}>
									9
								</button>
							</div>
							<div className='row'>
								<button onClick={() => handleNumber("4")}>
									4
								</button>
								<button onClick={() => handleNumber("5")}>
									5
								</button>
								<button onClick={() => handleNumber("6")}>
									6
								</button>
							</div>
							<div className='row'>
								<button onClick={() => handleNumber("1")}>
									1
								</button>
								<button onClick={() => handleNumber("2")}>
									2
								</button>
								<button onClick={() => handleNumber("3")}>
									3
								</button>
							</div>
							<div className='row'>
								<button
									onClick={() => handleNumber("0")}
									className='zero'
								>
									0
								</button>
								<button onClick={() => handleNumber(".")}>
									.
								</button>
							</div>
						</div>
					</div>
					<div className='signs'>
						<button onClick={() => handleSign("/")}>÷</button>
						<button onClick={() => handleSign("*")}>x</button>
						<button onClick={() => handleSign("-")}>&minus;</button>
						<button onClick={() => handleSign("+")}>+</button>
						<button onClick={() => handleSign("=")}>=</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
