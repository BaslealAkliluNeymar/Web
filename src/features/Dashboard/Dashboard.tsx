"use client"
import { Bar, BarChart,CartesianGrid,XAxis  } from "recharts"
import { ChartConfig, 
  ChartContainer,
  ChartTooltipContent, 
  ChartTooltip,
  ChartLegend, 
  ChartLegendContent } from "../../components/ui/chart"
import { SectionCards } from "../../components/section-cards"
import { ChartAreaInteractive } from "../../components/chart-area"



const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
 
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig
 
export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <SectionCards />
      <ChartAreaInteractive />
      <ChartContainer config={chartConfig} className="h-[350px] w-1/3 p-4">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false}/>
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    
    </div>
  )
} 