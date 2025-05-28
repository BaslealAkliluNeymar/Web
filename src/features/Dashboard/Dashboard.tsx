"use client"
import { SectionCards } from "../../components/section-cards"
import { ChartAreaInteractive } from "../../components/chart-area"


export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <SectionCards />
      <ChartAreaInteractive />
    </div>
  )
} 