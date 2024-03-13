import React from 'react'
import ReactDOM from 'react-dom/client'
import TodosView from 'todos/TodosView'

import './index.css'
import { defaultData } from './mocks/defaultData'

const App = () => (
  <div className="container">
    <h2 style={{ marginBottom: '1rem' }}>TODO List</h2>
    <TodosView defaultData={defaultData} />
  </div>
)
const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)
