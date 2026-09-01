"use client"

import { motion } from "motion/react"
import { useState } from "react"

function Notification() {

  const [show, setShow] = useState(false)

  return (
    <div className="my-8 border border-rurikon-border bg-[#fefefe] py-8 px-6 sm:py-10 sm:px-10 flex justify-center items-center">
      <motion.div
        layout
        animate={{
          y: show ? 0 : -30,
        }}
        transition={{ type: "tween", duration: 0.5 }}
        className="w-full h-full flex flex-col gap-5 max-w-87.5 relative">
        <motion.div
          layout
          animate={{
            y: show ? 0 : 50,
          }}
          transition={{ type: "tween", duration: 0.5 }}
          className="w-full h-full flex flex-row justify-between z-0 px-2">
          <p>Notifications</p>
          <button
            onClick={() => setShow(!show)}
            className="h-fit w-fit px-3 py-1 text-xs font-medium flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl cursor-pointer transition-colors">Collapse</button>
        </motion.div>

        <motion.div
          layout
          className="w-full h-fit flex flex-col gap-2">
          <motion.div
            onClick={() => setShow(!show)}
            animate={{
              y: show ? 0 : 0,
            }}
            transition={{ type: "tween", duration: 0.3 }}
            className="w-full h-20 bg-white border border-red-100 rounded-2xl shadow-sm z-20 flex flex-row justify-start items-center p-3 cursor-pointer hover:shadow-md transition-shadow">
            <span className="text-xl bg-red-500 w-10 h-10 flex justify-center items-center rounded-2xl">
              ✌️
            </span>
            <span className="text-sm pl-4">
              <span className="w-full h-fit flex flex-row items-center justify-start">
                <h3 className="text-base font-medium text-gray-800">MyUSC1 ·</h3>
                <p className="text-sm text-gray-500 font-normal ml-1">just now</p>
              </span>
              USC
            </span>
          </motion.div>
          <motion.div
            animate={{
              y: show ? 0 : -100,
              scaleX: show ? 1 : 0.95,
              opacity: show ? 1 : 0.75,
            }}
            transition={{ type: "tween", duration: 0.4 }}
            className="w-full h-20 shadow-sm bg-white border border-yellow-100 rounded-2xl z-10 flex flex-row justify-start items-center p-3 cursor-pointer hover:shadow-md transition-shadow">
            <span className="text-xl bg-yellow-500 w-10 h-10 flex justify-center items-center rounded-2xl">
              ✌️
            </span>
            <span className="text-sm pl-4">
              <span className="w-full h-fit flex flex-row items-center justify-start">
                <h3 className="text-base font-medium text-gray-800">MyUSC2 ·</h3>
                <p className="text-sm text-gray-500 font-normal ml-1"> 4m ago</p>
              </span>
              USC
            </span>
          </motion.div>
          <motion.div
            animate={{
              y: show ? 0 : -200,
              scaleX: show ? 1 : 0.9,
              opacity: show ? 1 : 0.5,
            }}
            transition={{ type: "tween", duration: 0.6 }}
            className="w-full h-20 shadow-sm bg-white border border-emerald-100 rounded-2xl z-0 flex flex-row justify-start items-center p-3 cursor-pointer hover:shadow-md transition-shadow">
            <span className="text-xl bg-emerald-500 w-10 h-10 flex justify-center items-center rounded-2xl">
              ✌️
            </span>
            <span className="text-sm pl-4 flex flex-col">
              <span className="w-full h-fit flex flex-row items-center justify-start">
                <h3 className="text-base font-medium text-gray-800">MyUSC3 ·</h3>
                <p className="text-sm text-gray-500 font-normal ml-1"> 6m ago</p>
              </span>
              USC
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export { Notification };
