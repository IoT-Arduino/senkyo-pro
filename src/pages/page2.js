import React from "react"
import "../styles/tailwind.css"
import TestButton from "../components/test-button"


const Page2 = () => (
  <div className="p-8">
  <p className="mt-8">
    <TestButton>This is Cool</TestButton>
  </p>
    <p className="mt-8">
      <TestButton size="lg">This is Cool</TestButton>
    </p>
    <p className="mt-8">
      <TestButton className="text-yellow-600" size="xl">This is Cool</TestButton>
    </p>
    <p className="mt-8">
      <button className="py-4 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white">Button Two</button>
    </p>
  </div>
)

export default Page2

