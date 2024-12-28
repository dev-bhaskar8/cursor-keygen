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
        Generate Key
      </button>
      <div className="codes-container">
        {codes.map((code, index) => (
          <div key={index} className="code-item" onClick={() => copyToClipboard(code)}>
            <span>{code}</span>
            <span className="copy-hint">Click to copy</span>
          </div>
        ))}
      </div>
      <div className="instructions">
        <h2>Installation Instructions</h2>
        <ol>
          <li>Setup cursor ai free trial, stay signed in</li>
          <li>Close Cursor completely</li>
          <li>
            <p>Navigate to the configuration file location:</p>
            <div className="paths">
              <div className="path-item">
                <span className="os">Windows:</span>
                <code>%APPDATA%\Cursor\User\globalStorage\storage.json</code>
              </div>
              <div className="path-item">
                <span className="os">macOS:</span>
                <code>/Users/&lt;your machine name&gt;/Library/Application Support/Cursor/User/globalStorage/storage.json</code>
              </div>
              <div className="path-item">
                <span className="os">Linux:</span>
                <code>~/.config/Cursor/User/globalStorage/storage.json</code>
              </div>
            </div>
          </li>
          <li>Create a backup of storage.json</li>
          <li>
            <p>Edit storage.json and update these fields with your new key:</p>
            <pre className="json-code">
{`{
    "telemetry.machineId": "YOUR_GENERATED_KEY",
    "telemetry.macMachineId": "YOUR_GENERATED_KEY",
    "telemetry.devDeviceId": "YOUR_GENERATED_KEY",
    "telemetry.sqmId": "YOUR_GENERATED_KEY",
    "lastModified": "2024-01-01T00:00:00.000Z",
    "version": "1.0.1"
}`}
            </pre>
          </li>
          <li>Save the file and restart Cursor</li>
        </ol>
        <p className="tip">Tip: To open with TextEdit on Mac, use command: <code>open -a TextEdit</code></p>
      </div>
    </div>
  )
}

export default App
