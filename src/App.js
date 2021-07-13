import React, { useState, useEffect, useRef } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import "./App.css"

export default function App() {
	const [items, setItems] = useState([])
	const [text, setText] = useState("")
	const textField = useRef(null)

	useEffect(() => {
		if ("items" in localStorage)
			setItems(JSON.parse(localStorage["items"]))
		if ("text" in localStorage)
			setText(JSON.parse(localStorage["text"]))
	}, [])

	useEffect(() => {
		localStorage["items"] = JSON.stringify(items)
		localStorage["text"] = JSON.stringify(text)
	}, [items, text])

	const addItem = () => {
		setItems((prevItems) => [...prevItems, text])
		setText("")
		textField.current.querySelector('input').focus()
	}

	const removeItem = (index) => {
		setText(items[index])
		setItems((prevItems) => prevItems.filter((item, i) => i !== index))
	}

	const moveUpItem = (index) => {
		setItems((prevItems) => {
			let item = prevItems[index]
			let new_items = [...prevItems]
			new_items.splice(index, 1)
			new_items.splice(index - 1, 0, item)
			return new_items
		})
	}

	return (
		<div className="App">
			<h1>My List of Things</h1>
			<ul style={{/* border: "solid 1px red" */}}>
				{items.map((item, index) => (
					<li>
						<button onClick={() => removeItem(index)}>x</button>
						<button disabled={index === 0} onClick={() => moveUpItem(index)}>
							^
						</button>
						{item}
					</li>
				))}
			</ul>
			<TextField ref={textField}
				value={text}
				onChange={({ target: { value } }) => setText(value)}
				onKeyDown={(event) => {
					if (event.keyCode === 13 && event.target.value) 
						addItem()
				}}
				label="List item"
				style={{ width: "350px" }}
			/>
			<Button variant="contained" disabled={!text} onClick={addItem}>
				Add Item
			</Button>
		</div>
	)
}