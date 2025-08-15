"use client"
import React, { useState, useRef, useEffect } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { FiLoader } from "react-icons/fi";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: "AIzaSyD-OymixUgjyYpTJ5gJ46sWDUAGBLiesRY" });

const Chatbot1 = () => {
  const [showChat, setShowChat] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inputText, setInputText] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const chatContainerRef = useRef(null)

  const fetchans= async(inputtex)=>{
const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: inputtex,
  });  
  return response.text
}



  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  const handleQuery = async () => {
    if (!inputText.trim() || isLoading) return
    
    setIsLoading(true)
    const userQuestion = inputText.trim()
    
    try {
      // Add user question immediately
      setChatHistory(prev => [...prev, { 
        sender: 'user', 
        text: userQuestion,
        timestamp: new Date().toLocaleTimeString()
      }])
    const question=inputText;
      
      setInputText('')
      const data=  await  fetchans(question)
      console.log(data)
     
      await new Promise(resolve => setTimeout(resolve, 1000))
      const botResponse = `This is a simulated response to: "${question}"`
      
      setChatHistory(prev => [...prev, { 
        sender: 'bot', 
        text: data,
        timestamp: new Date().toLocaleTimeString()
      }])
    } catch (error) {
      console.error('Error fetching response:', error)
      setChatHistory(prev => [...prev, { 
        sender: 'bot', 
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toLocaleTimeString()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleQuery()
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chatbot toggle button */}
      <div className="relative">
        <img 
          src="/img/chatbot_6819708.png" 
          alt="Chatbot" 
          className="h-16 w-16 cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setShowChat(!showChat)}
        />
        {!showChat && chatHistory.length > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {chatHistory.length}
          </div>
        )}
      </div>

      {/* Chat container */}
      <div className={`
        overflow-hidden
        ${!showChat ? "h-0 w-0 opacity-0" : "h-[32rem] w-[25rem] opacity-100"}
        rounded-2xl shadow-xl border border-gray-200 bg-white
        absolute bottom-full right-0 mb-4 transition-all duration-300
      `}>
        <div className='flex flex-col h-full'>
          {/* Header */}
          <div className='p-4 bg-[#00C951] rounded-t-2xl'>
            <p className='text-white text-xl font-bold uppercase'>Hiring Boat</p>
            <p className='text-white text-sm'>How can I help you today?</p>
          </div>

          {/* Chat messages */}
          <div 
            ref={chatContainerRef}
            className='flex-1 p-4 overflow-y-auto bg-gray-50'
          >
            {chatHistory.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Ask me anything about hiring!</p>
              </div>
            ) : (
              chatHistory.map((message, index) => (
                <div 
                  key={index} 
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[80%] p-3 rounded-lg
                    ${message.sender === 'user' 
                      ? 'bg-[#00C951] text-white rounded-tr-none' 
                      : 'bg-gray-200 text-gray-800 rounded-tl-none'}
                  `}>
                    <p>{message.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input area */}
          <div className='p-3 border-t border-gray-200 bg-white'>
            <div className='flex items-center gap-2'>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder='Enter your query...'
                className='flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C951] focus:border-transparent'
                disabled={isLoading}
              />
              <button
                onClick={handleQuery}
                disabled={isLoading || !inputText.trim()}
                className={`p-3 rounded-full text-white ${isLoading || !inputText.trim() ? 'bg-gray-400' : 'bg-[#00C951] hover:bg-[#00a742]'} transition-colors`}
              >
                {isLoading ? (
                  <FiLoader className='animate-spin' />
                ) : (
                  <BsFillSendFill />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot1