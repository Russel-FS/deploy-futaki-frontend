import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface ActivityData {
  day: string;
  views: number;
  visitors: number;
}

export const ActivityChart = ({ data }: { data: ActivityData[] }) => {
  return (
    <div className="w-full h-full min-h-[320px] flex flex-col">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold text-foreground tracking-tight">Tráfico de Plataforma</h3>
          <p className="text-[13px] text-secondary/60 font-medium mt-1">
            Visualizaciones vs Visitantes Únicos (7 días)
          </p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }} 
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
              dx={-15}
            />
            <Tooltip 
              cursor={{ stroke: 'rgba(0,0,0,0.05)', strokeWidth: 2, strokeDasharray: '4 4' }}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                borderRadius: '16px', 
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                padding: '12px 20px',
                backdropFilter: 'blur(12px)'
              }}
              itemStyle={{ fontWeight: 700, fontSize: '14px', paddingTop: '4px' }}
              labelStyle={{ color: '#6b7280', marginBottom: '8px', fontSize: '13px', fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '6px' }}
            />
            <Area 
              type="monotone" 
              dataKey="views" 
              name="Visualizaciones"
              stroke="#2563eb" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorViews)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#2563eb' }}
            />
            <Area 
              type="monotone" 
              dataKey="visitors" 
              name="Visitantes"
              stroke="#8b5cf6" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorVisitors)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: '#8b5cf6' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
