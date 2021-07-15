import React, { useState, useEffect, useRef } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import "./App.css"

export default function App() {
	const [items, setItems] = useState([])
	const [desc, setDesc] = useState("")
	const [qty, setQty] = useState(1)
	const descField = useRef(null)

	useEffect(() => {
		if ("items" in localStorage)
			setItems(JSON.parse(localStorage["items"]))
		if ("desc" in localStorage)
			setDesc(JSON.parse(localStorage["desc"]))
		if ("qty" in localStorage)
			setQty(JSON.parse(localStorage["qty"]))
	}, [])

	useEffect(() => {
		localStorage["items"] = JSON.stringify(items)
		localStorage["desc"] = JSON.stringify(desc)
		localStorage["qty"] = JSON.stringify(qty)
	}, [items, desc, qty])

	const addItem = () => {
		setItems((prevItems) => [...prevItems, {desc, qty}])
		setDesc("")
		setQty(1)
		descField.current.querySelector('input').focus()
	}

	const removeItem = (index) => {
		setDesc(items[index].desc)
		setQty(items[index].qty)
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
				<li>
					<span>&nbsp;</span>
					<span>Description</span>
					<span>Qty</span>
				</li>
				{items.map(({desc, qty}, index) => (
					<li>
						<span>
							<button onClick={() => removeItem(index)}>x</button>
							<button disabled={index === 0} onClick={() => moveUpItem(index)}>
								^
							</button>
						</span>
						<span>{desc}</span>
						<span>{qty}</span>
					</li>
				))}
			</ul>
			<TextField ref={descField}
				value={desc}
				onChange={({ target: { value } }) => 
					setDesc(value)
				}
				onKeyDown={({keyCode, target: {value}}) =>
					keyCode === 13 && value && qty > 0 &&
						addItem()
				}
				label="Description"
				style={{ width: "350px" }}
			/>
			<TextField
				type="number"
				label="Qty"
				value={qty}
				onChange={({ target: { value } }) => 
					value > 0 &&
						setQty(value)
				}
				onKeyDown={({ keyCode, target: { value } }) => 
					keyCode === 13 && desc && value > 0 &&
						addItem()
				}
				InputLabelProps={{
				//	shrink: true,
				}}
			/>
			<Button variant="contained" disabled={!desc} onClick={addItem}>
				Add Item
			</Button>
		</div>
	)
}