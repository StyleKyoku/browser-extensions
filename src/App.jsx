import { useState, useEffect } from 'react'
import Card from './components/Card'
import data from './data.json'
import './App.css'
import iconMoon from "/assets/images/icon-moon.svg"
import iconSun from "/assets/images/icon-sun.svg"
import Logo from './components/Logo'

function App() {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const [extensions, setExtensions] = useState(() => {
    const stored= localStorage.getItem('extensions')
    return stored ? JSON.parse(stored) : data
  })

  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    localStorage.setItem('extensions', JSON.stringify(extensions))
  }, [extensions])

  const handleToggle = (name) => {
    const updatedExtensions = extensions.map(item => {
      return item.name == name ? {...item, isActive: !item.isActive} : item
    })
    setExtensions(updatedExtensions)
  }

  const handleRemove = (name) => {
    const updatedExtensions = extensions.filter(item => item.name !== name)
    setExtensions(updatedExtensions)
  }

  const filteredData = extensions.filter(item => {
    if (filterType === 'active') return item.isActive
    if (filterType === 'inactive') return !item.isActive
    return true
  })

  return (
    <>
      <div className="main-container">
        <div className="header">
          <div className="logo-container">
            <Logo/>
            <h1 className="logo-text">Extensions</h1>
          </div>
          <button className='theme-button'
            onClick={() => setTheme(prevTheme => prevTheme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? 
            <img src={iconSun}/>
            : 
            <img src={iconMoon}/>
            }
          </button>
        </div>
        <div className="content">
          <div className="heading">
            <h2>Extensions List</h2>
            <div className="filter-buttons">
              <button 
                className={filterType === "all" ? "active" : ""}
                onClick={() => setFilterType('all')}
              >
                 All
              </button>
              <button 
                className={filterType === "active" ? "active" : ""}
                onClick={() => setFilterType('active')}
              >
                Active
              </button>
              <button
                className={filterType === "inactive" ? "active" : ""}
                onClick={() => setFilterType('inactive')}
              >
                Inactive
              </button>
            </div>
          </div>
          <div className="extensions-list">
            {filteredData.map((item, index) => (
              <Card 
                key = {index} 
                item = {item} 
                onToggle={() => handleToggle(item.name)}
                onRemove={() => handleRemove(item.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
