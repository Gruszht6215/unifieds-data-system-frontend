import React from 'react'

type Props = {
  active: any,
  payload: any,
  label: any,
}

export default function CustomDbmsBarChartTooltip({ active, payload, label }: Props) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2">
        <p className="">{`${label}`}</p>
        <p className="">{`#Database Instance Amount: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
}