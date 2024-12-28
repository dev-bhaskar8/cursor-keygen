import { useState } from 'react'
import './App.css'

function App() {
  const [codes, setCodes] = useState([])

  const generateUUID = () => {
    const uuid = crypto.randomUUID()
    setCodes(prevCodes => [uuid, ...prevCodes].slice(0, 10))
  }

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="container">
      <h1>Cursor KeyGen</h1>
      <button onClick={generateUUID} className="generate-btn">
        Generate New UUID
      </button>
      <div className="codes-container">
        {codes.map((code, index) => (
          <div key={index} className="code-item" onClick={() => copyToClipboard(code)}>
            <span>{code}</span>
            <span className="copy-hint">Click to copy</span>
          </div>
        ))}
      </div>
      <div className="file-path">
        <p>File Location:</p>
        <code>/Users/&lt;your machine name&gt;/Library/Application Support/Cursor/User/globalStorage/storage.json</code>
      </div>
    </div>
  )
}

export default App
