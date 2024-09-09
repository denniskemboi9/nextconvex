'use client'
import { useState } from 'react'
import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from "convex/react"

export default function Home(){
  const [text, setText] = useState("")
  const [status, setStatus] = useState(false)
  const creatTask = useMutation(api.task.creatTask)
  const tasks = useQuery(api.task.getTask) || [];
  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!text.trim()) return
    try {
      const newTaskId = await creatTask({text, status})
      console.log(`New task added with Id ${newTaskId}`)
      setText("")
      setStatus(false)
    } catch (error) {
      console.log("err", error)
    }
  }

  return(
    <div>
      <div className='mx-auto max-w-screen-md p-4 w-full items-center justify-center flex flex-col h-screen bg-orange-50'>
        <h2 className='text-2xl font-bold text-neutral-700'>Add a new task</h2>
        <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
          <input 
            placeholder='Task...' 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            className='border border-gray-400 p-2 rounded-md w-full outline-none'>
          </input>
          <div className='flex items-center'>
            <label className='mr-2'>Completed</label>
            <input
              type='checkbox'
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}>
            </input>
          </div>
          <div>
            <button className='bg-slate-500 text-white px-4 py-2 rounded-md' type='submit'>
              Add Task
            </button>
          </div>
        </form>

        <div className='flex flex-col gap-8 w-full'>
          <h2 className='text-2xl font-bold text-neutral-700 text-center mt-8'>All Tasks</h2>
          <div>
            {
              tasks.length === 0? (<p>No tasks available</p>) :
              
              (tasks.map((task) => {
                return(
                  <div key={task._id} className='flex items-center w-full'>
                    <div className='flex justify-between items-center w-full border p-4'>
                      <div><p>{task.text}</p></div>
                      <div>{task.status? "Complete": "Incomplete"}</div>
                    </div>
                  </div>
                )
              }))
            }
          </div>
        </div>
      </div>
    </div>
  )
}