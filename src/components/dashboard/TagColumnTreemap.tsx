import React from 'react';
import { Treemap, Tooltip } from "recharts";

type Props = {
    data: any
}

const COLORS = ['#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63'];

export function CustomizedContent({ root, depth, x, y, width, height, index, payload, colors, rank, name }: any) {
    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                style={{
                    fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : '#ffffff00',
                    stroke: '#fff',
                    strokeWidth: 2 / (depth + 1e-10),
                    strokeOpacity: 1 / (depth + 1e-10),
                }}
            />
            {depth === 1 ? (
                <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
                    {name}
                </text>
            ) : null}
            {/* {depth === 1 ? (
                <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
                    {index + 1}
                </text>
            ) : null} */}
        </g>
    );
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="">
                <p className="bg-white p-2">
                    {`Usage : ${payload[0].value}`}
                </p>
            </div>
        );
    }

    return null;
};

export default function TagColumnTreemap({ data }: Props) {
    return (
        <Treemap
            width={325}
            height={430}
            data={data}
            dataKey="columnAmount"
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent colors={COLORS} />}>
            <Tooltip content={<CustomTooltip />} />
        </Treemap>
    );
}