import React, { useState, useEffect } from 'react';
import { Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ImportedDatabase } from '../../interfaces/ImportedDatabase';
import CustomDbmsBarChartTooltip from './CustomDbmsBarChartTooltip';

type Props = {
    data: ImportedDatabase[],
}

const DbmsBarChart = React.memo(({ data }: Props) => {
    const [databaseData, setDatabaseData] = useState<any[]>([]);

    useEffect(() => {
        const filterData = [];
        let mysqlAmount = 0
        let mariadbAmount = 0
        let postgresqlAmount = 0
        data.forEach(database => {
            switch (database.dbms.toLowerCase()) {
                case "mysql":
                    mysqlAmount++
                    break;
                case "mariadb":
                    mariadbAmount++
                    break;
                case "postgresql":
                    postgresqlAmount++
                    break;
                default:
                    break;
            }
        });
        let mysqlData = {
            name: "Mysql",
            amount: mysqlAmount
        }
        let mariadbData = {
            name: "Mariadb",
            amount: mariadbAmount
        }
        let postgresqlData = {
            name: "Postgresql",
            amount: postgresqlAmount
        }
        filterData.push(mysqlData)
        filterData.push(mariadbData)
        filterData.push(postgresqlData)

        setDatabaseData(filterData);
    }, [data]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={databaseData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                barSize={20}
            >
                <defs>
                    <linearGradient id="dbmsBarColor1" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="30%" stopColor="#ea580c" />
                        <stop offset="95%" stopColor="#fbbf24" />
                    </linearGradient>
                </defs>
                <defs>
                    <linearGradient id="dbmsBarColor2" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="30%" stopColor="#16a34a" />
                        <stop offset="95%" stopColor="#a3e635" />
                    </linearGradient>
                </defs>
                <defs>
                    <linearGradient id="dbmsBarColor3" x1="1" y1="1" x2="0" y2="0">
                        <stop offset="30%" stopColor="#0284c7" />
                        <stop offset="95%" stopColor="#22d3ee" />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip content={<CustomDbmsBarChartTooltip active payload label/>} />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="amount" fill="#ffffff" background={{ fill: '#eee' }} >
                    {databaseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#dbmsBarColor${index + 1})`} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
});
export default DbmsBarChart;