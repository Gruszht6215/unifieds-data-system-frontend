import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { Cluster } from '../../interfaces/Cluster';

type Props = {
    data: Cluster[],
}

type renderActiveShapeProps = {
    cx: any,
    cy: any,
    midAngle: any,
    innerRadius: any,
    outerRadius: any,
    startAngle: any,
    endAngle: any,
    fill: any,
    payload: any,
    percent: any,
    value: any,
}

const renderActiveShape = ({ cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value }: renderActiveShapeProps) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text className='' x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
                {`#tag amount:${value}`}
            </text>
            <text className='' x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const ClusterPieChart = React.memo(({ data }: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [databaseData, setDatabaseData] = useState<any[]>([]);

    const onPieEnter = (_: any, index: any) => {
        setActiveIndex(index)
    };
    useEffect(() => {
        const filterData = data.map((item: Cluster) => {
            return {
                name: item.name,
                value: item.tags!.length
            }
        })
        setDatabaseData(filterData);
    }, [data]);

    return (
        <ResponsiveContainer className=''>
            <PieChart width={400} height={400}>
                <defs>
                    <linearGradient id="clusterPieChartColor1" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="30%" stopColor="#0284c7" />
                        <stop offset="95%" stopColor="#22d3ee" />
                    </linearGradient>
                </defs>
                <defs>
                    <linearGradient id="clusterPieChartColor2" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="30%" stopColor="#6d28d9" />
                        <stop offset="95%" stopColor="#a855f7" />
                    </linearGradient>
                </defs>
                <defs>
                    <linearGradient id="clusterPieChartColor3" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="30%" stopColor="#16a34a" />
                        <stop offset="95%" stopColor="#a3e635" />
                    </linearGradient>
                </defs>
                <defs>
                    <linearGradient id="clusterPieChartColor4" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="30%" stopColor="#ea580c" />
                        <stop offset="95%" stopColor="#fbbf24" />
                    </linearGradient>
                </defs>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={databaseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                >
                    {databaseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#clusterPieChartColor${(index % 4)+1})`} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
});
export default ClusterPieChart;