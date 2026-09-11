import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AuthPage } from './pages/AuthPage'
import { BuilderPage } from './pages/BuilderPage'
import {PreviewPage} from './pages/PreviewPage'
import { PublishPage } from './pages/PublishPage'

const App = () => {
  return (
    <Routes>
      <Route element = {<Layout/>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="/publish" element={<PublishPage />} />
      </Route>
    </Routes>
  )
}

export default App

  
