import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Tag } from '../../interfaces/Tag';

type Props = {
    data: Tag[],
}

const TagColorRadarChart = React.memo(({ data }: Props) => {
    const [tagData, setTagData] = useState<any[]>([]);
    useEffect(() => {
        const filterData = [];
        let redAmount = 0
        let blueAmount = 0
        let greenAmount = 0
        let purpleAmount = 0
        let yellowAmount = 0
        data.forEach(tag => {
            switch (tag.color.toLowerCase()) {
                case "red":
                    redAmount++
                    break;
                case "blue":
                    blueAmount++
                    break;
                case "green":
                    greenAmount++
                    break;
                case "purple":
                    purpleAmount++
                    break;
                case "yellow":
                    yellowAmount++
                    break;
                default:
                    break;
            }
        });
        let redData = {
            color: "Red",
            amount: redAmount
        }
        let blueData = {
            color: "Blue",
            amount: blueAmount
        }
        let greenData = {
            color: "Green",
            amount: greenAmount
        }
        let purpleData = {
            color: "Purple",
            amount: purpleAmount
        }
        let yellowData = {
            color: "Yellow",
            amount: yellowAmount
        }
        filterData.push(yellowData)
        filterData.push(blueData)
        filterData.push(greenData)
        filterData.push(purpleData)
        filterData.push(redData)
        setTagData(filterData);
    }, [data]);


    return (
        <ResponsiveContainer className='' width='100%' height="80%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={tagData}>
                <defs>
                    <linearGradient id="tagRadarColor1" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="30%" stopColor="#6d28d9" />
                        <stop offset="95%" stopColor="#c026d3" />
                    </linearGradient>
                </defs>
                <PolarGrid />
                <PolarAngleAxis dataKey="color" />
                <PolarRadiusAxis />
                <Radar name="Tag" dataKey="amount" stroke="url(#tagRadarColor1)" fill="url(#tagRadarColor1)" fillOpacity={0.6}>
                </Radar>
            </RadarChart>
        </ResponsiveContainer>
    );
});
export default TagColorRadarChart;
