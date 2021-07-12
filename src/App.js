import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

export default function App() {
  const [items, setItems] = useState([])
  const [text, setText] = useState("")

  const addItem = () => {
    setItems(prevItems => [...prevItems, text])
    setText("")
  }

  return (
    <div className="App">
      <h1>My List of Things</h1>
      <ul>
        {items.map(item => (
          <li>{item}</li>
        ))}
      </ul>
      <TextField
        value={text}
        onChange={({ target: { value } }) => setText(value)}
        label="List item"
      />
      <Button variant="contained" disabled={!text} onClick={addItem}>
        Add Item
      </Button>
    </div>
  )
}
