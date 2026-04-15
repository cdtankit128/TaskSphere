import { Box, Typography, Paper, Grid } from "@mui/material";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router-dom";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ 
        background: "rgba(15, 23, 42, 0.9)", 
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.2)", 
        borderRadius: "12px", 
        p: 1.5,
        boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(139, 92, 246, 0.3)",
        color: "#fff"
      }}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)", display: 'block', mb: 0.5 }}>{label}</Typography>
        <Typography variant="body2" fontWeight="bold">
          <Box component="span" sx={{ color: "#8b5cf6", mr: 1 }}>●</Box>
          {payload[0].value} Tasks Completed
        </Typography>
      </Box>
    );
  }
  return null;
};

const CustomTick = ({ x, y, payload }) => {
  const today = new Date().toLocaleDateString("en-US", { weekday: "short" });
  const isToday = payload.value === today;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill={isToday ? "#fff" : "rgba(255,255,255,0.4)"} fontWeight={isToday ? 700 : 400} fontSize="12">
        {payload.value}
      </text>
      {isToday && <circle cx={0} cy={24} r={3} fill="#8b5cf6" />}
    </g>
  );
};

export default function AnalyticsCharts({ consistencyData, stats, setFilter }) {
  const navigate = useNavigate();
  const chartData = [...consistencyData].reverse();
  
  const pieData = [
    { name: 'Completed', value: stats.completed, color: '#34d399' },
    { name: 'Active', value: stats.active, color: '#60a5fa' }
  ];

  const handlePieClick = (data) => {
    if (setFilter) {
      setFilter(data.name.toLowerCase());
      navigate('/tasks');
    }
  };

  // Best day logic
  const bestDayData = consistencyData.reduce((prev, current) => (prev.count > current.count ? prev : current), { count: 0 });
  const bestDayMsg = bestDayData.count > 0 ? `You performed best on ${bestDayData.day}! 🚀` : "Ready to crush some tasks? 🎯";

  return (
    <Grid container spacing={{ xs: 2, md: 2.5 }}>
      <Grid item xs={12} md={8}>
        <Paper elevation={0} sx={{ 
          p: 2.5, 
          borderRadius: "24px", 
          background: "rgba(255,255,255,0.04)", 
          border: "1px solid rgba(255,255,255,0.08)", 
          backdropFilter: "blur(10px)", 
          color: "#fff", 
          height: 270,
          transition: "all 0.4s ease",
          "&:hover": { transform: "translateY(-5px)", borderColor: "rgba(255,255,255,0.15)" }
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight={600}>Weekly Progress</Typography>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)" }}>{bestDayMsg}</Typography>
            </Box>
          </Box>
          
          <ResponsiveContainer width="100%" height="75%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={<CustomTick />} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(139, 92, 246, 0.4)', strokeWidth: 2 }} />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#8b5cf6" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorCount)" 
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4, stroke: '#1e293b' }} 
                activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2, boxShadow: "0 0 10px rgba(139, 92, 246, 0.8)" }} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Paper elevation={0} sx={{ 
          p: 2.5, 
          borderRadius: "24px", 
          background: "rgba(255,255,255,0.04)", 
          border: "1px solid rgba(255,255,255,0.08)", 
          backdropFilter: "blur(10px)", 
          color: "#fff", 
          height: 270, 
          display: "flex", 
          flexDirection: "column",
          transition: "all 0.4s ease",
          "&:hover": { transform: "translateY(-5px)", borderColor: "rgba(255,255,255,0.15)" }
        }}>
          <Typography variant="h6" fontWeight={600} mb={0.5}>Task Distribution</Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", display: 'block', mb: 1 }}>Interactive analytics • Click to filter</Typography>
          
          {(stats.total === 0) ? (
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
              <Typography>No activities recorded yet.</Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mt: -1 }}>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie 
                      data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value" stroke="none"
                      onClick={handlePieClick}
                      style={{ outline: "none" }}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: "none", cursor: 'pointer', transition: 'all 0.3s' }} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "12px", color: "#fff" }}
                      itemStyle={{ color: "#fff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                {pieData.map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', opacity: 0.8, "&:hover": { opacity: 1 } }} onClick={() => handlePieClick(item)}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.color }} />
                    <Typography variant="caption" fontWeight={600} sx={{ color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.name}</Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
